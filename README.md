# Домашнє завдання до Теми Поведінковий патерн: Спостерігач (Observer)

## Опис завдання

У цьому домашньому завданні реалізовано реактивний шар поверх генератора документа. Кожен елемент документа (`Section`, `Paragraph`, `List`) надсилає повідомлення про завершення рендерингу за допомогою патерна **Спостерігач**.

Ключові компоненти:
- `RenderEventPublisher` — статичний клас, що зберігає список підписників і надсилає їм події.
- `RenderEventSubscriber` — інтерфейс для підписників із методом `update(context: RenderContext)`.
- `RenderContext` — об'єкт події, який містить тип елемента, текст, рівень заголовка, кількість елементів у списку та час рендеру.

Підписники дозволяють розширювати застосунок логерами, аналітикою, профайлерами без зміни логіки рендерингу.

## Структура проєкту

```
src/
├── main.ts
├── RenderEventPublisher.ts
├── interfaces/
│   ├── RenderEventSubscriber.ts
│   ├── RenderContext.ts
│   ├── DocNode.ts
│   └── DocRenderer.ts
├── subscribers/
│   ├── RenderLoggerSubscriber.ts
│   ├── SummaryCollector.ts
│   └── PerformanceSubscriber.ts
├── nodes/
│   ├── Section.ts
│   ├── Paragraph.ts
│   └── List.ts
├── factories/
│   └── RendererFactory.ts
└── renderers/
    ├── HTMLRenderer.ts
    ├── MarkdownRenderer.ts
    ├── PlainTextRenderer.ts
    └── BaseRenderer.ts
```

## Як реалізовано патерн Observer

- Кожен вузол після рендеру викликає:

```ts
RenderEventPublisher.notify(context);
```

- `RenderEventPublisher` — централізовано керує підписниками: `subscribe()`, `unsubscribe()`, `notify()`.
- `RenderContext` передає:
  - `type`: 'Section' | 'Paragraph' | 'List'
  - `content`: вміст елемента
  - `level`: рівень заголовка
  - `items`: елементи списку
  - `renderTime`: час рендерингу (в мілісекундах)

## Реалізовані підписники

| Назва                   | Призначення                                       |
|-------------------------|---------------------------------------------------|
| `RenderLoggerSubscriber` | Виводить повідомлення про кожен елемент рендеру  |
| `SummaryCollector`       | Підраховує кількість елементів різного типу      |
| `PerformanceSubscriber`  | Підсумовує час рендерингу усіх елементів         |

## Приклад запуску

```bash
npx ts-node src/main.ts markdown
```

**Вивід у консолі:**

```
[Log] Rendered Paragraph (44 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
[Summary] Rendered 4 sections, 3 paragraphs, 2 lists
[Performance] Total render time: 7ms
```

## Приклад створення нового підписника

```ts
export class LengthCounterSubscriber implements RenderEventSubscriber {
  private total = 0;

  update(context: RenderContext): void {
    this.total += context.content.length;
  }

  print(): void {
    console.log(`[LengthCounter] Total length: ${this.total} chars`);
  }
}
```

Після підписки:

```ts
const counter = new LengthCounterSubscriber();
RenderEventPublisher.subscribe(counter);
// ...
counter.print();
```

Це демонструє розширюваність без змін у базовій логіці рендерингу.
