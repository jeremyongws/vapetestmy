class DashboardController < ApplicationController
	def index
	  # @user = User.find(session[:id])
	  @orders = Order.all
	  # if @user.admin?
	  #   @orders = Order.all	
	  #   render :admin_dashboards
	  # else
	  # 	@orders = User.all.orders
	  # 	render :user_dashboard
	  # end
	end
end


# Member Levels
# Admin = 0
# Trial = 1
# Member = 2