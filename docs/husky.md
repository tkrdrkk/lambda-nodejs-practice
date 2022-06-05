# husky

## 課題

"lambda へのデプロイ & git push"を一連の流れにしたい

## 解決策

husky で git-hooks を実現し、pre-push でデプロイを実行させるようにした。

参考: https://typicode.github.io/husky/#/

1. husky の導入

   基本的には公式の手順に従えば OK。（https://typicode.github.io/husky/#/）

   ただし`set-script`は node のバージョンが 16 以上じゃないと使えないようだったので、アップデートで対応した。

2. pre-push フックの作成

   ※[npm run deploy](./npm-pack-zip.md)を導入済みの前提

   ```
   npx husky add .husky/pre-push 'npm run deploy'
   ```

無事走るようになった。
