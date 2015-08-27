class MembershipsController < ApplicationController
	before_action :user_signed_in?

	def new # membership views
	end

	def destroy # DESTROY subscription
	end

	def single
	end

	def single_order ##post to payment gateway API
		#if payment gateway succeed
			current_user.member_level = 1
			current_user.save
			render :thank_you #with sharing
		# else
			# render :failed_transaction
	end

	def subscription
	end

	def subscription_order ## payment gateway API
		#if payment gateway succeed
			current_user.member_level = 2
			current_user.save
			render :thank_you #with sharing
		#else
			# render :failed_transaction
	end

	def thank_you
	end
	
end
