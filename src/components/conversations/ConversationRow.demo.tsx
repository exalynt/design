import { useRef, useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
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
import { ConversationPopout } from "./ConversationPopout";
import { ConversationRow } from "./ConversationRow";

const [, PRIYA, , SAM] = PEOPLE;
const PLANS = "Switching annual plans to monthly";

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
function previewOf(messages: SampleMessage[], earlier: number) {
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

/* What an app might put in a row's menu. */
function RowMenu({ subject }: { subject: string }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <IconButton
        size="small"
        aria-label={`Actions for ${subject}`}
        aria-haspopup="menu"
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{ color: "text.secondary" }}
      >
        <MoreHorizRoundedIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <MarkChatReadOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as read</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <LockOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Close conversation</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export function ConversationRowDemo() {
  const [plansOpen, setPlansOpen] = useState(false);
  /* How many of its messages are unread, and how many were as it opened, which its popout marks. */
  const [plansUnread, setPlansUnread] = useState(1);
  const [unreadOnOpen, setUnreadOnOpen] = useState(0);
  const [spam, setSpam] = useState<SampleMessage[]>();
  const reading = useRef(false);
  const latest = SAMPLE_MESSAGES.at(-1)!;

  /* As an app would read them: once, the first time its preview opens. */
  function readSpam() {
    if (reading.current) return;
    reading.current = true;
    setTimeout(() => setSpam(SPAM_MESSAGES), 800);
  }

  return (
    <>
      <Example title="A list: hover a row for its latest messages, and click the first to open it over the page, at its new messages; Mark as unread in its title bar brings it back unread. It mentions you, the second is unread, and the last is read and closed">
        <Card variant="outlined" sx={{ maxWidth: 640 }}>
          <Stack divider={<Divider />}>
            <ConversationRow
              subject={PLANS}
              href="#ConversationRow"
              onOpen={() => {
                setUnreadOnOpen(plansUnread);
                setPlansUnread(0);
                setPlansOpen(true);
              }}
              at={latest.at}
              latest={{ author: latest.author.name, body: latest.body }}
              people={PEOPLE}
              count={SAMPLE_MESSAGES.length}
              unread={plansUnread}
              mentionsYou={plansUnread > 0}
              actions={<RowMenu subject={PLANS} />}
              preview={{ messages: previewOf(SAMPLE_MESSAGES, 0) }}
            />
            <ConversationRow
              subject="Invoice emails going to spam"
              href="#ConversationRow"
              at="2026-10-14T16:05:00Z"
              latest={{ author: SAM.name, body: SPAM_MESSAGES[1].body }}
              people={PEOPLE}
              count={6}
              unread={2}
              actions={<RowMenu subject="Invoice emails going to spam" />}
              preview={{
                messages: spam && previewOf(spam, 4),
                earlier: spam ? 4 : 0,
                loading: !spam,
                onOpen: readSpam,
              }}
            />
            <ConversationRow
              subject="Moving the reports to a weekly email"
              href="#ConversationRow"
              at="2026-10-02T13:40:00Z"
              latest={{ author: "You", body: "Thanks, the first one came through this morning." }}
              people={[YOU, PRIYA]}
              count={4}
              closed={{ by: YOU.name, at: "2026-10-02T14:10:00Z" }}
            />
          </Stack>
        </Card>
      </Example>
      <CodeBlock
        code={`<Card variant="outlined">
  <Stack divider={<Divider />}>
    {conversations.map((conversation) => (
      <ConversationRow
        key={conversation.id}
        subject={conversation.subject}
        href={\`/conversations/\${conversation.id}\`}
        onOpen={() => openPopout(conversation)}
        at={conversation.last_activity_at}
        latest={{ author: nameOf(latest.created_by), body: latest.body }}
        people={participants}
        count={conversation.message_count}
        unread={unread.count}
        mentionsYou={unread.mentioned}
        closed={conversation.closed && { by: conversation.closed.by.name, at: conversation.closed.at }}
        actions={<ConversationMenu conversation={conversation} />}
        preview={{ messages: recentMessages, earlier, loading, onOpen: () => readRecent(conversation) }}
      />
    ))}
  </Stack>
</Card>

{/* Its popout: which were unread as it opened stay marked while it's read. */}
<ConversationPopout
  title={conversation.subject}
  onClose={close}
  onMarkUnread={() => markUnread(conversation.id)}
>
  {messages.map((message, index) => (
    <ConversationMessage key={message.id} {...props(message)} unread={index >= readOnOpen}>
      {message.body}
    </ConversationMessage>
  ))}
</ConversationPopout>`}
      />

      {plansOpen ? (
        <ConversationPopout
          title={PLANS}
          onClose={() => setPlansOpen(false)}
          onMarkUnread={() => setPlansUnread(1)}
        >
          {SAMPLE_MESSAGES.map((message, index) => (
            <ConversationMessage
              key={message.id}
              author={message.author}
              {...sideOf(message)}
              at={message.at}
              people={PEOPLE}
              you={YOU}
              original={index === 0}
              unread={index >= SAMPLE_MESSAGES.length - unreadOnOpen}
            >
              {message.body}
            </ConversationMessage>
          ))}
        </ConversationPopout>
      ) : null}
    </>
  );
}
