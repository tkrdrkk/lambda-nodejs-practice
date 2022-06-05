# npm-pack-zip

## 課題

単純に OS の Zip 化 → アップロードすると、devDependencies のモジュールも含めて圧縮 → サイズがとんでもないことになる。

## 解決策

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
