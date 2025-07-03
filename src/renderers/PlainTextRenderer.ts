import { BaseRenderer } from "./BaseRenderer";

export class PlainTextRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    return `${" ".repeat(level - 1)}${text.toUpperCase()}`;
  }

  renderParagraph(text: string): string {
    return text;
  }

  renderList(items: string[]): string {
    return items.map((item, idx) => `  ${idx + 1}. ${item}`).join("\n");
  }
}
