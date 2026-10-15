// What a message can have attached: images, videos and documents.

/* The documents a message can carry, besides any image or video. */
const DOCUMENTS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "odt",
  "ods",
  "odp",
  "rtf",
  "txt",
  "csv",
  "md",
];

/* What the file picker offers. */
export const ATTACHABLE = ["image/*", "video/*", ...DOCUMENTS.map((ext) => `.${ext}`)].join(",");

/* "report.PDF" is "pdf"; a name without a dot has none. */
export const fileExtension = (name: string) =>
  name.includes(".") ? (name.split(".").pop() ?? "").toLowerCase() : "";

/* An image, a video, or one of the documents, by its type or, where the browser gives none, its extension. */
export function isAttachable(file: File) {
  return (
    file.type.startsWith("image/") ||
    file.type.startsWith("video/") ||
    DOCUMENTS.includes(fileExtension(file.name))
  );
}

/* "820 KB", "4.3 MB". */
export function fileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
