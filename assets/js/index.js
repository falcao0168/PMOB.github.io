$(function(){
	// 戻るボタンつくる
	$backLink = $("<a></a>");
	$backLink.addClass("ghost");
	$backLink.addClass("smooth");
	$backLink.attr("href", "#");
	$backLink.html("あの頃にもどる");
	$("section").append( $backLink );

	// リストぬるってする
	$("header > ul > a > li").on({
		"mouseenter": function(evnt){
			$target = $( $(this).children("p")[1] );
			$target.animate({top: "0"}, 200);
		},
		"mouseleave": function(evnt){
			$target = $( $(this).children("p")[1] );
			$target.animate({top: "90%"}, 200);
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
});
