class CreatePreferences < ActiveRecord::Migration
  def change
    create_table :preferences do |t|
      t.string :name
      t.integer :user_id
      t.timestamps null: false
    end
    add_index :preferences, :user_id
  end
end
