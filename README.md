# Talk Deck

話題カードをランダムに引いて、ふたりの会話を楽しくするスマホ向け Web アプリ。

> [https://yoyoyo-pg.github.io/talk-deck/](https://yoyoyo-pg.github.io/talk-deck/)

## 機能

- **8 種類のデッキ**から好きなテーマを選択
- カードをランダムにシャッフルして引ける
- 前後のカードをスワイプで切り替え可能
- インストール不要、ブラウザだけで動作

### デッキ一覧

| デッキ | テーマ |
|--------|--------|
| 🎨 趣味・休日 | 好きなことや休日の過ごし方 |
| 💕 恋愛観 | 恋愛に関する価値観 |
| 💼 仕事観 | 働き方・キャリアについて |
| 💰 お金観 | お金に関する価値観 |
| 🌟 将来・夢 | 夢や将来について |
| 👨‍👩‍👧 家族観 | 家族のあり方について |
| 💍 結婚観 | 結婚に関する価値観 |
| 🌱 人生観 | 人生や価値観を深掘り |

## 技術スタック

- **Vite 6** + **React 19** + **TypeScript**（strict モード）
- **Tailwind CSS 3.4**（モバイルファーストレイアウト）
- **Lucide React**（アイコン）
- 静的出力（バックエンド不要）

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーが `http://localhost:5173` で起動します。

## コマンド

| コマンド | 用途 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`dist/` へ出力） |
| `npm run preview` | ビルド済み成果物のプレビュー |
| `npm run lint` | ESLint チェック |
| `npm run typecheck` | TypeScript 型チェック |

## カードの追加方法

`src/data/decks.ts` の該当デッキの `cards` 配列に追記するだけです。

```ts
{ id: 'unique-id', question: '質問文をここに' }
```

新しいデッキを追加する場合は `Deck` 型に合わせて配列末尾に追加してください。

## デプロイ

GitHub Actions が `main` ブランチへの push 時に自動で GitHub Pages にデプロイします（`.github/workflows/deploy.yml`）。

## ライセンス

MIT
