class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.string :tracking_id
      t.string :first_name
      t.string :last_name
      t.string :street_address
      t.string :city
      t.integer :postcode
      t.string :state
      t.string :phone_number
      t.string :flavors

      t.timestamps null: false
    end
    add_index :orders, :user_id
  end
end
