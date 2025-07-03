import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class PerformanceSubscriber implements RenderEventSubscriber {
  private totalTime = 0;

  update(context: RenderContext): void {
    this.totalTime += context.renderTime ?? 0;
  }

  printTotal(): void {
    console.log(`[Performance] Total render time: ${this.totalTime}ms`);
  }
}
