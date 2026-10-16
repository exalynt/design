import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { ANA, MARCUS, PRIYA } from "../../docs/engineers";
import { UserAttribution } from "./UserAttribution";

const CLIENT = { name: "Dana Ortiz" };

export function UserAttributionDemo() {
  return (
    <>
      <Example title="Anyone: a picture, or initials without one, and their name">
        <Stack spacing={1.5} sx={{ fontSize: 14 }}>
          <UserAttribution user={PRIYA} />
          <UserAttribution user={CLIENT} />
        </Stack>
      </Example>
      <CodeBlock
        code={`<UserAttribution user={{ name: user.name, avatarUrl: user.avatar_url }} />`}
      />

      <Example title="An engineer, with details (hover the name)">
        <Stack spacing={1.5} sx={{ fontSize: 14 }}>
          <UserAttribution user={PRIYA} details />
          <UserAttribution user={MARCUS} details />
        </Stack>
      </Example>
      <CodeBlock code={`<UserAttribution user={engineerProfile} details />`} />

      <Example title="An engineer's level under their name, where knowing it helps, such as choosing who works on a block">
        <Stack spacing={2} sx={{ fontSize: 15 }}>
          <UserAttribution user={PRIYA} showLevel details />
          <UserAttribution user={MARCUS} showLevel />
        </Stack>
      </Example>
      <CodeBlock code={`<UserAttribution user={engineerProfile} showLevel details />`} />

      <Example title="Smaller: the badge without its text, after the name on one line, where the whole badge won't fit (hover the badge)">
        <Stack spacing={1.5} sx={{ fontSize: 14 }}>
          <UserAttribution user={PRIYA} showLevel="squares" />
          <UserAttribution user={MARCUS} showLevel="squares" details />
        </Stack>
      </Example>
      <CodeBlock code={`<UserAttribution user={engineerProfile} showLevel="squares" />`} />

      <Example title="Just the picture, where names would crowd, such as who's on a Focus (hover one)">
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <UserAttribution user={PRIYA} photoOnly details size={32} />
          <UserAttribution user={MARCUS} photoOnly details size={32} />
          <UserAttribution user={CLIENT} photoOnly size={32} />
        </Stack>
      </Example>
      <CodeBlock code={`<UserAttribution user={engineerProfile} photoOnly details size={32} />`} />

      <Example title="A Team Lead, in each form: a blue-silver star on their picture (hover the picture)">
        <Stack spacing={2} sx={{ fontSize: 14 }}>
          <UserAttribution user={ANA} />
          <UserAttribution user={ANA} showLevel="squares" />
          <UserAttribution user={ANA} showLevel details />
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
            <UserAttribution user={ANA} photoOnly details size={32} />
            <UserAttribution user={PRIYA} photoOnly details size={32} />
            <UserAttribution user={MARCUS} photoOnly details size={32} />
          </Stack>
        </Stack>
      </Example>
      <CodeBlock
        code={`<UserAttribution user={{ ...engineerProfile, teamLead: true }} showLevel />`}
      />
    </>
  );
}
