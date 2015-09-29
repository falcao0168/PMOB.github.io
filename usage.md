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
**活動記録** だとか **メンバー** に取り込まれて表示されるようになる予定。


- helpだす
```sh
$ python3 registrar.py -h
usage: registrar.py [-h] {init,show,add,rm} ...

positional arguments:
  {init,show,add,rm}  sub-commands
    init              show registered files
    show              show registered files
    add               register file to index
    rm                remove registered file from index

optional arguments:
  -h, --help          show this help message and exit
```

- registrar.pyを使うために `index.json` の初期化
```sh
$ python3 registrar.py init
empty index.json was made.
$ # initせずに何かしらの機能を使おうとすると
$ # initしろって文句言うよ
$ python3 registrar.py show
First of all, initialize index.json with `init` command.
```

- 登録されたファイル名の一覧を見る
```sh
$ python3 registrar.py show
ore.md
omae.md
daigoro.md
```

- ファイルを登録する。
```sh
$ ls
ore.md         omae.md         daigoro.md
foo.md         index.json      registrar.py
$ python3 registrar.py add foo.md
foo.md registered.
$ # 存在しないファイルを登録しようとする
$ python3 registrar.py add bar.md
bar.md does not exist.
$ # 既に登録されているファイルを登録しようとする
$ python3 registrar.py add foo.md
foo.md has been registered.
```

- 登録されたファイルを除く
```sh
$ python3 registrar.py remove foo.md
foo.md removed.
$ # 登録されていないファイルを除こうとする
$ python3 registrar.py remove foo.md
foo.md is not in the registered list.
```

今の所こんな感じです
