// Ajaxify Buy Now and Join Now! to loading screen and AJAXIFY
// load up billing form .html >> 

$(function() {
	$("#btn-1").click(function(e){
		$(".jumbotron").hide();
		$(".loading-gif").appendTo("body");
		$(".loading-gif").fadeIn("slow");
		e.preventDefault();
		
		$.ajax({
			type: "GET",
			url: '/memberships/single'
			}).done(function(result) {
				$(".loading-gif").fadeOut("fast", function(){
					$("body").html(result);
					$("body").toggle();
					$("body").fadeIn('fast');
				});
			});
		});

	$("#btn-2").click(function(e){
		$(".jumbotron").hide();
		$(".loading-gif").appendTo("body");
		$(".loading-gif").fadeIn("slow");
		e.preventDefault();
		
		$.ajax({
			type: "GET",
			url: '/memberships/subscription'
			}).done(function(result) {
				$(".loading-gif").fadeOut("fast", function(){
					$("body").html(result);
					$("body").toggle();
					$("body").fadeIn('fast');
				});
			});
		});
	});
