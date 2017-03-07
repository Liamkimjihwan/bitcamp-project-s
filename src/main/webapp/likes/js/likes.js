$(function() {
	$(".thumb").on("click", function() {
		$(".thumb").each(function() {
			$(this).css("display", "none");
		});
		$(this).css({
			display: "block",
			position: "relative",
			margin: "0 20px",
			"z-index": "9"

		});
		if ($(this).attr("class") == "thumb two") $(this).css("left", "324px");
		if ($(this).attr("class") == "thumb thr") $(this).css("left", "634px");
		if ($(this).attr("class") == "thumb fou") $(this).css("left", "924px");
		
		$(this).animate({
			left: "50px",
			top: "-50px",
			width: "360px", 
			height: "660px"
		}, 500);
		
		$(this).children(".person-desc").css({
			display: "block",
		    position: "relative",
		    top: "-650px",
		    width: "500px",
			"z-index": "1"
		});
		
		$(this).children(".person-desc").animate({
			left: "450px"
		}, 1000);
	});
});