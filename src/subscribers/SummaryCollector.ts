import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class SummaryCollector implements RenderEventSubscriber {
  private counts = {
    Section: 0,
    Paragraph: 0,
    List: 0,
  };

  update(context: RenderContext): void {
    if (this.counts.hasOwnProperty(context.type)) {
      this.counts[context.type]++;
    }
  }

  printSummary(): void {
    console.log(
      `[Summary] Rendered ${this.counts.Section} sections, ${this.counts.Paragraph} paragraphs, ${this.counts.List} lists`
    );
  }
}
