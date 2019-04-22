class RemoveBeersFromOrder < ActiveRecord::Migration[5.2]
  def change
    remove_reference :orders, :beers, foreign_key: true
  end
end
