# API 仕様（論理／将来含む）— RUNdio

## 1. 設計原則

- **ブラウザ → Next.js**: **Route Handlers（REST）** で投稿 CRUD。オンボーディング等は **Server Actions** 併用。
- **認証**: Clerk セッション Cookie。サーバー側で `auth()` により `userId` を取得。
- **JSON**: `POST/PATCH /api/posts` は `application/json`。

## 2. 認証・認可

| 項目 | 内容 |
|------|------|
| 方式 | Clerk Hosted + Next.js middleware `auth.protect()` |
| サーバー | `@clerk/nextjs/server` の `auth()`, `currentUser()` |
| DB 書き込み | `SUPABASE_SERVICE_ROLE_KEY`（環境変数、サーバーのみ） |

## 3. Route Handlers（REST・本番）

| メソッド | パス | 認証 | 説明 |
|----------|------|------|------|
| GET | `/api/health` | 不要 | ヘルスチェック（Vercel 確認用） |
| GET | `/api/posts` | 要 | 投稿一覧 JSON |
| POST | `/api/posts` | 要 | 新規 `{ title, body? }` |
| GET | `/api/posts/[id]` | 要 | 1件取得 |
| PATCH | `/api/posts/[id]` | 要（本人） | 更新 `{ title, body? }` |
| DELETE | `/api/posts/[id]` | 要（本人） | 削除 |

実装: `demo-implementation/app/api/` 配下。

---

## 4. Server Actions（現行）

### 4.1 `saveRunnerProfile(formData: FormData)`

| 項目 | 内容 |
|------|------|
| 認可 | 要ログイン |
| 入力 | `likes_notes`, `run_purpose`, `course_vibes` |
| 処理 | `runner_profiles` upsert |
| 成功時 | `redirect('/run/new')` |
| 失敗時 | throw Error（日本語） |

### 4.2 `createBroadcastSession(formData: FormData)`

| 項目 | 内容 |
|------|------|
| 入力 | `mode`: `time` \| `distance`, `duration_min` または `distance_km` |
| 処理 | 距離時は 6 分/km で分換算、`broadcast_jobs` insert（デモは即 ready） |
| 成功時 | `redirect('/run/[id]/waiting')` |

## 5. REST（将来・任意）

### 5.1 `GET /api/broadcast-jobs/:id`

**説明**: ジョブ状態のポーリング用。

**認可**: Clerk セッション必須。ジョブの `user_id` が現在ユーザーに紐づくこと。

**Response 200**

```json
{
  "id": "uuid",
  "status": "ready",
  "target_duration_min": 30,
  "target_distance_km": null,
  "audio_storage_path": "/demo-audio/demo.mp3"
}
```

**404**: 存在しない、または他ユーザーのジョブ。

### 5.2 `POST /api/broadcast-jobs`（将来）

本番の非同期生成導入時に、ジョブ enqueue 用として定義予定。

## 6. 外部 API（将来）

| 方向 | 用途 |
|------|------|
| Outbound | OpenAI 等（台本）、ElevenLabs 等（TTS） |
| Inbound | 不要（公開 Webhook は別検討） |
