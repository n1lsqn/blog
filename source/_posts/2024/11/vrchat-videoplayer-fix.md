---
title: VRChat内の動画プレイヤーにおいてYouTubeが再生できない問題の解決法
date: 2025-03-26 08:01:04
tags:
  - VRChat
  - 動画プレイヤー
  - VideoPlayer
---

VRChat内の動画プレイヤーにおいてYouTubeのみが再生できない問題が発生していて、解決策の備忘録。

1. 管理者権限でコマンドプロンプトを実行
2. `netsh interface ipv6 set prefixpolicy ::ffff:0:0/96 100 4` を実行
3. PC再起動

で大半は治るはず。治らないのであれば2のコマンドに
``` bash
netsh interface ipv6 set prefixpolicy ::ffff:0:0/96 50 0
netsh interface ipv6 set prefixpolicy ::1/128 40 1
netsh interface ipv6 set prefixpolicy ::/0 30 2
netsh interface ipv6 set prefixpolicy 2002::/16 20 3
netsh interface ipv6 set prefixpolicy ::/96 10 4
```

を実行してみる。これでも治らなければルーターを再起動するか、そもそもIPv6を無効化してしまう。

設定 -> ネットワークとインターネット -> ネットワークの詳細設定 -> 変えたいネットワークの右側にある下三角をクリック（大体イーサネット）-> その他のアダプターオプションの編集をクリック -> 上から8番目あたりにある「インターネットプロトコルバージョン6 (TCP/IPv6)」のチェックを外す -> OKをクリック -> 再起動

で反映されるはず。

# 原因
ここからはあまり読む必要ない。
原因として
```
[Video Playback] ERROR: [youtube] K2CU5pwqQy8: Sign in to confirm you fre not a bot. Use --cookies-from-browser or --cookies for the authentication. See  https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp  for how to manually pass cookies. Also see  https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies  for tips on effectively exporting YouTube cookies
```
が起因している。
これはYouTubeの動画をダウンロードするためのライブラリである`yt-dlp`が、YouTubeの認証を通過できておらずVRChatに動画自体を渡すことができていないのが原因。