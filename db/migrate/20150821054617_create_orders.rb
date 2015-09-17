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
      t.string :flavors
      t.string :bill_id
      t.boolean :paid, default: false

      t.timestamps null: false
    end
    add_index :orders, :user_id
    add_index :orders, :bill_id
  end
end
