export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function packDrafts(
  title: string,
  drafts: { label: string; text: string }[],
): string {
  const blocks = drafts.map((draft) => `## ${draft.label}\n\n${draft.text.trim()}`);
  return `${title}\n\n${blocks.join("\n\n-----\n\n")}\n`;
}
