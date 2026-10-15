import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  CLIENT,
  EXALYNT,
  LONG_MESSAGES,
  PEOPLE,
  PLANS_RELATED,
  SAMPLE_MESSAGES,
  YOU,
  sentAttachments,
  sideOf,
  type SampleMessage,
} from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { ConversationMessage } from "./ConversationMessage";
import { ConversationPopout } from "./ConversationPopout";

const OPEN = "Switching annual plans to monthly";
const CLOSED = "Invoice emails going to spam";
const LONG = "Moving every client to the new invoices";

const UPDATES = [
  "the first batch of clients is on the new invoices.",
  "two clients asked for their old invoice number format back.",
  "the PDF now shows the plan's name as well as its price.",
  "finance checked last month's totals against the old system, and they match.",
];
/* A long conversation, oldest first: short updates back and forth, with a long message now and then. */
const LONG_THREAD: SampleMessage[] = Array.from({ length: 36 }, (_, index) => {
  const long = LONG_MESSAGES[index % 2];
  const author = PEOPLE[index % PEOPLE.length];
  return index % 9 === 4
    ? { ...long, id: `long-${index}`, at: dayAt(index) }
    : {
        id: `long-${index}`,
        author,
        organization: author.id === "usr_dana" || author.id === "usr_sam" ? CLIENT : EXALYNT,
        at: dayAt(index),
        body: `Update ${index + 1}: ${UPDATES[index % UPDATES.length]}`,
      };
});
function dayAt(index: number) {
  return new Date(Date.UTC(2026, 8, 1 + index, 15, 0)).toISOString();
}
/* How many it opens with, and how many more each Show more brings in. */
const LATEST = 8;
const MORE = 10;

export function ConversationPopoutDemo() {
  const theme = useTheme();
  /* Which are open, front last, as an app keeps them. */
  const [open, setOpen] = useState<string[]>([]);
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [typing, setTyping] = useState(false);
  /* The long one shows its latest few, and more as asked for, as if each batch were read from a server. */
  const [shown, setShown] = useState(LATEST);
  const [loadingEarlier, setLoadingEarlier] = useState(false);

  function showEarlier() {
    setLoadingEarlier(true);
    setTimeout(() => {
      setShown((prev) => prev + MORE);
      setLoadingEarlier(false);
    }, 600);
  }
  const priya = PEOPLE.find((person) => person.id === "usr_priya")!;

  /* As if Priya were there: after each reply, she types for a moment, then answers. */
  function reply(body: string, files: File[]) {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${prev.length + 1}`,
        author: YOU,
        organization: EXALYNT,
        at: new Date().toISOString(),
        body,
        attachments: sentAttachments(files),
      },
    ]);
    setTimeout(() => setTyping(true), 600);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${prev.length + 1}`,
          author: priya,
          organization: EXALYNT,
          at: new Date().toISOString(),
          body: `Got it, thanks <@${YOU.id}>.`,
        },
      ]);
    }, 3600);
  }

  const show = (title: string) =>
    setOpen((prev) => (prev.at(-1) === title ? prev : [...prev.filter((t) => t !== title), title]));
  const close = (title: string) => setOpen((prev) => prev.filter((t) => t !== title));
  const zIndex = (title: string) => theme.zIndex.drawer + 1 + open.indexOf(title);

  return (
    <>
      <Example title="Open one or both: drag a title bar to move it, its corner to size it, and click one to bring it forward. Type @ in the reply to mention someone, and send one to see Priya typing back. Related, at the top right of the first, slides in what it's related to">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={() => show(OPEN)}>
            Open a conversation
          </Button>
          <Button variant="outlined" onClick={() => show(CLOSED)}>
            Open a closed one
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setShown(LATEST);
              show(LONG);
            }}
          >
            Open a long one
          </Button>
        </Stack>
      </Example>

      {open.includes(OPEN) ? (
        <ConversationPopout
          title={OPEN}
          href="#ConversationPopout"
          related={PLANS_RELATED}
          people={PEOPLE.filter((person) => person !== YOU)}
          canAttach
          zIndex={zIndex(OPEN)}
          onFocus={() => show(OPEN)}
          onClose={() => close(OPEN)}
          typing={typing ? [priya] : []}
          onSend={reply}
        >
          {messages.map((message, index) => (
            <ConversationMessage
              key={message.id}
              author={message.author}
              {...sideOf(message)}
              details
              at={message.at}
              people={PEOPLE}
              you={YOU}
              original={index === 0}
              attachments={message.attachments}
            >
              {message.body}
            </ConversationMessage>
          ))}
        </ConversationPopout>
      ) : null}

      {open.includes(LONG) ? (
        <ConversationPopout
          title={LONG}
          defaultPosition={{ x: 96, y: 48 }}
          zIndex={zIndex(LONG)}
          onFocus={() => show(LONG)}
          onClose={() => close(LONG)}
          earlier={Math.max(0, LONG_THREAD.length - shown)}
          onShowEarlier={showEarlier}
          loadingEarlier={loadingEarlier}
        >
          {LONG_THREAD.slice(-shown).map((message, index, all) => (
            <ConversationMessage
              key={message.id}
              author={message.author}
              {...sideOf(message)}
              details
              at={message.at}
              people={PEOPLE}
              you={YOU}
              original={all.length === LONG_THREAD.length && index === 0}
            >
              {message.body}
            </ConversationMessage>
          ))}
        </ConversationPopout>
      ) : null}

      {open.includes(CLOSED) ? (
        <ConversationPopout
          title={CLOSED}
          defaultPosition={{ x: 48, y: 96 }}
          zIndex={zIndex(CLOSED)}
          onFocus={() => show(CLOSED)}
          onClose={() => close(CLOSED)}
          notice={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                This conversation is closed, so no one can send messages in it.
              </Typography>
            </Box>
          }
        >
          <ConversationMessage author={YOU} at="2026-10-02T13:40:00Z" original>
            Clients say our invoice emails land in spam.
          </ConversationMessage>
        </ConversationPopout>
      ) : null}

      <CodeBlock
        code={`{open.map((conversation) => (
  <ConversationPopout
    key={conversation.id}
    title={conversation.subject}
    related={related}
    href={\`/conversations/\${conversation.id}\`}
    loading={thread.status === "loading"}
    people={participants.filter((person) => person.id !== me.id)}
    canAttach
    typing={typing[conversation.id] ?? []}
    sending={sending}
    onSend={send}
    zIndex={theme.zIndex.drawer + 1 + stack.indexOf(conversation.id)}
    onFocus={() => raise(conversation.id)}
    onClose={() => close(conversation.id)}
  >
    {thread.messages.map((message, index) => (
      <ConversationMessage
        key={message.id}
        author={author(message)}
        at={message.created_at}
        people={participants}
        you={me}
        original={index === 0}
        attachments={message.attachments}
      >
        {message.body}
      </ConversationMessage>
    ))}
  </ConversationPopout>
))}`}
      />
    </>
  );
}
