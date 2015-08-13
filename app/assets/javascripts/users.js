$(function() {

	$("footer").css("display", "none");

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

	var firstValue = "25% Complete"
	var secondValue = "50% Complete"
	var thirdValue = "75% Complete (almost there!)"

	$("#first-button").click(function(e){
		if (packagesArray == "") {
			e.preventDefault();
			$(".activity-error").css("display","inherit");
			return false;
		}
		else {
			$(".progress-bar").attr('aria-valuenow', 25)
			$(".progress-bar").animate({ width: "25%" }, 2500);
			$(".progress-bar").text( firstValue );
			return true;
		}
	});

	$("#first-back-button").click(function(e){
		$(".progress-bar").attr('aria-valuenow', 0)
		$(".progress-bar").animate({ width: "0%" }, 1500);
		$(".progress-bar").text( "0% Complete" );
	});

	$("#second-button").click(function(e){
		$(".progress-bar").attr('aria-valuenow', 50)
		$(".progress-bar").animate({ width: "50%" }, 1500);
		$(".progress-bar").text( secondValue );
	});

 	// not functional
	$("#second-back-button").click(function(e){
		$(".progress-bar").attr('aria-valuenow', 25)
		$(".progress-bar").animate({ width: "25%" }, 1500);
		$(".progress-bar").text( firstValue );
	});

	$("#third-button").click(function(e){
		$(".progress-bar").attr('aria-valuenow', 75)
		$(".progress-bar").animate({ width: "75%" }, 1500);
		$(".progress-bar").text( thirdValue );
	});

	// not functional
	$("#third-back-button").click(function(e){
		$(".progress-bar").attr('aria-valuenow', 50)
		$(".progress-bar").animate({ width: "50%" }, 1500);
		$(".progress-bar").text( secondValue );
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
			$(".loading-gif").fadeIn("slow");
			return true;
		}
 	}

	$("#btn-submit").click(function(e){
		detailsEmpty();
		e.preventDefault();
		var dislike = $("#dislike").val();
		var feedback = $("#likes").val();
		var userPassword = $("#user-password").val();
		var userPasswordConfirmation = $("#user-password-confirmation").val();
		var userEmail = $("#user-email").val();
		
		$.ajax({
			type: "POST",
			url: '/users',
			data: {
				packages_selected: packagesArray,
				dislike_feedback: dislike,
				feedback: feedback,
				user_password: userPassword,
				user_password_confirmation: userPasswordConfirmation,
				user_email: userEmail}
			}).done(function(result) {
				$(".loading-gif").fadeOut("fast", function(){
					$("body").html(result);
					$("body").toggle();
					$("body").fadeIn('fast');
				});
			});

		});
});
