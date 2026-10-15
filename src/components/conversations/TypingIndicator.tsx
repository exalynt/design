import { Fragment } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";
import { UserAttribution, type UserProfile } from "../engineers/UserAttribution";

/* As many names as it gives before counting the rest. */
const MAX_NAMES = 2;

/* Each dot rises and brightens in turn. */
const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-3px); opacity: 1; }
`;

export type TypingIndicatorProps = {
  /** Who's writing in the conversation now, not counting whoever's reading. Empty when no one is. */
  people: UserProfile[];
};

/*
 * Who's writing in a conversation right now: three dots rising in turn and
 * "Priya Shah is typing…", each name with its picture beside it, up to "Priya Shah, Sam Okafor and 2 others are
 * typing…". It keeps its line when no one is, so the reply box under it
 * doesn't jump as people start and stop, and says who to screen readers as
 * it changes. It only shows who it's given: the app sends when the reader
 * types and drops anyone it hasn't heard from in a few seconds.
 */
export function TypingIndicator({ people }: TypingIndicatorProps) {
  const named = people.length > MAX_NAMES + 1 ? people.slice(0, MAX_NAMES) : people;
  const others = people.length - named.length;
  /* Each name, joined as a sentence would: "A", "A and B", "A, B and C", "A, B and 2 others". */
  const count = named.length + (others ? 1 : 0);
  const joiner = (index: number) => (index === 0 ? "" : index === count - 1 ? " and " : ", ");

  return (
    <Box
      role="status"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        minHeight: 20,
        minWidth: 0,
        typography: "caption",
        color: "text.secondary",
      }}
    >
      {people.length ? (
        <>
          <Box aria-hidden sx={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {[0, 1, 2].map((dot) => (
              <Box
                key={dot}
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: "text.secondary",
                  animation: `${bounce} 1.2s ease-in-out ${dot * 0.15}s infinite`,
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    opacity: 0.6,
                  },
                }}
              />
            ))}
          </Box>
          <Box
            component="span"
            sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {named.map((person, index) => (
              <Fragment key={index}>
                {joiner(index)}
                <UserAttribution user={person} size={16} />
              </Fragment>
            ))}
            {others ? (
              <>
                {joiner(count - 1)}
                <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
                  {others} others
                </Box>
              </>
            ) : null}
            {count === 1 ? " is typing…" : " are typing…"}
          </Box>
        </>
      ) : null}
    </Box>
  );
}
