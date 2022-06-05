# Lambda + Node.js のソースコードを管理する練習

## 問題意識

- AWS Lambda で Node.js のコードを書くとき、「Web コンソールから直接編集する」「Amplify の Function で編集+デプロイ」の 2 択しか経験がなかった。

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

## 環境

### Node.js

v14.18.0

## やったこと

### Node.js プロジェクトとして初期化

参考: https://philna.sh/blog/2019/01/10/how-to-start-a-node-js-project/

```
npm init
npx license mit // MITライセンス導入。よくわかってない①
npx gitignore node // これまで手書きだった。楽すぎて感動
npx covgen // プログラマー倫理にかかわる宣言みたいな感じ？よくわかってない②
```

### テストツールは Jest

```
npm i -D jest
```
