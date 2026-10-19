import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  CLIENT,
  EXALYNT,
  PEOPLE,
  PLANS_RELATED,
  SAMPLE_MESSAGES,
  SAMPLE_RELATED,
  YOU,
  sideOf,
  type SampleMessage,
} from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { ConversationMessage } from "./ConversationMessage";
import { ConversationPopout } from "./ConversationPopout";
import { ConversationRow, type ConversationRelated } from "./ConversationRow";

const [, PRIYA, , SAM] = PEOPLE;
const PLANS = "Switching annual plans to monthly";
const REPORTS = "Moving the reports to a weekly email";

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
    body: "<@usr_dana>, the test invoices I sent this afternoon all reached the inbox, from Gmail and Outlook as well as our own mail server, so I think we can call the records done.\n\nTwo things before we close it. Could the reminder emails go out from the same domain, so they get the same records? And should DMARC move from monitoring to quarantine once we've had a week of clean reports, or would you rather wait for the end of the month?",
  },
];

/* What each is about. */
const SPAM_RELATED: ConversationRelated[] = [
  { kind: "capability", name: "Email invoices" },
  { kind: "capacity", block: "core", number: "BLK-0042" },
];
const REPORTS_RELATED: ConversationRelated[] = [{ kind: "feature", name: "Weekly reports" }];
const SIGN_IN = "Signing in with the company's Google accounts";

/* Closed, the reader having said the last word. */
const REPORT_MESSAGES: SampleMessage[] = [
  {
    id: "msg-reports-1",
    author: YOU,
    organization: EXALYNT,
    at: "2026-10-01T09:15:00Z",
    body: "Clients keep asking for fewer report emails. Could the daily ones become one a week, on Monday mornings?",
  },
  {
    id: "msg-reports-2",
    author: PRIYA,
    organization: EXALYNT,
    at: "2026-10-01T11:30:00Z",
    body: "Yes, it's a schedule change and a template that sums up the week. I'll have it out for next Monday.",
  },
  {
    id: "msg-reports-3",
    author: PRIYA,
    organization: EXALYNT,
    at: "2026-10-02T09:05:00Z",
    body: "The first weekly email went out this morning. Tell me if anything in it looks off.",
  },
  {
    id: "msg-reports-4",
    author: YOU,
    organization: EXALYNT,
    at: "2026-10-02T13:40:00Z",
    body: "Thanks, it came through and reads well. Closing this one.",
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
  const [reportsOpen, setReportsOpen] = useState(false);
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
      <Example title="A list: hover a row for its latest messages, and click the first or last to open it over the page. The first opens at its new messages, and Mark as unread in its title bar brings it back unread. It mentions you, the second is unread, with a long latest message cut short in its preview, and says which space it's in, and the last is read and closed, so it opens without a reply box">
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
              people={PEOPLE}
              count={SAMPLE_MESSAGES.length}
              related={PLANS_RELATED}
              unread={plansUnread}
              mentionsYou={plansUnread > 0}
              actions={<RowMenu subject={PLANS} />}
              preview={{ messages: previewOf(SAMPLE_MESSAGES, 0) }}
            />
            <ConversationRow
              subject="Invoice emails going to spam"
              href="#ConversationRow"
              space="Default · Northwind"
              at="2026-10-14T16:05:00Z"
              people={PEOPLE}
              count={6}
              related={SPAM_RELATED}
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
              subject={REPORTS}
              href="#ConversationRow"
              onOpen={() => setReportsOpen(true)}
              at="2026-10-02T14:10:00Z"
              people={[YOU, PRIYA]}
              count={REPORT_MESSAGES.length}
              related={REPORTS_RELATED}
              closed={{ by: YOU.name, at: "2026-10-02T14:10:00Z" }}
              preview={{ messages: previewOf(REPORT_MESSAGES.slice(-2), 2), earlier: 2 }}
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
        space={spaceName(conversation.space_id)}
        at={conversation.last_activity_at}
        people={participants}
        count={conversation.message_count}
        related={[
          { kind: "product", name: product.name },
          ...features.map((feature) => ({ kind: "feature", name: feature.name })),
          ...capabilities.map((capability) => ({ kind: "capability", name: capability.name })),
          ...focuses.map((focus) => ({ kind: "focus", name: focus.title })),
          ...blocks.map((block) => ({ kind: "capacity", block: block.type, number: block.number })),
        ]}
        unread={unread.count}
        mentionsYou={unread.mentioned}
        closed={conversation.closed && { by: conversation.closed.by.name, at: conversation.closed.at }}
        actions={<ConversationMenu conversation={conversation} />}
        preview={{ messages: recentMessages, earlier, loading, onOpen: () => readRecent(conversation) }}
      />
    ))}
  </Stack>
</Card>

{/* Its popout: which were unread as it opened stay marked while it's read. Closed, it still opens, with a notice in place of the reply box. */}
<ConversationPopout
  title={conversation.subject}
  onClose={close}
  onMarkUnread={() => markUnread(conversation.id)}
  onSend={conversation.closed ? undefined : send}
  notice={conversation.closed && <ClosedNotice />}
>
  {messages.map((message, index) => (
    <ConversationMessage key={message.id} {...props(message)} unread={index >= readOnOpen}>
      {message.body}
    </ConversationMessage>
  ))}
</ConversationPopout>`}
      />

      <Example title="About more than one of each: two products, three Features, three Capabilities, two Focuses and two blocks of capacity. They're counted, and what doesn't fit on the line is +N more: hover it, or tap it on a phone, for all of it. Narrow the page or the phone preview to see fewer fit">
        <Card variant="outlined" sx={{ maxWidth: 640 }}>
          <ConversationRow
            subject={SIGN_IN}
            href="#ConversationRow"
            at="2026-10-14T15:20:00Z"
            people={PEOPLE}
            count={9}
            related={SAMPLE_RELATED}
          />
        </Card>
      </Example>

      {plansOpen ? (
        <ConversationPopout
          title={PLANS}
          related={PLANS_RELATED}
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

      {reportsOpen ? (
        <ConversationPopout
          title={REPORTS}
          related={REPORTS_RELATED}
          defaultPosition={{ x: 48, y: 96 }}
          onClose={() => setReportsOpen(false)}
          notice={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                This conversation is closed, so no one can send messages in it.
              </Typography>
            </Box>
          }
        >
          {REPORT_MESSAGES.map((message, index) => (
            <ConversationMessage
              key={message.id}
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
        </ConversationPopout>
      ) : null}
    </>
  );
}
