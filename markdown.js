$(function(){
	// マークダウン変換
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
	if (reqs.length > 0) {
		$.when.apply($, reqs).done(function(){
			$.each(arguments, function(index, Obj){
				$target = $("div#"+ids[index]);
				markdown = Obj[0];
				$target.html( marked( markdown ) );
			});
		});
	}
});
