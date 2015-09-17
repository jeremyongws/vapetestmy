class MembershipsController < ApplicationController
	before_action :user_signed_in?

	def new # membership views
	end

	def destroy # DESTROY subscription
	end

	def single
	end

	def single_order ##post to payment gateway API
		update_user_info
		if Rails.env.production?
			@bill = BillPlz.new(current_user.id, 
							12900, 
							current_user.email, 
							current_user.first_name + " " + current_user.last_name, 
							"http://member.vapeclubmy.com/thankyou", "rrpcrgtb")
		end
		if Rails.env.development?
			@bill = BillPlz.new(current_user.id, 
							12900, 
							current_user.email, 
							current_user.first_name + " " + current_user.last_name, 
							"http://localhost:3000/thankyou", "rrpcrgtb")
		end
		@bill.create_bill
		if params[:ship_to_different_address] == "1"
			@order = Order.create(user_id: current_user.id,
					 			  first_name: params[:shipping_first_name],
					 			  last_name: params[:shipping_last_name],
					 			  street_address: params[:shipping_address_1] + params[:shipping_address_2],
					 			  city: params[:shipping_city],
					 			  postcode: params[:shipping_postcode],
					 			  state: params[:shipping_state],
					 			  bill_id: @bill.id,
					 			  paid: false)
		redirect_to @bill.payment_url
	end

	def subscription
	end

	def subscription_order ## payment gateway API
		update_user_info
		#if payment gateway succeed
			current_user.update(:member_level => 2)
			render :thank_you #with sharing
		#else
			# render :failed_transaction
	end

	def thank_you
		@billplz_id = params[:billplz][:id]
		@paypal_id = params[:paypal][:id]
		response = Unirest.get "https://www.billplz.com/api/v2/bills/#{@bill_id}", auth: {user:  "61fc31e7-4ce7-4344-985a-75f500112ce0"}
		if response.body["paid"]
			if params[:method] == "billplz"
				current_user.update(:member_level => 1)
				@order = Order.find_by(bill_id: @bill_id)
				@order.update(:paid => true)
			elsif params[:method] == "paypal"
				current_user.update(:member_level => 2)
				@order = Order.find_by(bill_id: @bill_id)
				@order.update(:paid => true)
			end
			render :thank_you
		else
			render :failed_transaction
		end
	end
	

	private
		def update_user_info
			current_user.update(:first_name => params[:billing_first_name],
							:last_name => params[:billing_last_name],
							:street_address => params[:billing_address_1] + " " + params[:billing_address_2],
							:city => params[:billing_city],
							:postcode => params[:billing_postcode],
							:state => params[:billing_state],
							:phone_number => params[:billing_phone])
		end
end
