class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :tickets
      t.integer :raffle_tickets
      t.references :beers, foreign_key: true

      t.timestamps
    end
  end
end
