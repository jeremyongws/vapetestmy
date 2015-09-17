require 'unirest'
require 'byebug'

class BillPlz
  attr_reader :id, :payment_url, :collection_id, :email, :name, :amount, :redirect_url, :callback_url, :transaction_id, :paid

  # if Rails.env.production?
  #   ENDPOINT = "https://www.billplz.com/api/v2/bills"
  #   COLLECTION_ID = 'v0fahihc1'
  # end

  # if Rails.env.development?
  #   ENDPOINT = "https://billplz-staging.herokuapp.com/api/v2/bills"
  #   COLLECTION_ID = 'ujw4c8yv6'
  # end

  def initialize(amount, email, name, callback_url, collection_id)
    @collection_id =  collection_id
    @endpoint = "https://www.billplz.com/api/v2/bills"
    @amount = amount
    @email = email
    @name = name
    @callback_url = @redirect_url = callback_url + "?method=billplz"
    @transaction_id = Order.all.count + 1
  end

  def create_bill
    response = Unirest.post @endpoint,
                            auth: { user: "61fc31e7-4ce7-4344-985a-75f500112ce0" },
                            parameters: {
                              collection_id: collection_id,
                              email: email,
                              name: name,
                              amount: amount,
                              callback_url: callback_url,
                              redirect_url: redirect_url,
                              metadata: {
                                transaction_id: transaction_id
                              }
                            }
    @payment_url = response.body["url"]
    @id = response.body["id"]
    true
  end

  def process!(transaction_id)
    response = Unirest.get @endpoint + "/#{transaction_id}",
                            auth: { user: "61fc31e7-4ce7-4344-985a-75f500112ce0" }
    byebug
    @paid = response.body['paid']
    byebug
    @transaction_id = transaction_id

    response
  end
end