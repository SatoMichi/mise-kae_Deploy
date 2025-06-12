# VRMポーズエディタ

VRMモデルのポーズを編集・管理するためのWebアプリケーションです。

## 機能

### ポーズ管理
- プリセットポーズの適用
  - ピースポーズ（右手でピースサイン、左手を腰に当てる）
  - その他のプリセットポーズ（`app/src/types/poses/`に定義）
- JSONファイルからのポーズアップロード
  - カスタムポーズのJSONファイルをアップロードして適用可能
  - アップロード時は一旦全ての関節をリセットしてから適用

### ポーズの制御
- ポーズ適用時の挙動
  - プリセットポーズ：定義された全ての関節（指を含む）を適用
  - JSONアップロード：定義された関節のみを適用（未定義の関節はリセット）

## プロジェクト構造

```
app/
├── public/
│   └── motions/          # サンプルモーションファイル
│       └── Hi.json       # 手を振るモーション
├── src/
│   ├── components/
│   │   └── VRMViewer/    # VRM表示・操作関連のコンポーネント
│   │       ├── PoseControls.ts    # ポーズ選択UI
│   │       ├── PoseManager.ts     # ポーズ適用の管理
│   │       ├── PoseUploader.ts    # JSONポーズのアップロード
│   │       └── VRMViewer.ts       # VRMモデルの表示
│   ├── types/
│   │   ├── poses/        # プリセットポーズの定義
│   │   │   └── peace.ts  # ピースポーズの定義
│   │   └── vrm.ts        # VRM関連の型定義
│   └── utils/
│       └── PoseConverter.ts       # JSONポーズの変換処理
```

## 技術スタック

- TypeScript
- Vite
- Three.js
- @pixiv/three-vrm

## 開発環境のセットアップ

1. 依存関係のインストール
```bash
cd app
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

3. ブラウザでアクセス
```
http://localhost:8080
```

## ポーズファイルの形式

### プリセットポーズ
TypeScriptで定義されたポーズオブジェクト。各関節の回転と位置を指定します。

例（ピースポーズ）:
```typescript
{
  rightIndexProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },    // 人差し指を立てる
  rightMiddleProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },   // 中指を立てる
  // ... その他の関節
}
```

### JSONポーズ
VRM形式のJSONファイル。以下の構造を持ちます：

```json
{
  "version": "1.0",
  "pose": {
    "leftShoulder": { "rotation": [x, y, z, w] },
    "rightShoulder": { "rotation": [x, y, z, w] },
    // ... その他の関節
  }
}
```

## 注意事項

- JSONファイルは`.json`拡張子のみ対応
- ポーズ適用時は、JSONアップロードの場合は一旦全ての関節をリセットしてから適用
- プリセットポーズの場合は、定義された全ての関節（指を含む）を適用
