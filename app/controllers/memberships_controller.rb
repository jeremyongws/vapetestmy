class MembershipsController < ApplicationController
	before_action :user_signed_in?

	def new # membership views
	end

	def create # POST to payment gateway API
	end

	def destroy # DESTROY subscription
	end

	def single
	end

	def subscription
	end

	def thank_you
	end
	
end
