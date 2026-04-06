# RUNdio

ランニングの「**ラン**」とラジオの「**レディオ**」を組み合わせた名前です。  
走行セッションに合わせた**パーソナル放送**を、走る前に用意して聞く体験を目指します。主目的は**社内プレゼン**（数名が触れるデモ）。収益化は当面のスコープ外です。

> リポジトリのフォルダ名 `rundio2` は開発上の都合で、プロダクト表示名は **RUNdio** とします。

## ドキュメント（正本）

要件・フロー・MVP のまとまりは **`docs/input/`** に置いています。

| ファイル | 内容 |
|----------|------|
| [docs/input/README.md](./docs/input/README.md) | インデックス |
| [docs/input/business-requirements.md](./docs/input/business-requirements.md) | ビジネス要件 |
| [docs/input/user-personas.md](./docs/input/user-personas.md) | ターゲットユーザー |
| [docs/input/product-requirements.md](./docs/input/product-requirements.md) | プロダクト要件 |
| [docs/input/user-flows.md](./docs/input/user-flows.md) | ユーザーフロー |
| [docs/input/feature-list.md](./docs/input/feature-list.md) | 機能一覧 |
| [docs/input/mvp-scope.md](./docs/input/mvp-scope.md) | MVP 範囲 |
| [docs/input/ui-ux-direction.md](./docs/input/ui-ux-direction.md) | UI/UX 方針 |

補助: [docs/input/system-requirements.md](./docs/input/system-requirements.md)（システム要件）、[docs/input/architecture.md](./docs/input/architecture.md)（アーキテクチャ）、[docs/handoff_personal_running_radio.md](./docs/handoff_personal_running_radio.md)（対話メモ）

## 実装（デモ）

Next.js アプリ: [`demo-implementation/`](./demo-implementation/README.md)

## プロンプト資産

`docs/prompts/` に要件定義〜実装用のプロンプトテンプレートあり（`regular_prompts` / `supabase_prompts`）。
