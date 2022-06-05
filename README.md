# Lambda + Node.js のソースコードを管理する練習

## Node.js version

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
