$(function() {

	$(".progress").css("display", "none");
	$("footer").css("display", "none");

	$("#slider").slider({
			range: "min",
			value: 2,
			min: 0,
			max: 5,
			step: 1,
			slide: function(event, ui) {
				if (ui.value === 0 ) {
					$("#amount-label").val("Less than 1 year");
				} 
				else if (ui.value === 5) {
					$("#amount-label").val("More than " + ui.value + " Years");
				} 
				else if (ui.value === 1) {
					$("#amount-label").val(ui.value + " Year");
				} 
				else {
					$("#amount-label").val(ui.value + " Years");	
				}
			}
	});

	$("#amount").val($("#slider").slider("value"));
	$("#amount-label").val($("#slider").slider("value") + " years");

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

	$(".start").click(function(e){
		$(".progress").toggle();
		if ($(this).hasClass("start2")) {
			$(".progress-bar").attr('aria-valuenow', 25);
			$(".progress-bar").animate({ width: "25%" }, 2500);
			$(".progress-bar").text( firstValue );
		}
	})

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
			$(".error-message").css("display","none");
			$(".details-error").css("display","none");
			$(".email-error").css("display","none");
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
		var age = $("#amount").val();
		var userPassword = $("#user-password").val();
		var userPasswordConfirmation = $("#user-password-confirmation").val();
		var userEmail = $("#user-email").val();
		
		$.ajax({
			type: "POST",
			url: '/users',
			data: {
				packages_selected: packagesArray,
				dislike_feedback: dislike,
				age: age,
				user_password: userPassword,
				user_password_confirmation: userPasswordConfirmation,
				user_email: userEmail}
			}).done(function(result) {
				$(".loading-gif").fadeOut("fast", function(){
					$("body").html(result);
					$("body").toggle();
					$("body").fadeIn('fast', function(){
						$(".progress").css("display", "block");
					});
				});
			});
		});
	});
