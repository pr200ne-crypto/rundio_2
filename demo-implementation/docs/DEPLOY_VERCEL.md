# Vercel デプロイ手順（本番 URL 取得まで）

このアプリは **Next.js 15 + TypeScript** の単一リポジトリ（`demo-implementation`）です。  
**本番 URL** はデプロイ完了後に Vercel ダッシュボードに表示されます（例: `https://<project>.vercel.app`）。

---

## 前提チェックリスト（5 要素）

| 要素 | 内容 |
|------|------|
| ① UI | Next.js App Router（`/`, `/posts`, `/home` など） |
| ② バックエンド | **Route Handlers** `/api/posts`, `/api/posts/[id]`, `/api/health` |
| ③ DB | **Supabase**（`users`, `runner_profiles`, `broadcast_jobs`, `posts`） |
| ④ 認証 | **Clerk**（サインアップ / ログイン / UserButton） |
| ⑤ デプロイ | **Vercel**（本番 URL をダッシュボードで確認） |

---

## 1. GitHub にプッシュ

プロジェクトを Git リポジトリに載せ、GitHub へ push してください。

---

## 2. Vercel で新規プロジェクト

1. [vercel.com](https://vercel.com) → **Add New…** → **Project**
2. リポジトリを Import
3. **Root Directory** を **`demo-implementation`** に設定  
   （リポジトリ直下が `rundio2` フォルダだけの場合は `rundio2/demo-implementation` など実際のパスに合わせる）
4. Framework Preset: **Next.js**（自動検出）
5. **Deploy**（環境変数は次で設定してから再デプロイでも可）

---

## 3. 環境変数（Production / Preview）

Vercel → Project → **Settings** → **Environment Variables** に以下を設定。

| Name | 説明 |
|------|------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk ダッシュボード → API Keys |
| `CLERK_SECRET_KEY` | 同上（サーバー専用） |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/home`（本番 URL ベースで動くよう `/home` で OK） |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/home` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` または `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 同上（anon / publishable） |
| `SUPABASE_SERVICE_ROLE_KEY` | 同上（**絶対に公開しない**） |

設定後 **Redeploy** してください。

---

## 4. Clerk（本番ドメイン）

1. [Clerk Dashboard](https://dashboard.clerk.com) → 対象アプリ
2. **Domains** に Vercel の本番ドメインを追加（例: `your-app.vercel.app`）
3. **Paths / URLs**: 本番の Sign-in URL などが Vercel URL と一致しているか確認
4. **Social connections** で Google 等を利用する場合は本番でも有効

---

## 5. Supabase

- 本番でも同じプロジェクトの DB を使うか、別プロジェクトを用意してマイグレーション 1→2→3 を再実行
- **Project URL** と **anon / service_role** を Vercel の環境変数に設定済みか確認

---

## 6. 本番 URL の確認

- デプロイ成功後、Vercel の **Deployments** から **Visit** をクリック
- 表示された URL が **本番 URL**（課題提出用にコピー可能）

動作確認:

- `https://<本番URL>/api/health` → JSON `{"ok":true,...}`（認証不要）
- ブラウザで LP を開き、Clerk でログイン → `/posts` で CRUD

---

## 7. トラブルシュート

| 現象 | 対処 |
|------|------|
| Clerk ログイン後にループ | `AFTER_SIGN_IN_URL` と Clerk ダッシュボードの Allowed origins を確認 |
| API が 401 | ログイン状態で Cookie が付いているか、本番ドメインが Clerk に登録されているか |
| DB エラー | `SUPABASE_SERVICE_ROLE_KEY` とマイグレーション適用状況を確認 |

---

## CLI でデプロイする場合（任意）

```bash
cd demo-implementation
npx vercel login
npx vercel --prod
```

初回は対話でプロジェクトと環境変数を紐づけ。本番 URL はコマンド出力に表示されます。
