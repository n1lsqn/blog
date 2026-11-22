# Seaslug

Hexoで生成するブログ。公開URLは https://blog.n1l.dev 。

## ローカルでの確認

Node.js 26を使用する（`.node-version`と`package.json`で指定）。

```sh
git submodule update --init --recursive
npm ci
npm run build
PORT=4000 npm run dev
```

生成結果は`public/`。テーマは`themes/tranquilpeak`のGit submoduleで管理する。

## Cloudflare Pagesへの移行と自動反映

Pagesプロジェクト: `seaslug-blog`（https://seaslug-blog.pages.dev）。
GitHubリポジトリ`n1lsqn/blog`と連携し、本番ブランチは`main`。

Cloudflare PagesのGit連携を使う。初回にCloudflareの管理画面で設定すると、
以降はGitHubの`main`へのpush（PRのマージを含む）でビルド・本番反映される。
GitHub Actionsやデプロイ用APIトークンの登録は不要。

1. Cloudflareの「Workers & Pages」からPagesの作成を選び、既存のGitリポジトリをインポートする。
2. CloudflareのGitHub Appに`n1lsqn/blog`へのアクセスを許可し、そのリポジトリを選ぶ。
3. 以下を設定してデプロイする。

| 設定 | 値 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Hexo` |
| Root directory | リポジトリのルート（空欄） |
| Build command | `npm run build` |
| Build output directory | `public` |
| 環境変数 `NODE_VERSION` | `26`（ファイルの指定と揃える） |

Git連携の本番ブランチ自動デプロイを有効にしておく。
テーマのsubmoduleが取得されていることをビルドログで確認する。
`vercel.json`と`.vercelignore`はVercel用の設定で、Pagesのビルドには使わない。
Pagesが設定する`CF_PAGES=1`のとき、`scripts/cloudflare-pages.js`がテーマ内の
Vercel計測スクリプトを生成HTMLから除去する。ローカルで同じ生成結果を確認する場合は
`CF_PAGES=1 npm run build`を使う。

### 公開先の切り替え

1. 初回の`*.pages.dev`でトップ、記事、画像、CSS、フィードが表示されることを確認する。
2. Pagesプロジェクトの「Custom domains」から`blog.n1l.dev`を追加する。
3. 管理画面の案内に従ってDNSを切り替える。外部DNSなら、Pages側にドメインを追加した後で
   `blog`の既存レコードを指定された`*.pages.dev`へのCNAMEに変更する。
   既存レコードの値は切り戻し用に控えておく。
4. HTTPSと既存の記事URLの表示、`main`への次のpushでの自動反映を確認する。
5. 確認後、Vercel側のGit連携を停止する。切り替え確認まではVercelの既存デプロイを保持する。

DNSの反映時間によっては切り替え直後に旧公開先へ接続される。
問題があれば、DNSを控えたVercelのレコードに戻す。
本番URLは引き続き`https://blog.n1l.dev`なので、Hexoの`url`と記事のパーマリンクは変更しない。

公式手順: [Hexo on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hexo-site/)、
[Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)。
