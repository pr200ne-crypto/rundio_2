# RUNdio — デモ実装（Next.js）

## 課題要件（5 要素）

| # | 要件 | 実装 |
|---|------|------|
| 1 | 操作できる UI | Next.js App Router + TypeScript + Tailwind |
| 2 | バックエンド API | **Route Handlers** `GET/POST /api/posts`, `GET/PATCH/DELETE /api/posts/[id]`, `GET /api/health` |
| 3 | DB 永続化 | **Supabase**（マイグレーション 3 本） |
| 4 | 認証 | **Clerk**（サインイン・アップ・UserButton） |
| 5 | 本番デプロイ | **[Vercel 手順書](./docs/DEPLOY_VERCEL.md)**（本番 URL はデプロイ後に取得） |

## 必要なもの

- Node.js 20+
- [Clerk](https://clerk.com) アプリケーション
- [Supabase](https://supabase.com) プロジェクト（マイグレーション適用済み）

## セットアップ

```bash
cd demo-implementation
cp .env.local.example .env.local
# .env.local を編集（Clerk / Supabase のキー）
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## マイグレーション

`supabase/migrations/` をプロジェクトに適用。順序:

1. `20250203_init_users.sql`
2. `20250406120000_runner_profiles_and_broadcast_jobs.sql`
3. `20250407120000_posts.sql`（投稿 CRUD）

統合手順の要約: [docs/MASTER_INTEGRATION_SUMMARY.md](./docs/MASTER_INTEGRATION_SUMMARY.md)

## 構成

- `/` — LP（スマホ枠内に `/demo` を iframe 表示）
- `/demo` — 埋め込み用ミニUI（プレースホルダー）
- `/sign-in`, `/sign-up` — Clerk

共通ライブラリ: `lib/supabase/*`

## 講義プロンプトとの差分

`4.frontend-implementation-prompt.md` は「認証・DB 未接続」を想定する記述があるが、本リポジトリは **Clerk + Supabase 接続済み**（`docs/output` / `docs/design` に整合）。

## 次の実装タスク

- API Route: ジョブ作成 → LLM/TTS 連携（サーバー）
- Supabase Storage へ音声保存
- `/run/*` 本番フローと iframe の差し替え

要件の正本: `../docs/input/` · 詳細要件: `../docs/output/detailed_requirements_specification.md` · 設計: `../docs/design/`
