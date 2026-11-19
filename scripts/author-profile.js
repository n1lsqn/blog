'use strict';

// tranquilpeak はサイドバーの bio / job をテーマの言語ファイルから読むが、
// テーマは submodule のためブログ側からは編集できない。
// 生成直前に i18n データへ値を差し込んで上書きする。
hexo.extend.filter.register('before_generate', () => {
  const data = hexo.theme.i18n && hexo.theme.i18n.data;
  if (data && data.ja) {
    data.ja['author.bio'] = 'VRChat向けのUnityツールを作っています。たまに技術メモを書きます';
    data.ja['author.job'] = '自営業';
  }
});
