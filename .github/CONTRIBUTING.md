サイト構築の現状について
========
wikiを参照してください。
また、構成の現状はwikiに文書化するようにしてください。


メンバー登録
========
[update][branch] ブランチで `_data/members.yml` を弄って追加し、
masterへのPull Requestを立ててください。
マージ後にブランチの削除は必要ありません。

有効な値は以下です。

| key     | value           |
|---------|-----------------|
| name    | 名前            |
| message | ひとこと        |
| github  | GitHubユーザID  |
| twitter | twitterユーザID |

名前くらいは書いてくれるとそれっぽくなる。

### 他の情報を掲載したい
上記以外の紹介文を掲載したい場合は
テンプレートの変更なりなんなりの対策を取るためにIssueかPR立ててください。

[branch]: https://github.com/PMOB/PMOB.github.io/tree/update
