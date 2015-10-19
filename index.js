$(function(){
	/* 活動記録引っ張ってくる */
	// 外部ソース埋め込み
	$.getJSON( "event/index.json", function(data){
		shownArticles = 0;
		now = Math.floor( $.now() / 1000 );
		$.each(data, function(index, article){
			if(article.deadline > now){ // 期限前
				// 記事引っ張ってきてmarkdown変換
				$tar = $("#notice");
				$.get( "event/"+article.fname, markup_source( $tar ) );

				// 掲載日時の表示
				$time = $("<time></time>");
				deadline = new Date(article.deadline * 1000);
				$time.html("-- " + deadline.toDateString());
				$tar.prepend($time);
			}
			else if(shownArticles < 7) { // 期限杉
				// 過去ログ行き上位7つキャプションと日時だけ表示
				$tar = $("#history");
				$p = $("<p></p>");
				deadline = new Date(article.deadline * 1000);
				$p.html(deadline.toDateString() + " -- " + article.caption);
				$tar.prepend($p);
				$h1 = $("<h1></h1>");
				$h1.html("活動記録");
				$tar.prepend($h1);
				shownArticles += 1;
			}
		});
	});

	/* メンバー引っ張ってくる */
	$.getJSON( "index.json", function(data){
		$table = $("tbody");
		$.each(data, function(index, member){
			$me = $("<tr></tr>");

			$name = $("<td></td>");
			$name.html(member.name);
			$me.append($name);

			$msg = $("<td></td>");
			$msg.html(member.message);
			$me.append($msg);

			// コンソメ
			$links = $("<td></td>");

			if(member.github){
				$gh = $("<img>");
				$gh.attr("alt", "github");
				$gh.attr("src", "img/GitHub-Mark-32px.png");
				$gh.attr("width", "16px");
				$gh.attr("height", "16px");

				$gh_link = $("<a></a>");
				$gh_link.attr("href", "https://github.com/"+member.github);

				$gh_link.append($gh);
				$links.append($gh_link);
			}

			if(member.twitter){
				$tw = $("<img>");
				$tw.attr("alt", "twitter");
				$tw.attr("src", "img/TwitterLogo.png");
				$tw.attr("width", "16px");
				$tw.attr("height", "16px");

				$tw_link = $("<a></a>");
				$tw_link.attr("href", "https://twitter.com/"+member.twitter);

				$tw_link.append($tw);
				$links.append($tw_link);
			}

			$me.append($links);

			$table.append($me);
		});
	});
});
