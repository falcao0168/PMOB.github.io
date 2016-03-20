$(function(){
	// 戻るボタンつくる
	$backLink = $("<a></a>");
	$backLink.addClass("ghost");
	$backLink.addClass("smooth");
	$backLink.attr("href", "#");
	$backLink.html("あの頃にもどる");
	$("section").append( $backLink );

	// @mediaルールにしたがってぬめりをつける
	if (window.matchMedia('(min-width: 625px)').matches) {
		// ぬるってするところは
		// header > ul > li > a
		// です
		$numeri = $("header > ul > li");

		// 参照先ID名をぬるってさせる文字にします
		$numeri.each(function(index, element){
			$anchor = $(element).find("a");
			href = $anchor.attr("href");
			title = href.substr(1).toUpperCase();

			$numerare = $("<a></a>");
			$numerare.addClass("smooth");
			$numerare.attr("href", href);
			$numerare.html(title);
			$anchor.after( $numerare );
		});

		// リストぬるってする
		$numeri.on({
			"mouseenter": function(evnt){
				$target = $( $(this).children("a")[1] );
				$target.animate({top: "-40px"}, 200);
			},
			"mouseleave": function(evnt){
				$target = $( $(this).children("a")[1] );
				$target.animate({top: "-4px"}, 200);
			}
		});
	}

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
