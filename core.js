function markup_source($node){
	return function(markdown){
		$node.prepend( marked( markdown ) );
	}
}

$(function(){
	/* システム系 */
	// 外部ソース埋め込み
	$.each($("div.include"), function(index, Node){
		$target = $( Node );
		$.get( $target.data("src"), markup_source( $target ));
	});

	// マークダウン変換
	// classがmarkdownになっているdivの中身をマークダウンとして変換します
	$.each($(".markdown"), function(index, Node){
		$target = $( Node );
		markdown = $target.html();
		$target.html( marked( markdown ) );
	});

	/* デザイン系 */
	// 戻る牡丹つくる
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
});
