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

v14.18.0

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

### npm-pack-zip 導入

#### **課題**

単純に OS の Zip 化 → アップロードすると、devDependencies のモジュールも含めて圧縮 → サイズがとんでもないことになる。

#### **解決策**

`npm-pack-zip`というドンピシャのツールを導入した。

参考: https://maku.blog/p/zmydq3f/

1. ツールの導入

```
npm i -D npm-pack-dev
```

2. zip に含めたいモジュールを package.json に追加

```
{
  "bundledDependencies": [
    $package-name,
  ],
}
```

3. zip 化

```
npx npm-pack-zip
```

4. zip→upload を簡素にするため、npm scripts に登録

```
{
    "pack": "npx npm-pack-zip",
    "upload": "aws lambda update-function-code --function-name hellonodejs --zip-file fileb://.\\hellonodejs.zip", // 関数名とzip名は適宜変更
    "deploy": "npm run pack && npm run upload
}
```

5. 2 回目の zip 化以降、前回の zip があっても ignore されるように登録

```
{
  "files": [
    "!./hellonodejs.zip"
  ],
}
```
