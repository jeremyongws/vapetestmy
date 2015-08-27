class DashboardController < ApplicationController
	
	def index
		if current_user.nil?
			redirect_to "/users/sign_in"
		elsif current_user.member_level == 1 || current_user.member_level == 2
	  		@orders = current_user.orders.all
	  		render :user_dashboard
	  	elsif current_user.member_level == 0
	  		@orders = Order.all
	  		render :admin_dashboard
	  	end
	end

	def update_tracking
		@order = Order.find(params[:order_id].to_s)
		@user = User.find(@order.user_id)
		@order.tracking_id = params[:tracking_id]
		@order.save
		# email not tested 
		OrderMailer.tracking_id(@user, @order.tracking_id).deliver_now
		render html: "#{@order.tracking_id}"
	end
end


# Member Levels
# Admin = 0
# Trial = 1
# Member = 2