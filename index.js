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
});
