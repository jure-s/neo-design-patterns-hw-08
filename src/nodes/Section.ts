import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const start = performance.now();

    const header = this.renderer.renderHeader(this.level, this.title);
    const childrenRendered = this.children.map((child) => child.render()).join("\n\n");
    const output = [header, childrenRendered].join("\n\n");

    const end = performance.now();

    RenderEventPublisher.notify({
      type: "Section",
      content: this.title,
      level: this.level,
      renderTime: Math.round(end - start),
    });

    return output;
  }
}
