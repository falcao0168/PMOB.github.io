$(function(){
	/* デザイン系 */
	// 戻るボタンつくる
	$backLink = $("<a></a>");
	$backLink.addClass("ghost");
	$backLink.addClass("smooth");
	$backLink.attr("href", "#");
	$backLink.html("あの頃にもどる");
	$("article").append( $backLink );
	// リストぬるってする
	$("ul.top > li").on({
		"mouseenter": function(evnt){
			$target = $( $(this).children("a")[1] );
			$target.animate({top: "0px"}, 200);
		},
		"mouseleave": function(evnt){
			$target = $( $(this).children("a")[1] );
			$target.animate({top: "40px"}, 200);
		}
	});
	// スムーズスクロール
	$("a.smooth").click(function(){
		ref = $(this).attr("href");
		target = $(ref == "#" || ref == "" ? "html" : ref);
		pos = target.offset().top;
		if (pos > 24) pos -= 24;
		$("body, html").animate({scrollTop: pos}, 420);
		return false;
	});

	/* メンバー引っ張ってくる */
	$.getJSON( "member.json", function(data){
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
				$gh.addClass("linkicon");
				$gh.attr("alt", "github");
				$gh.attr("src", "img/GitHub-Mark-32px.png");

				$gh_link = $("<a></a>");
				$gh_link.attr("href", "https://github.com/"+member.github);

				$gh_link.append($gh);
				$links.append($gh_link);
			}

			if(member.twitter){
				$tw = $("<img>");
				$tw.addClass("linkicon");
				$tw.attr("alt", "twitter");
				$tw.attr("src", "img/TwitterLogo.png");

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
