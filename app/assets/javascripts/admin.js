$(function() {

	$(".submit-tracking").click(function(e){
		// debugger
		e.preventDefault();
		// debugger;
		var form = $(this).parent();
		var trackingId = $(this).prev().val();
		var orderId = $(this).prev().prev().val();
		var underneathSubmitAppend = form.append("<p>processing..</p>");
		form.last().addClass("processing");
		// debugger
		$.ajax({
			type: "POST",
			url: "/admin/update_tracking",
			data: {
				tracking_id: trackingId,
				order_id: orderId
			}
		}).done(function(result) {
			$(".processing").replaceWith(result);
		});
	});
});
