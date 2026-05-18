---
name: release-check
description: PR 作成前のリリース前チェックを実行する。typecheck・lint・build を順番に走らせ、すべて通過した場合のみ PR 作成を許可する。
disable-model-invocation: true
---

以下のコマンドを順番に実行し、すべて通過するか確認してください:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

すべて通過したら PR を作成してください。
