function markup_source(id){
	return function(markdown){
		$target = $("div#" + id);
		$target.prepend( marked( markdown ) );
	}
}

$(function(){
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

	// マークダウン変換
	// src属性が指定されている場合外部ファイル読み込み
	// それ以外埋め込みmarkdown
	$.each($("div.markdown"), function(index, Node){
		$target = $( Node );
		if( !!$target.attr("src") ){
			$.get( $target.attr("src"), markup_source( $target.attr("id") ));
		} else {
			markdown = $target.html();
			$target.html( marked( markdown ) );
		}
	});

	// 戻る牡丹つくる
	$backLink = $("<a></a>");
	$backLink.addClass("ghost");
	$backLink.addClass("smooth");
	$backLink.attr("href", "#");
	$backLink.html("あの頃にもどる");
	$("div").append( $backLink );

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
