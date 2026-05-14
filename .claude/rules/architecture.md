# talk-deck アーキテクチャ

## スタック
- Vite 6 + React 19 + TypeScript（strict モード）
- Tailwind CSS 3.4
- Lucide React（アイコン）
- 静的出力（`vite build` → `dist/`）

## ファイル構成

| パス | 役割 |
|-----|------|
| `src/types/index.ts` | `Card` / `Deck` インターフェース定義 |
| `src/data/decks.ts` | 全デッキ・カードデータ |
| `src/components/DeckSelector.tsx` | デッキ選択ホーム画面 |
| `src/components/CardView.tsx` | カード表示・ナビゲーション画面 |
| `src/App.tsx` | 画面状態管理（デッキ選択 ↔ カード表示） |

## 設計原則

- バックエンド不要。全データは `src/data/decks.ts` にハードコード
- デッキの色はグラデーション（from/to hex）として Deck 型に持つ。Tailwind の purge 問題を回避するため inline style で適用
- カードシャッフルは Fisher-Yates アルゴリズム（`CardView.tsx` 内）
- アニメーションは CSS transition（opacity + scale）で実装。JS タイマーで 200ms 切り替え
- モバイルファーストレイアウト（max-w-xs / max-w-sm）

## デプロイ

GitHub Pages: `.github/workflows/deploy.yml` が main push 時に `vite build` → `dist/` をデプロイ