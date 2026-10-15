import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { SAMPLE_RELATED } from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { ConversationRelatedPopover } from "./ConversationRelatedPopover";

export function ConversationRelatedPopoverDemo() {
  return (
    <>
      <Example title="Hover, focus or tap it for everything a conversation is related to: on its own, saying how many, and after the few shown beside it, as ConversationRow's +N more">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
            <Typography variant="subtitle2" component="span">
              Signing in with the company&rsquo;s Google accounts
            </Typography>
            <ConversationRelatedPopover related={SAMPLE_RELATED} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              2 Products · 3 Features
            </Typography>
            <ConversationRelatedPopover related={SAMPLE_RELATED} label="+7 more" />
          </Box>
        </Box>
      </Example>
      <CodeBlock
        code={`<ConversationRelatedPopover related={related} />

{/* After the few shown beside it. */}
<ConversationRelatedPopover related={related} label={\`+\${rest} more\`} />`}
      />
    </>
  );
}
