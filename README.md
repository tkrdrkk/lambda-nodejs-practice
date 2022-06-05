# Lambda + Node.js のソースコードを管理する練習

## 問題意識

- AWS Lambda で Node.js のコードを書くとき、「Web コンソールから直接編集する」「Amplify の Function で編集+デプロイ」の 2 択しか経験がなかった。
  - 前者では機能不足、後者では Lambda 単体の開発に適さない・リッチすぎるなど弊害複数。

## 弊害と展望

- フォーマッターが貧弱すぎる。セミコロンの補完とかインデントとか。
  - ESLint/Prettier を使える VSCode でコーディングする。（Amplify Function では恩恵を受けてる）
- ライブラリ追加がレイヤー経由でしかできない。レイヤー生成、バージョン対応のための更新…めんどくさすぎる。
  - （パッケージサイズはさておき）気軽に npm i で対応できる。
- テストのために毎回デプロイする必要がある。
  - ソース保存 →Jest で楽ちん。
  - AWS リソースへのアクセスは多分 Mock で対応すれば OK？アクセスキーとかでローカル実行でも行けるかもしれないが、Git に挙げるとなると管理がちょっとこわい
- 差分管理なんてできない。気軽なコード修正ができない。
  - Git(業務なら CodeCommit)が全部やってくれるはず。

---

## 環境

### OS

Windows 10

### Node.js

- 当初: v14.18.0
- husky 導入時: v16.15.1 にアップデート

---

## やったこと

### Node.js プロジェクトとして初期化

参考: https://philna.sh/blog/2019/01/10/how-to-start-a-node-js-project/

```
npm init
npx license mit // MITライセンス導入。よくわかってない①
npx gitignore node // これまで手書きだった。楽すぎて感動
npx covgen // プログラマー倫理にかかわる宣言みたいな感じ？よくわかってない②
```

### npm-pack-zip

[npm-pack-zip を導入](./docs/npm-pack-zip.md)し、zip 化+デプロイを自動化した。

- 手動 zip 化は node_modules の ignore など手間がヤバい

### husky

[husky を導入](./docs/husky.md)し、git push 時に自動で lambda への deploy が走るようにした。
