import {
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import { useForkRef } from "@mui/material/utils";
import { searchEmoji } from "./emoji";
import { SearchOptionContent } from "../inputs/SearchOptionContent";
import { filterOptions, highlight, type SearchSelectOption } from "../inputs/searchOptions";
import {
  mentionLabel,
  parseMentions,
  serializeMentions,
  type MentionProfile,
  type MentionSegment,
} from "./mentions";
import { UserAvatar } from "../engineers/UserAvatar";

/* As many people or emoji as the list shows at once; typing more narrows it. */
const MAX_OPTIONS = 6;

export type MentionFieldProps = {
  /** The message, with each mention kept as `<@id>`, as ConversationMessage reads it. */
  value: string;
  onChange: (value: string) => void;
  /** Who can be @mentioned, such as everyone in the conversation but the reader, and who the value's mentions are of. */
  people: MentionProfile[];
  /** The field's accessible name, since it has no visible label. */
  "aria-label": string;
  placeholder?: string;
  /** How tall it starts, in lines. */
  minRows?: number;
  /** How tall it grows before it scrolls, in lines. */
  maxRows?: number;
  inputRef?: Ref<HTMLTextAreaElement>;
  /** Keys the list doesn't take: while it's open, it takes the arrows, Enter, Tab and Esc. */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  /** For putting text in from outside, such as an emoji from a picker. */
  ref?: Ref<MentionFieldHandle>;
};

export type MentionFieldHandle = {
  /** Puts `text` where the caret was, in place of anything selected, and focuses the field with the caret after it. */
  insert: (text: string) => void;
};

/* The @ or : being typed before the caret: which, where it is, and what's typed after it so far. */
type Trigger = { kind: "mention" | "emoji"; start: number; query: string };

/*
 * A multiline field for a message where people can be @mentioned. Typing @
 * lists `people`, narrowed by each word typed after it as SearchSelect
 * searches; the arrows move through the list, Enter, Tab or a click puts
 * "@Full Name " in the text, and Esc closes the list without closing
 * whatever the field is in. An @ run into a word before it, as in an email
 * address, doesn't open it.
 *
 * Typing a colon and two letters of an emoji's shortcode, as in Slack or
 * GitHub (`:tada`), lists the emoji it could be, chosen the same way, which
 * puts the emoji itself in the text. A colon after a word or number, as in
 * "10:30", doesn't.
 *
 * The field shows "@Full Name", but `value` keeps the person's id, `<@id>`,
 * so a mention is still theirs after a rename. A mention stays one until
 * it's edited inside: then it's plain text, as typed.
 */
export function MentionField({
  value,
  onChange,
  people,
  "aria-label": ariaLabel,
  placeholder,
  minRows = 3,
  maxRows = 10,
  inputRef,
  onKeyDown,
  ref,
}: MentionFieldProps) {
  const listId = useId();
  /* The field, which the list opens against. */
  const [field, setField] = useState<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleTextRef = useForkRef(textRef, inputRef);
  /* Where the caret is, or null while the field doesn't have focus. */
  const [caret, setCaret] = useState<number | null>(null);
  /* The @ whose list was closed, by choosing someone or Esc, so it stays closed while that mention is written. */
  const [dismissed, setDismissed] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  /* Where to put the caret once a chosen name is in the text. */
  const nextCaret = useRef<number | null>(null);

  const segments = parseMentions(value);
  const labels = segments.map((part) => ("id" in part ? mentionLabel(part.id, people) : part.text));
  const text = labels.join("");
  /* Where each mention starts in the text, so an @ that's already one doesn't open the list. */
  const mentionStarts = new Set<number>();
  labels.reduce((at, label, index) => {
    if ("id" in segments[index]) mentionStarts.add(at);
    return at + label.length;
  }, 0);

  const found = caret === null ? null : findTrigger(text, caret);
  const trigger = found && !mentionStarts.has(found.start) ? found : null;
  const options: SearchSelectOption[] =
    !trigger || trigger.start === dismissed
      ? []
      : trigger.kind === "mention"
        ? filterOptions(
            people.map((person) => ({
              id: person.id,
              label: person.name,
              icon: <UserAvatar name={person.name} src={person.avatarUrl} size={24} />,
            })),
            { inputValue: trigger.query },
          ).slice(0, MAX_OPTIONS)
        : searchEmoji(trigger.query, MAX_OPTIONS).map((emoji) => ({
            id: emoji.char,
            label: `:${emoji.name}:`,
            icon: (
              <Box
                component="span"
                sx={{ width: 24, fontSize: 20, lineHeight: 1, textAlign: "center" }}
              >
                {emoji.char}
              </Box>
            ),
          }));
  const open = options.length > 0;
  const current = Math.min(active, options.length - 1);

  useLayoutEffect(() => {
    if (nextCaret.current === null) return;
    textRef.current?.setSelectionRange(nextCaret.current, nextCaret.current);
    setCaret(nextCaret.current);
    nextCaret.current = null;
  }, [value]);

  useImperativeHandle(ref, () => ({
    insert(inserted: string) {
      const area = textRef.current;
      const from = area?.selectionStart ?? text.length;
      const to = area?.selectionEnd ?? text.length;
      area?.focus();
      nextCaret.current = from + inserted.length;
      edit(from, to, [{ text: inserted }]);
    },
  }));

  /* Replaces the text from `from` to `to` with `inserted`, keeping the value's mentions outside it. */
  function edit(from: number, to: number, inserted: MentionSegment[]) {
    onChange(serializeMentions(replaceRange(segments, labels, from, to, inserted)));
  }

  /* After any edit or caret move: a new @ opens the list afresh at its top. */
  function track(event: { target: EventTarget }) {
    const text = event.target as HTMLTextAreaElement;
    const at = findTrigger(text.value, text.selectionStart)?.start;
    if (at !== trigger?.start) setActive(0);
    if (at !== dismissed) setDismissed(null);
    setCaret(text.selectionStart);
  }

  function choose(option: SearchSelectOption) {
    if (!trigger || caret === null) return;
    if (trigger.kind === "emoji") {
      nextCaret.current = trigger.start + option.id.length;
      edit(trigger.start, caret, [{ text: option.id }]);
      return;
    }
    /* One space after the name, unless one's already there, and the caret after it. */
    const spaced = text[caret] === " ";
    nextCaret.current = trigger.start + `@${option.label} `.length;
    edit(trigger.start, caret, [{ id: option.id }, { text: spaced ? "" : " " }]);
  }

  /*
   * What was typed, found by what's the same at either end, so mentions
   * outside it keep their ids. The end is matched first, and only back to the
   * caret, so typing "@" just before "@Sam" adds an @ rather than editing Sam.
   */
  function change(next: string, caretAfter: number) {
    let end = 0;
    while (
      end < text.length &&
      end < next.length - caretAfter &&
      text[text.length - 1 - end] === next[next.length - 1 - end]
    )
      end++;
    let start = 0;
    while (start < text.length - end && start < next.length - end && text[start] === next[start])
      start++;
    edit(start, text.length - end, [{ text: next.slice(start, next.length - end) }]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (open && trigger) {
      const key = event.key;
      if (key === "ArrowDown" || key === "ArrowUp") {
        event.preventDefault();
        const step = key === "ArrowDown" ? 1 : -1;
        setActive((current + step + options.length) % options.length);
        return;
      }
      if ((key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) || key === "Tab") {
        event.preventDefault();
        choose(options[current]);
        return;
      }
      if (key === "Escape") {
        /* Only the list closes, not a dialog or popout the field is in. */
        event.preventDefault();
        event.stopPropagation();
        setDismissed(trigger.start);
        return;
      }
    }
    onKeyDown?.(event);
  }

  return (
    <>
      <TextField
        ref={setField}
        inputRef={handleTextRef}
        value={text}
        onChange={(event) => {
          change(event.target.value, (event.target as HTMLTextAreaElement).selectionEnd);
          track(event);
        }}
        onKeyDown={handleKeyDown}
        onSelect={track}
        onBlur={() => setCaret(null)}
        placeholder={placeholder}
        multiline
        minRows={minRows}
        maxRows={maxRows}
        fullWidth
        slotProps={{
          htmlInput: {
            "aria-label": ariaLabel,
            "aria-autocomplete": "list",
            "aria-controls": open ? listId : undefined,
            "aria-activedescendant": open ? `${listId}-${current}` : undefined,
          },
        }}
      />
      <Popper
        open={open}
        anchorEl={field}
        placement="bottom-start"
        sx={(theme) => ({ zIndex: theme.zIndex.modal })}
      >
        <Paper elevation={8} sx={{ width: 280, maxWidth: "calc(100vw - 32px)", my: 0.5 }}>
          {/* MenuItem needs a MenuList. Focus stays in the field, so the list never takes the keys itself. */}
          <MenuList
            id={listId}
            role="listbox"
            aria-label={trigger?.kind === "emoji" ? "Emoji" : "People to mention"}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === current}
                selected={index === current}
                /* Keeps the cursor in the field. */
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
                onMouseMove={() => setActive(index)}
              >
                <SearchOptionContent
                  option={option}
                  label={highlight(option.label, trigger?.query ?? "")}
                />
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </>
  );
}

/*
 * The segments with the text from `from` to `to` replaced by `inserted`. A
 * mention the change reaches into becomes plain text, as it reads, so
 * editing one never leaves a mention of someone it no longer names.
 */
function replaceRange(
  segments: MentionSegment[],
  labels: string[],
  from: number,
  to: number,
  inserted: MentionSegment[],
): MentionSegment[] {
  const text = labels.join("");
  const before: MentionSegment[] = [];
  const after: MentionSegment[] = [];
  /* Where the segments the change reaches into start and end: their text outside it stays, as plain text. */
  let reachStart = from;
  let reachEnd = to;
  let at = 0;
  segments.forEach((segment, index) => {
    const start = at;
    const end = (at += labels[index].length);
    if (end <= from) before.push(segment);
    else if (start >= to) after.push(segment);
    else {
      reachStart = Math.min(reachStart, start);
      reachEnd = Math.max(reachEnd, end);
    }
  });
  const result = [
    ...before,
    { text: text.slice(reachStart, from) },
    ...inserted,
    { text: text.slice(to, reachEnd) },
    ...after,
  ];
  /* Runs of plain text as one, and no empty ones. */
  return result.reduce<MentionSegment[]>((merged, segment) => {
    const last = merged.at(-1);
    if ("text" in segment && !segment.text) return merged;
    if ("text" in segment && last && "text" in last) {
      merged[merged.length - 1] = { text: last.text + segment.text };
    } else merged.push(segment);
    return merged;
  }, []);
}

/*
 * What the caret is in the middle of typing after. An emoji's shortcode
 * first, since it has no spaces and so is always the nearer: a colon not run
 * into a word or number before it, then at least two of a shortcode's
 * characters. Otherwise an @ on the same line, not run into a word before it,
 * with something other than a space straight after it, if anything.
 */
function findTrigger(text: string, caret: number): Trigger | null {
  const before = text.slice(0, caret);
  const emoji = /(?<![\p{L}\p{N}_:]):([\w+-]{2,})$/u.exec(before);
  if (emoji) return { kind: "emoji", start: emoji.index, query: emoji[1] };
  const mention = /(?<![\p{L}\p{N}_])@((?:[^\s@][^\n@]*)?)$/u.exec(before);
  return mention ? { kind: "mention", start: mention.index, query: mention[1] } : null;
}
