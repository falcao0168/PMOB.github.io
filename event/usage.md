usage for registrar.py
===============

requirements
---------------
- Python3

usage
---------------
registrar.py は `index.json` をいじる為のやつです。
直接JSONいじってもいいし今の所そっちの方が楽だけど作っちゃったぜ。へへ。

`index.json` に登録されたファイル名のmarkdownが
**活動記録** に取り込まれて表示されるようになる予定。


- helpだす
```sh
$ python3 registrar.py -h
```

- 登録されたファイル名の一覧を見る
```sh
$ python3 registrar.py show
```

- 登録されたファイルを除く
```sh
$ python3 registrar.py remove foo.md
foo.md removed.
$ # 登録されていないファイルを除こうとする
$ python3 registrar.py remove foo.md
foo.md is not in the registered list.
```

- ファイルを登録する。
```sh
$ ls
foo.md         bar.md          baz.md
index.json      registrar.py
$ python3 registrar.py add foo.md
foo.md registered.
$ # 存在しないファイルを登録しようとする
$ python3 registrar.py add hoge.md
bar.md does not exist.
$ # 既に登録されているファイルを登録しようとする
$ python3 registrar.py add foo.md
foo.md has been registered.
$ 
$ # オプション追加
$ # --caption ログ行きになった時に表示するキャプション
$ # --deadline yyyy-m-dの形式で指定されるイベントの実施日や期日
$ #            これすぎるとログ行きになる
$ python3 registrar.py add bar.md --caption '部誌配布 - 東京電機大学2015年度鳩山祭' --deadline '2015-11-3'
bar.md will go to log in 2015-11-3.
set caption: 部誌配布 - 東京電機大学2015年度鳩山祭
bar.md registered.
$ 
$ python3 registrar.py show
- foo.md
deadline: 1970-1-1
caption:

- bar.md
deadline: 2015-11-3
caption: 部誌配布 - 東京電機大学2015年度鳩山祭
```

- キャプションを指定/更新する。
```sh
$ python3 registrar.py summarize foo.md 'あああ'
```

- 期日を指定/更新する。
```sh
$ python3 registrar.py doom foo.md '2015-9-25'
```

今の所こんな感じです。
全てのサブコマンドで、-hコマンドを与える事でヘルプを見る事が出来ます。
