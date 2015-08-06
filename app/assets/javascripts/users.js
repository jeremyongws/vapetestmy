$(function() {

	$("footer").css("display", "none");

	$("#slider").slider({
			range: "min",
			value: 500,
			min: 0,
			max: 1000,
			step: 10,
			slide: function(event, ui) {
				$("#amount-label").val("MYR " + ui.value);
			}
	});

	$("#amount").val($("#slider").slider("value"));
	$("#amount-label").val("MYR " + $("#slider").slider("value"));

	var packagesArray = [];
	var emailFormat = /^[^@\s]+@[^@\s.]+\.[\w]+/i;

	$(".activity-option").click(function(){
		$(this).toggleClass("activity-option-selected")
		$(this).find(".fa").toggleClass("fa-selected")
		$(this).find(".fa-circle").toggleClass("hidden")
		$(this).find(".fa-check-circle").toggleClass("hidden")
		var packageText = $(this).find(".activity-text").text()
		if ($.inArray(packageText, packagesArray) == -1) {
			packagesArray.push(packageText);
		}
		else {
			var index = packagesArray.indexOf(packageText);
			packagesArray.splice(index ,1)
		}
	});

	$("#first-button").click(function(e){
		if (packagesArray == "") {
			e.preventDefault();
			$(".activity-error").css("display","inherit");
			return false;
		}
		else {
			return true;
		}
	});

 	function detailsEmpty(){
		$(".error-message" ).css("display","none")
		$(".details-error" ).css("display","none")
		$(".email-error" ).css("display","none")
		$(".sign-up-success").css("display","none")

		var userName = $("#user-name").val();
		var userEmail = $("#user-email").val();

 		if (userName == "" || userEmail == "") {
			$(".error-message").css("display","block");
			$(".details-error").css("display","block");
			return false;
		}
		else if (emailFormat.test(userEmail) === false) {
			$(".error-message").css("display","block");
			$(".email-error").css("display","block");
			return false;
		}
		else {
			$(".error-message" ).css("display","none");
			$(".details-error" ).css("display","none");
			$(".email-error" ).css("display","none");
			$(".jumbotron").hide();
			$(".loading-gif").appendTo("body");
			$(".loading-gif").css("display","block")
			return true;
		}
 	}

	$("#btn-submit").click(function(e){
		detailsEmpty();
		e.preventDefault();
		var dislike = $("#dislike").val()
		var feedback = $("#feedback").val()
		var userName = $("#user-name").val()
		var userEmail = $("#user-email").val()
		
		$.ajax({
			type: "POST",
			url: '/users',
			data: {
				packages_selected: packagesArray,
				dislike_feedback: dislike,
				feedback: feedback,
				user_name: userName,
				user_email: userEmail}
			}).done(function(result) {
				$(".loading-gif").css("display","none");
	  			$("#carousel").html(result);
			});

		});
});
