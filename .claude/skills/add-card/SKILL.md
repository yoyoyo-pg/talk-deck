---
name: add-card
description: 既存デッキに新しい会話カードを追加する。カードIDの命名規則・品質基準・重複チェックを案内する。
---

## カード追加手順

1. `src/data/decks.ts` を読み、追加先デッキの構造と既存カードIDの採番パターンを確認する

2. 新カードを作成し、該当デッキの `cards` 配列末尾に追記する:

```ts
{ id: '<prefix><連番>', question: '<質問文？>' }
```

デッキごとの ID prefix 慣例:

| デッキ | prefix | 例 |
|-------|--------|---|
| hobbies | h | h16 |
| work | w | w16 |
| future | fu | fu16 |
| philosophy | p | p16 |
| romance | r | r16 |
| money | mo | mo16 |
| family | f | f16 |
| marriage | m | m16 |
| memories | me | me16 |
| food | fo | fo16 |
| whatif | wi | wi16 |
| taste | ta | ta16 |

3. カード品質チェック（任意）: `card-tone-reviewer` エージェントでトーン・文体を確認する

4. `npm run typecheck` で型エラーがないことを確認する

5. `npm run build` でビルドが通ることを確認する
