# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

order_1 = Order.create(
  :tickets => 2,
  :raffle_tickets => 1,
  :email => "customer_email_1@gmail.com",
)

order_2 = Order.create(
  :tickets => 2,
  :raffle_tickets => 2,
  :email => "customer_email_2@gmail.com",
)

order_1.beers.create(:name => "Friend1 Name", :email => "friend_email_1@gmail.com")
order_2.beers.create(:name => "Friend2 Name", :email => "friend_email_2@gmail.com")
