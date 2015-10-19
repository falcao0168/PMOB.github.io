usage for registrar.py
===============

requirements
---------------
- Python3

usage
---------------
registrar.py は `index.json` をいじる為のやつです。
直接JSONいじってもいいし今の所そっちの方が楽だけど作っちゃったぜ。へへ。

`index.json` に登録されメンバーが
**メンバー** に取り込まれて表示されるようになる。


- helpだす
```sh
$ python3 registrar.py -h
```

- 一覧見る
```sh
$ python3 registrar.py show
```

- 消す
```sh
$ python3 registrar.py rm <名前>
foo.md removed.
```

- 登録する
```sh
$ python3 registrar.py add <名前> [-m|--message] <メッセージ> [-t|--twitter] <twitter_id> [-g|--github] <github_id>
```

- twitterID登録
```sh
$ python3 registrar.py twitter <名前> <twitter_id>
```

- githubID登録
```sh
$ python3 registrar.py github <名前> <github_id>
```

- メッセージ登録
```sh
$ python3 registrar.py message <名前> <メッセージ>
```


今の所こんな感じです。
全てのサブコマンドで、-hコマンドを与える事でヘルプを見る事が出来ます。
