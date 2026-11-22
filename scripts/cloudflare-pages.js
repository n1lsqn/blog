'use strict';

// The pinned theme includes Vercel scripts, which are unavailable on Pages.
if (process.env.CF_PAGES === '1') {
  hexo.extend.filter.register('after_render:html', function (html) {
    return html.replace(/\s*<script\b[^>]*\bsrc=["']\/_vercel\/(?:insights|speed-insights)\/script\.js["'][^>]*>\s*<\/script>/g, '');
  });
}
