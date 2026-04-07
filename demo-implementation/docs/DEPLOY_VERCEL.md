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

## 3. Clerk → Vercel に API キーを入れる

1. [Clerk Dashboard](https://dashboard.clerk.com) → 対象アプリを開く  
2. 画面上部タブの **Configure** を開く（旧 UI の「Settings」に相当。API キーやドメインはだいたいここ配下）  
3. **API Keys**（または **Keys**）を開き、次をコピーして Vercel に貼る  

| Clerk でコピー | Vercel の変数名 |
|----------------|-----------------|
| Publishable key | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| Secret key | `CLERK_SECRET_KEY` |

- Clerk 上部が **Development** のときは開発用キーです。**Production** 用インスタンス／キーがある場合は、Vercel の **Production** 環境には **Production** 側のキーを入れるのが安全です（Development キーだけだと本番で想定外になることがあります）。

---

## 4. 環境変数（Vercel まとめて設定）

Vercel → Project → **Settings** → **Environment Variables** に、上記 Clerk キーに加えて次を設定。

| Name | 説明 |
|------|------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Configure → API Keys（Publishable） |
| `CLERK_SECRET_KEY` | 同上（Secret・サーバー専用） |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/home`（相対パスで本番 URL ベースで動く） |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/home` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` または `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 同上（anon / publishable） |
| `SUPABASE_SERVICE_ROLE_KEY` | 同上（**絶対に公開しない**） |

**環境変数を保存したあとは必ず Redeploy**（Deployments → 最新デプロイの **⋯** → **Redeploy**、または空コミットで再ビルド）してください。未再デプロイだと古いビルドのままです。

---

## 5. Clerk（本番 URL・ドメイン・Google）

1. 同じく **Configure** 内で、**Domains** / **Paths** / **Allowed origins** / **Application URLs** など（表記は Clerk の版で異なります）を開く  
2. デプロイ先の **`https://xxxx.vercel.app`（実際の本番 URL）** を、許可ドメイン／フロントエンド URL として追加する  
   - ここを忘れると、**本番だけ**ログインやリダイレクトで失敗することがあります  
3. **Google ログイン**を使う場合: **Configure** → **User & Authentication** → **Social connections**（など）で Google を有効にする（ローカルと同様）

### 本番 URL を変えた直後にやること（例: `ru-ndio` → `rundio`）

Vercel で **Project Name** を変えると、`https://xxxx.vercel.app` の **`xxxx` 部分が変わります**。次は **ブラウザで実際に開けた URL**（Vercel の **Deployments → Visit** でコピー）を「新 URL」として使ってください。以下の **OLD** / **NEW** は置き換えて読んでください。

- **OLD**（消す・差し替え元の例）: `https://ru-ndio.vercel.app`
- **NEW**（いま正しい本番の例）: `https://rundio.vercel.app`（取れない場合は Vercel が割り当てた名前のまま）

#### Clerk（ここはダッシュボードでの手作業のみ）

1. [Clerk Dashboard](https://dashboard.clerk.com) を開き、対象アプリを選ぶ。  
2. 画面上部の環境で **Production** を選ぶ（本番サイト用。Development だけ直しても本番は直らない）。  
3. **Configure** タブを開く。  
4. 次のような項目を **ひとつずつ**開き、表示されている URL・ドメインの一覧から **OLD** を探す。  
   - 見つかったら **NEW に差し替え**、または **NEW を追加したうえで OLD を削除**（両方許可する画面なら、移行中だけ両方残してもよい）。  
   - 表記は Clerk の版で違いますが、だいたい次のどれかにあります。  
     - **Paths** / **Application paths**（Application URL、Home URL、Sign-in URL など）  
     - **Domains**（本番ドメインの追加・一覧）  
     - **Allowed origins** / **Authorized redirect URLs** / **Application URLs**  
5. 画面下部などの **Save** があれば保存する。  
6. **シークレット／プライベートウィンドウ**で **NEW** のトップにアクセスし、サインインまで試す。

#### Redeploy が必要か

このアプリの Clerk まわりは Vercel では **`/sign-in` など相対パス**の環境変数が多いので、**URL 変更に伴う Redeploy は必須ではありません**。Vercel で **Root Directory や Git を変えた**ときは通常どおりデプロイが走ります。

#### ブックマーク・提出用メモ

- ブラウザのブックマークは手元で **NEW** に差し替える。  
- 課題提出やメモに **OLD** を書いていたら **NEW** に書き換える。

---

## 6. Supabase

- 本番でも同じプロジェクトの DB を使うか、別プロジェクトを用意してマイグレーション 1→2→3 を再実行
- **Project URL** と **anon / service_role** を Vercel の環境変数に設定済みか確認

---

## 7. 本番 URL の確認

- デプロイ成功後、Vercel の **Deployments** から **Visit** をクリック
- 表示された URL が **本番 URL**（課題提出用にコピー可能）

動作確認:

- `https://<本番URL>/api/health` → JSON `{"ok":true,...}`（認証不要）
- ブラウザで LP を開き、Clerk でログイン → `/posts` で CRUD

---

## 8. トラブルシュート

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
