$(function(){
	/** マークダウン変換 **/
	// reqとidをバインドした上手いやり方が欲しい
	ids = [];
	reqs = [];
	$.each($("div.markdown"), function(index, Node){
		$target = $( Node );
		if( !!$target.attr("src") ){
			req = $.get( $target.attr("src") );
			reqs.push( req );
			ids.push( $target.attr("id") );
		} else {
			markdown = $target.html();
			$target.html( marked( markdown ) );
		}
	});
	// argumentsのクソ仕様対応
	if (reqs.length == 1){
		reqs[0].done(function(Obj){
			$target = $("div#"+ids[0]);
			markdown = Obj;
			$target.html(marked(markdown));
		});
	} else if (reqs.length > 1) {
		// 各HTTPRequestの結果を受けてmarkdownを書き込む
		$.when.apply($, reqs).done(function(){
			$.each(arguments, function(index, Obj){
				$target = $("div#"+ids[index]);
				markdown = Obj[0];
				$target.html( marked( markdown ) );
			});
		});
	}
});
