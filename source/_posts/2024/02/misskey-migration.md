---
title: misskeyのdbをバックアップから復元する。
description: Misskeyのデータベースをバックアップから復元する手順。pg_dumpで取得したバックアップをpsqlでリストアする流れを、実施時のコマンドとともにまとめた。
date: 2024-02-27 14:13:21
tags: misskey
---

# pg_dumpでバックアップを取得し、psqlで復元する。
すでにバックアップは準備できているものとする。

<!-- more -->
```sh
sudo -u postgres psql
```
```sql
CREATE DATABASE mk1 OWNER misskey;
```

拡張機能を入れている場合は、拡張機能をインストールする。
```sql
CREATE EXTENSION pgroonga;
```

# バックアップから復元する。
```sh
psql -d mk1 < backup.sql
```