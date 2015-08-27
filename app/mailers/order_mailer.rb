class OrderMailer < ApplicationMailer

	def tracking_id(user, tracking_id)
		@user = user
		@tracking_id = tracking_id
		mail(to: @user.email, subject: "Your Box Has Been Shipped!")
	end

end
