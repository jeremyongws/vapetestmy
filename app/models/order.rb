class Order < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :bill_id
end
