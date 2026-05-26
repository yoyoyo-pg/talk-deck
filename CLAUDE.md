# Talk Deck

恋愛・結婚・人生観など様々なテーマの会話きっかけカードをランダムに引けるスマホ向け Web アプリ。Vite + React + TypeScript で構築し、静的ファイルとして GitHub Pages にホスト。

## 技術スタック

- Vite 6 + React 19 + TypeScript（strict モード）
- Tailwind CSS 3.4（モバイルファーストレイアウト）
- Lucide React（アイコン）
- 静的出力（バックエンド不要）

## コマンド

| コマンド | 用途 |
|---------|------|
| `npm install` | 依存インストール |
| `npm run dev` | 開発サーバー起動（localhost:5173） |
| `npm run build` | 本番ビルド（`dist/` へ出力） |
| `npm run preview` | ビルド済み成果物のプレビュー |
| `npm run lint` | ESLint チェック |
| `npm run typecheck` | TypeScript 型チェック |

## ディレクトリ構造

| パス | 役割 |
|-----|------|
| `src/types/index.ts` | `Card` / `Deck` / `Level` インターフェース |
| `src/data/decks.ts` | 全デッキ・カードデータ（ここにカードを追加） |
| `src/components/DeckSelector.tsx` | デッキ選択グリッド（全デッキ表示） |
| `src/components/CardView.tsx` | カード表示画面（シャッフル・ナビゲーション） |
| `src/App.tsx` | 画面遷移管理（DeckSelector → CardView） |
| `tasks/lessons.md` | ハマりどころ・判断理由・次への教訓（蓄積型） |
| `.claude/rules/architecture.md` | 詳細アーキテクチャ（自動注入） |
| `.claude/rules/workflow.md` | ドキュメント管理・開発ワークフロー・PR手順（自動注入） |
| `.claude/session-init.sh` | セッション開始時の git 同期・教訓注入スクリプト |
| `.claude/settings.json` | Claude Code 設定（許可リスト・フック） |
| `.github/workflows/deploy.yml` | GitHub Pages デプロイ |
| `.github/workflows/ci.yml` | PR 時の型チェック・ビルド確認 |

## セットアップ

```bash
npm install
npm run dev
```

## カードの追加方法

`src/data/decks.ts` の該当デッキの `cards` 配列に追記するだけ。

```ts
{ id: 'unique-id', question: '質問文をここに' }
```

新しいデッキを追加する場合は `Deck` 型に合わせて配列末尾に追加する。

## デプロイ

GitHub Actions が main ブランチへの push 時に自動で GitHub Pages にデプロイ。

## 行動原則

- 3ステップ以上のタスクは必ずPlanモードで開始する
- 動作を証明できるまでタスクを完了とマークしない（`npm run typecheck` と `npm run build` を通す）
- コードを読まずに書かない。必ず既存コードを確認してから変更する
- 作業は必ず新規ブランチで行う（main への直接コミット禁止、ブランチ名: `claude/<作業内容>`）
- **実装完了後は必ず PR を作成する**（`gh pr create` でブランチを放置しない）
- 実装完了後は CLAUDE.md のディレクトリ構造を必ず更新する
- コンテキストが逼迫したら正直に伝え、セッション分割を提案する

## Self-Improvement Loop

詳細なルールは `.claude/rules/workflow.md` を参照。

- **セッション開始時**: `tasks/lessons.md` を必ず読み、過去の教訓を把握してから作業を始める（session-init.sh が自動注入）
- **指摘を受けたら即座に**: ユーザーからミスや修正を指摘されたら、作業完了後に `tasks/lessons.md` へ追記する（後回し禁止）
- **エントリ形式**（3行構造）:
  ```
  ### [ルール名（動詞で始まる命令形）]
  **ルール**: 具体的に何をする/しない
  **なぜ**: 過去に起きた問題・インシデント
  **適用条件**: どのときに発動するか
  ```
- **目的**: 同じミスを繰り返さないための自己改善。「何をしたか」ではなく「次回どうするか」を命令形で書く