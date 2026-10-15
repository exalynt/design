import { useState } from "react";
import Stack from "@mui/material/Stack";
import { CodeBlock } from "../docs/CodeBlock";
import {
  EXALYNT,
  PEOPLE,
  SAMPLE_MESSAGES,
  YOU,
  sentAttachments,
  sideOf,
} from "../docs/conversations";
import { Example } from "../docs/Example";
import { ConversationMessage, ConversationThread } from "./ConversationMessage";
import { MessageComposer } from "./MessageComposer";

export function MessageComposerDemo() {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES.slice(-1));
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  /* As if to a server: a moment on the way, then it's in the thread and the draft empties. */
  function send(body: string) {
    setSending(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${prev.length + 10}`,
          author: YOU,
          organization: EXALYNT,
          at: new Date().toISOString(),
          body,
          attachments: sentAttachments(attachments),
        },
      ]);
      setDraft("");
      setAttachments([]);
      setSending(false);
    }, 800);
  }

  return (
    <>
      <Example title="Reply under a conversation: @ mentions someone, : and a name finds an emoji (:tada), files drop on it, paste in or come from the paperclip, and Enter sends">
        <Stack spacing={2} sx={{ maxWidth: 560 }}>
          <ConversationThread>
            {messages.map((message) => (
              <ConversationMessage
                key={message.id}
                author={message.author}
                {...sideOf(message)}
                at={message.at}
                people={PEOPLE}
                you={YOU}
                attachments={message.attachments}
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
          <MessageComposer
            value={draft}
            onChange={setDraft}
            onSend={send}
            sending={sending}
            people={PEOPLE.filter((person) => person.id !== YOU.id)}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
          />
        </Stack>
      </Example>
      <CodeBlock
        code={`const [draft, setDraft] = useState("");
const [files, setFiles] = useState<File[]>([]);

<MessageComposer
  value={draft}
  onChange={setDraft}
  attachments={files}
  onAttachmentsChange={setFiles}
  onSend={async (body) => {
    await sendMessage(conversation.id, { body, files });
    setDraft("");
    setFiles([]);
  }}
  sending={sending}
  people={participants.filter((person) => person.id !== me.id)}
/>`}
      />
    </>
  );
}
