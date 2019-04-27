class OrdersController < ApiController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.all

    render json: @orders.to_json
  end

  # GET /orders/1
  def show
    @order = Order.find(params[:id])
    @order.beers
    render json: @order.to_json(:include => { :beers => { :only => [:id, :name]}})
  end

  # POST /orders
  def create
    @order = Order.new(_order_params)
    if @order.save!
      @order.beers.create(_beer_params[:beers])

      Rails.logger.info("*"*100)
      Rails.logger.info(@order.beers.length)
      Rails.logger.info(@order.to_json)
      Rails.logger.info("*"*100)

      if _nonce.present?
        result = gateway.transaction.sale(
          amount: 10,
          payment_method_nonce: _nonce,
          :custom_fields => {
            :tickets => params[:order][:tickets],
            :raffle_tickets => params[:order][:raffle_tickets],
          },
          :options => {
            :submit_for_settlement => true
          },
        )

        Rails.logger.info(result)
      end
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(_order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  def gateway
    env = ENV["BT_ENVIRONMENT"]
    @gateway ||= Braintree::Gateway.new(
      :environment => env && env.to_sym,
      :merchant_id => ENV["BT_MERCHANT_ID"],
      :public_key => ENV["BT_PUBLIC_KEY"],
      :private_key => ENV["BT_PRIVATE_KEY"],
    )
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def _nonce
      params.require(:order).permit(:payment_method_nonce)
    end

    def _order_params
      params.require(:order).permit(:tickets, :raffle_tickets, :email)
    end

    def _beer_params
      params.require(:order).permit(beers: [:email, :name])
    end
end
