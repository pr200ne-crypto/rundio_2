# MASTER_INTEGRATION_PROMPT 実行サマリー（RUNdio / demo-implementation）

`docs/prompts/supabase_prompts/MASTER_INTEGRATION_PROMPT.md` に沿った統合状況です。

## 設計分析結果（フェーズ1相当）

### データベース構造

| テーブル | 説明 |
|----------|------|
| `users` | Clerk 連携ユーザー |
| `runner_profiles` | ランナー嗜好（RUNdio 本体） |
| `broadcast_jobs` | 放送ジョブ（RUNdio 本体） |
| `posts` | **投稿 CRUD（講義必須）** |

### 認証要件

- **Clerk**（推奨: **Google OAuth** はダッシュボードで有効化）
- **UserButton** は `app/(app)/layout.tsx`
- DB 操作は **service_role** + サーバーで `clerk_user_id` を検証（Webhook なし方針と整合）

### リアルタイム

- **不要**（MVP）。将来 `supabase_realtime_AIprompt.md` を参照可。

## 実装済み

- Middleware: `clerkMiddleware` + 公開ルート + Supabase cookie 更新（`/api/health` は公開）
- `lib/supabase/*`（browser / server / service-role）
- 公開キー: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` **または** `NEXT_PUBLIC_SUPABASE_ANON_KEY`（`lib/supabase/env.ts`）
- 投稿 UI: `/posts`（Server Action + **REST API** の両方）
- **REST API（Route Handlers）**: `app/api/posts/route.ts`, `app/api/posts/[id]/route.ts`, `app/api/health/route.ts`
- 編集: `/posts/[id]/edit`（Server Action）

## マイグレーション適用順

1. `20250203_init_users.sql`
2. `20250406120000_runner_profiles_and_broadcast_jobs.sql`
3. `20250407120000_posts.sql`

Supabase SQL Editor または CLI で実行後、Table Editor で `posts` を確認してください。

## トラブルシュート

- **posts 一覧でリレーションエラー**: FK 名が環境で異なる場合、`lib/data/posts.ts` の `users!posts_user_id_fkey` を、DB の制約名に合わせて変更してください。

```sql
SELECT conname FROM pg_constraint
WHERE conrelid = 'public.posts'::regclass;
```
