import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  CLIENT,
  EXALYNT,
  PEOPLE,
  SAMPLE_MESSAGES,
  YOU,
  sideOf,
  type SampleMessage,
} from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { ConversationMessage } from "./ConversationMessage";
import { ConversationPreview } from "./ConversationPreview";

const [, PRIYA, , SAM] = PEOPLE;

/* The latest two of six, read only once its preview opens. */
const SPAM_MESSAGES: SampleMessage[] = [
  {
    id: "msg-spam-5",
    author: PRIYA,
    organization: EXALYNT,
    at: "2026-10-14T11:30:00Z",
    body: "The invoices go out from our own domain, which had no SPF or DKIM records. I've added both, and DMARC in monitoring mode.",
  },
  {
    id: "msg-spam-6",
    author: SAM,
    organization: CLIENT,
    at: "2026-10-14T16:05:00Z",
    body: "<@usr_dana>, the test invoices I sent this afternoon all reached the inbox.",
  },
];

/* Messages as a preview shows them: four lines at most, the first marked as the original where nothing came before. */
function messagesOf(messages: SampleMessage[], earlier: number) {
  return messages.map((message, index) => (
    <ConversationMessage
      key={message.id}
      author={message.author}
      {...sideOf(message)}
      at={message.at}
      people={PEOPLE}
      you={YOU}
      original={earlier === 0 && index === 0}
      lines={4}
    >
      {message.body}
    </ConversationMessage>
  ));
}

export function ConversationPreviewDemo() {
  const [spam, setSpam] = useState<SampleMessage[]>();
  const reading = useRef(false);

  /* As an app would read them: once, the first time it opens. */
  function readSpam() {
    if (reading.current) return;
    reading.current = true;
    setTimeout(() => setSpam(SPAM_MESSAGES), 800);
  }

  return (
    <>
      <Example title="Hover a row, or tab to one, for its latest messages. The second reads them as it first opens">
        <Box
          sx={{
            maxWidth: 480,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
          }}
        >
          <List disablePadding>
            <ConversationPreview
              title="Switching annual plans to monthly"
              messages={messagesOf(SAMPLE_MESSAGES, 0)}
            >
              <ListItemButton divider>
                <ListItemText
                  primary="Switching annual plans to monthly"
                  secondary={`${SAM.name}: finance would rather it drop off.`}
                  slotProps={{ primary: { noWrap: true }, secondary: { noWrap: true } }}
                />
              </ListItemButton>
            </ConversationPreview>
            <ConversationPreview
              title="Invoice emails going to spam"
              messages={spam && messagesOf(spam, 4)}
              earlier={spam ? 4 : 0}
              loading={!spam}
              onOpen={readSpam}
            >
              <ListItemButton>
                <ListItemText
                  primary="Invoice emails going to spam"
                  secondary={`${SAM.name}: the test invoices all reached the inbox.`}
                  slotProps={{ primary: { noWrap: true }, secondary: { noWrap: true } }}
                />
              </ListItemButton>
            </ConversationPreview>
          </List>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationPreview
  title={conversation.subject}
  loading={recent.status === "loading"}
  failed={recent.status === "failed"}
  earlier={conversation.message_count - recent.messages.length}
  onOpen={() => readRecent(conversation)}
  suppressed={menuOpen}
  messages={recent.messages.map((message, index) => (
    <ConversationMessage
      key={message.id}
      author={author(message)}
      at={message.created_at}
      people={participants}
      you={me}
      original={index === 0 && recent.messages.length === conversation.message_count}
      lines={4}
    >
      {message.body}
    </ConversationMessage>
  ))}
>
  <ConversationRow conversation={conversation} />
</ConversationPreview>`}
      />
    </>
  );
}
