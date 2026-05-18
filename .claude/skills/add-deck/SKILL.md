---
name: add-deck
description: talk-deck に新しいデッキを追加する。必須フィールドのテンプレートを提供し、src/data/decks.ts への追記を案内する。
---

## 新デッキ追加手順

1. `src/data/decks.ts` を読み、既存デッキの構造・カラーパレット・card ID の命名規則を確認する
2. 以下のテンプレートで新デッキを作成し、`decks` 配列の末尾（または同じ level のグループ内）に追加する:

```ts
{
  id: '<英小文字-kebab-case>',          // 例: 'work-life', 'future-goals'
  name: '<日本語デッキ名>',              // 例: '仕事・キャリア'
  emoji: '<絵文字1文字>',               // 例: '💼'
  description: '<10文字以内の説明>',    // 例: '働き方や将来像'
  from: '<グラデーション開始色 hex>',   // 例: '#f59e0b'
  to: '<グラデーション終了色 hex>',     // 例: '#ef4444'
  level: 'light' | 'medium' | 'deep',
  cards: [
    { id: '<id略称+連番>', question: '<質問文？>' },
    // 最低 12 枚、推奨 12〜15 枚
  ],
}
```

3. カード品質チェック（任意）: `card-tone-reviewer` エージェントを呼び出してトーン・文体を確認する
4. `npm run typecheck` で型エラーがないことを確認する
5. `npm run build` でビルドが通ることを確認する
