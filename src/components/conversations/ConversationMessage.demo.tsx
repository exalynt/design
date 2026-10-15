import Box from "@mui/material/Box";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  CLIENT,
  LONG_MESSAGES,
  PEOPLE,
  SAMPLE_MESSAGES,
  YOU,
  sideOf,
  type SampleMessage,
} from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { ConversationMessage, ConversationThread } from "./ConversationMessage";

/* One of each: someone else's read, the reader's own, then a teammate's and someone else's unread. */
const [DANA_FIRST, PRIYA_REPLY, MARCUS_OWN, SAM_LAST] = SAMPLE_MESSAGES;
const KINDS = [
  { message: DANA_FIRST, unread: false },
  { message: MARCUS_OWN, unread: false },
  {
    message: {
      ...PRIYA_REPLY,
      id: "msg-kinds-priya",
      at: "2026-10-14T08:30:00Z",
      body: "Thanks Marcus. I'll leave the discount out of the first monthly invoice unless finance says otherwise.",
    },
    unread: true,
  },
  { message: SAM_LAST, unread: true },
];

/* The same conversation as a client reads it: Dana at Acme, whose assigned team at Exalynt is Priya and Marcus. */
const [DANA, PRIYA, MARCUS] = PEOPLE;
function asDana(message: SampleMessage) {
  return {
    organization: message.organization,
    mine: message.author === DANA,
    ours: message.organization === CLIENT,
    assignedTeam: message.author === PRIYA || message.author === MARCUS,
  };
}

export function ConversationMessageDemo() {
  const [first] = SAMPLE_MESSAGES;
  return (
    <>
      <Example title="A conversation, read as Marcus at Exalynt: his own on the right, off-centre as texts are, Exalynt's tinted, his teammate's on the left with the client's, each naming their organization; hover Priya's or Marcus's name or picture for who they are; the first message marked as the original with files attached (open one), and mentions picked out, yours in their own color">
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {SAMPLE_MESSAGES.map((message, index) => (
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
          </ConversationThread>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationThread>
  {messages.map((message, index) => (
    <ConversationMessage
      key={message.id}
      author={{ name: message.created_by.name, avatarUrl: message.created_by.avatar_url }}
      organization={{ name: message.organization.name, logoUrl: message.organization.image_url }}
      ours={message.organization.id === activeOrganization.id}
      mine={message.created_by.id === me.id}
      at={message.created_at}
      people={participants}
      you={me}
      original={index === 0}
      attachments={message.attachments.map((file) => ({
        kind: file.kind, // "image", "video" or "document"
        url: file.url,
        name: file.name,
        size: file.size,
      }))}
    >
      {message.body}
    </ConversationMessage>
  ))}
</ConversationThread>`}
      />

      <Example title="Each kind in its own color: Marcus's own filled in the primary color, his teammate Priya's tagged Teammate, her picture ringed and tinted in the secondary color, the client's plain; unread adds a thick primary edge and New over either">
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {KINDS.map(({ message, unread }) => (
              <ConversationMessage
                key={message.id}
                author={message.author}
                {...sideOf(message)}
                at={message.at}
                people={PEOPLE}
                you={YOU}
                unread={unread}
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationMessage
  author={author(message)}
  organization={organizationOf(message)}
  mine={message.created_by.id === me.id}
  ours={message.organization.id === activeOrganization.id}
  unread={index >= readOnOpen}
  at={message.created_at}
>`}
      />

      <Example title="Read as Dana at Acme: Priya and Marcus are on her assigned team at Exalynt, tagged Your team, and Sam is her teammate; hover a tag for what it means. On a card under 400px wide, as in a popout or on a phone, the organization is just its logo">
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {SAMPLE_MESSAGES.map((message) => (
              <ConversationMessage
                key={message.id}
                author={message.author}
                {...asDana(message)}
                at={message.at}
                people={PEOPLE}
                you={DANA}
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
        </Box>
      </Example>
      <Example title="The same, condensed: the organization just its logo, at any width; hover it for its name">
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {SAMPLE_MESSAGES.map((message) => (
              <ConversationMessage
                key={message.id}
                author={message.author}
                {...asDana(message)}
                at={message.at}
                people={PEOPLE}
                you={DANA}
                condensed
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationMessage
  author={author(message)}
  organization={organizationOf(message)}
  mine={message.created_by.id === me.id}
  ours={message.organization.id === activeOrganization.id}
  assignedTeam={onYourTeam(message.created_by)}
  condensed={narrow}
  at={message.created_at}
>`}
      />

      <Example title='With avatar="header": each picture small before the name, in the card&apos;s corner, so the cards have the room'>
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {SAMPLE_MESSAGES.map((message, index) => (
              <ConversationMessage
                key={message.id}
                avatar="header"
                author={message.author}
                {...sideOf(message)}
                at={message.at}
                people={PEOPLE}
                you={YOU}
                original={index === 0}
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationMessage avatar="header" author={author} at={message.created_at}>`}
      />

      <Example title="Long messages start cut short with Show more, unless unread: the second is, so it starts open, and Show less cuts it">
        <Box sx={{ maxWidth: 640 }}>
          <ConversationThread>
            {LONG_MESSAGES.map((message, index) => (
              <ConversationMessage
                key={message.id}
                author={message.author}
                {...sideOf(message)}
                at={message.at}
                people={PEOPLE}
                you={YOU}
                unread={index === 1}
              >
                {message.body}
              </ConversationMessage>
            ))}
          </ConversationThread>
        </Box>
      </Example>

      <Example title="A glance at one, such as a conversation's row in a list, cut at two lines with its files counted">
        <Box sx={{ maxWidth: 480 }}>
          <ConversationThread>
            <ConversationMessage
              author={first.author}
              at={first.at}
              people={PEOPLE}
              you={YOU}
              attachments={first.attachments}
              lines={2}
            >
              {first.body}
            </ConversationMessage>
          </ConversationThread>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationThread>
  <ConversationMessage author={author} at={latest.created_at} lines={2}>
    {latest.body}
  </ConversationMessage>
</ConversationThread>`}
      />
    </>
  );
}
