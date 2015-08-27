# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

@flavor1 = Flavor.create(name: "Icy")
@flavor2 = Flavor.create(name: "Fruity")
@flavor3 = Flavor.create(name: "Creamy")
@flavor4 = Flavor.create(name: "Candy")
@flavor5 = Flavor.create(name: "Cloudy")
@flavor6 = Flavor.create(name: "Carbonated Drinks")
@flavor7 = Flavor.create(name: "Dessert")
@flavor8 = Flavor.create(name: "Coffee")
@admin = User.create(email: "jeremy@vapeclubmy.com", password: "cipapbesi", password_confirmation: "cipapbesi", member_level: 0)

30.times do
	@flavor_array = [@flavor1, @flavor2, @flavor3, 
					 @flavor4, @flavor5, @flavor6,
					 @flavor7, @flavor8]
	@user = User.create(email: Faker::Internet.email, 
				password: "password123",
				password_confirmation: "password123",
				first_name: Faker::Name.first_name,
				member_level: rand(1..2).to_s,
				last_name: Faker::Name.last_name,
				street_address: Faker::Address.street_address,
				city: Faker::Address.city,
				postcode: Faker::Address.postcode.to_s,
				state: Faker::Address.state,
				phone_number: Faker::PhoneNumber.phone_number)
	rand(1..4).times do
		Preference.create(name: @flavor_array.sample.name, user_id: @user.id)
	end
	Order.create(user_id: @user.id, tracking_id: nil, 
				 first_name: @user.first_name, last_name: @user.last_name,
				 street_address: @user.street_address, city: @user.city,
				 postcode: @user.postcode, state: @user.state,
				 phone_number: @user.phone_number)
end