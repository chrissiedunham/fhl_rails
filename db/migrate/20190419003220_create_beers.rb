class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.references :order, foreign_key: true
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
