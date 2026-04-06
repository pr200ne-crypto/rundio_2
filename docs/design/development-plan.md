# 開発計画 — RUNdio

## 1. ロードマップ概要

| フェーズ | ゴール |
|----------|--------|
| **MVP-A** | ドキュメント（input/output/design）と LP・認証・DB マイグレーション |
| **MVP-B** | オンボーディング〜再生の縦切り + デモ mp3 |
| **v1** | 実生成（LLM+TTS）、Storage、ジョブポーリング |
| **v1.1** | ストリーク・累計連動、週次番組風 UI（要件次第） |

## 2. WBS（MVP-B 中心）

| ID | タスク | 状態 |
|----|--------|------|
| T1 | 環境変数・Clerk・Supabase 接続確認 | 要検証 |
| T2 | middleware 公開ルートと protect | 実装済 |
| T3 | ensureSupabaseUser + users 同期 | 実装済 |
| T4 | オンボーディングフォーム + SA | 実装済 |
| T5 | RunSessionForm（時間/距離） | 実装済 |
| T6 | broadcast_jobs スタブ + 待機演出 | 実装済 |
| T7 | 再生ページ + 所有チェック | 実装済 |
| T8 | LP StartCta + デモ枠 | 実装中〜 |
| T9 | `public/demo-audio/demo.mp3` 配置手順 | README |
| T10 | iOS Safari 実機リハ（6 名） | 未 |

## 3. マイルストーン

- **M1**: `npm run dev` で LP からサインインまで通る
- **M2**: プロフィール保存〜再生まで通る（mp3 配置後）
- **M3**: 社内プレゼンリハ

## 4. リスクと対策（再掲）

| リスク | 対策 |
|--------|------|
| デモ音声未配置 | README と play 画面の案内文 |
| 外部 API 未接続 | スタブ job で UX を先に完成 |
| 講義プロンプト4との差分 | README に「認証・DB 実装済み」と明記 |

## 5. 完了の定義（講義プロンプト4）

- `npm run dev` がエラーなく起動する
- 主要ページがブラウザで表示される
- TypeScript ビルドが通る（eslint はプロジェクト方針に従う）
