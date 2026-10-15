import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../docs/CodeBlock";
import { PEOPLE, YOU } from "../docs/conversations";
import { Example } from "../docs/Example";
import { ConversationMessage, ConversationThread } from "./ConversationMessage";
import { MentionField } from "./MentionField";

const RENAMED = "Priya Shah-Kumar";

export function MentionFieldDemo() {
  const [text, setText] = useState("Thanks <@usr_priya>. ");
  const [renamed, setRenamed] = useState(false);
  /* Priya under her new name, once renamed: her id is the same, so her mentions follow. */
  const people = PEOPLE.map((person) =>
    renamed && person.id === "usr_priya" ? { ...person, name: RENAMED } : person,
  );

  return (
    <>
      <Example title="Type @ to mention someone, and see it as the message it'll be and as it's saved">
        <Stack spacing={2} sx={{ maxWidth: 560 }}>
          <MentionField
            value={text}
            onChange={setText}
            people={people}
            placeholder="Write a reply…"
            aria-label="Reply"
          />
          {text.trim() ? (
            <ConversationThread>
              <ConversationMessage author={YOU} at="2026-10-15T14:30:00Z" people={people} you={YOU}>
                {text}
              </ConversationMessage>
            </ConversationThread>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Write something to see it as a message.
            </Typography>
          )}
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Saved as
            </Typography>
            <Box
              component="code"
              sx={{
                display: "block",
                fontFamily: "monospace",
                fontSize: 13,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {text || " "}
            </Box>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ alignItems: { sm: "center" } }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setRenamed((value) => !value)}
              sx={{ alignSelf: "flex-start" }}
            >
              {renamed ? "Undo the rename" : `Rename Priya to ${RENAMED}`}
            </Button>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Reading as {YOU.name}: mentions of you take your color.
            </Typography>
          </Stack>
        </Stack>
      </Example>
      <CodeBlock
        code={`<MentionField
  value={draft} // "Thanks <@usr_priya>. "
  onChange={setDraft}
  people={participants.filter((person) => person.id !== me.id)}
  onKeyDown={sendOnEnter}
  placeholder="Write a reply…"
  aria-label="Reply"
/>`}
      />
    </>
  );
}
