メンバー登録
========
[add_member](https://github.com/PMOB/PMOB.github.io/tree/add_member)ブランチで
[member.json](member.json)を弄って追加し、masterへのPull Requestを立ててください。
Pull Requestマージ後にブランチの削除は必要ありません。

有効な値は以下です。

| key     | value  |
|---------|--------|
| name    | 名前 |
| message | ひとこと |
| github  | GitHubユーザID |
| twitter | twitterユーザID |

名前くらいは書いてくれるとそれっぽくなる。

### その他の情報を掲載したい
上記以外の紹介文を掲載したい場合はIssueかPR立ててください。

`index.js`で`member.json`から情報取ってきてテーブルに追加している部分があるので
それ弄ればすぐ追加できます。
