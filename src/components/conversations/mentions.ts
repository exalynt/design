import type { UserProfile } from "../engineers/UserAttribution";

/** Someone who can be @mentioned, known by an id that stays theirs if their name changes. */
export type MentionProfile = UserProfile & { id: string };

/*
 * Mentions are kept in a message's text as `<@id>`, the person's id rather
 * than their name, and shown as "@Name" from whoever has that id when the
 * message is read or edited. A message's text is runs of plain text and
 * mentions.
 */
export type MentionSegment = { text: string } | { id: string };

const TOKEN = /<@([^<>\s]+)>/g;

export function parseMentions(text: string): MentionSegment[] {
  const segments: MentionSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    if (match.index > last) segments.push({ text: text.slice(last, match.index) });
    segments.push({ id: match[1] });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
}

export function serializeMentions(segments: MentionSegment[]) {
  return segments.map((segment) => ("id" in segment ? `<@${segment.id}>` : segment.text)).join("");
}

/* A mention as it reads: "@" and their name, or a stand-in for an id no one has. */
export function mentionLabel(id: string, people: MentionProfile[]) {
  return `@${people.find((person) => person.id === id)?.name ?? "Unknown person"}`;
}
