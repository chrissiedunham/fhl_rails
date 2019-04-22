import React, {Component} from 'react';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import AllFriendInfo from '../components/AllFriendInfo';
import Button from '../components/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        tickets: '',
        raffle_tickets: '',
        beers: '',
      },
      friends: [],
      ticketOptions: ["1 Ticket ($25)", "2 Tickets ($40)", "3 Tickets ($60)", "4 Tickets ($80)"]
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBeerChange = this.handleBeerChange.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getOrders () {
    this.fetch('/api/orders')
      .then(orders => {
        if (orders.length) {
          console.log("Success fetching orders");
          console.log(orders)
        } else {
          console.log("error fetching orders")
        }
      })
  }

	handleFormSubmit(e) {
		e.preventDefault();
		let userData = this.state.order;

    this.getOrders();
		console.log("Successful" + userData);
	}

  updateFriendAttribute(e) {
		let value = e.target.value;
		let name = e.target.name;
    let friend_index = parseInt(name.match(/\d+/g));
    let friend_attribute = name.match(/[a-z]+/g)[1];

    this.setState(prevState => {
      return {
        friends: prevState.friends.map((friend,i) => {
          if (i === friend_index) {
            friend[friend_attribute] = value;
            return friend;
          }
          return friend;
        }
        )
      }
    }, () => console.log(this.state.friends)
    )
  }

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;
		this.setState( prevState => {
			return {
				order : {
					...prevState.order, [name]: value
				}
			}
		}, () => console.log(this.state.order)
		)
	}

  handleBeerChange(e) {
    e.persist();
	  this.handleInput(e);
		this.setState( prevState => {
      var numFriends = e.target.value;
      var newFriends = [];
      for (var i=0; i <numFriends; i++) {
        newFriends.push({ "name": '', "email": ''});
      };
			return {
				friends: newFriends
			}
		}, () => console.log("order: " + this.state.order, "friends: " + this.state.friends)
		)
  }

  render() {
    return (
			<form className="container-fluid" onSubmit={this.handleFormSubmit}>

			<Select type={'number'}
				title= {'Tickets'}
				name= {'tickets'}
				value={this.state.order.tickets}
				placeholder = {'Quantity'}
				handleChange = {this.handleInput}
        options = {this.state.ticketOptions}
			/>
			<Input type={'number'}
				title= {'Raffle Tickets'}
				name= {'raffle_tickets'}
				value={this.state.order.raffle_tickets}
				placeholder = {'Quantity'}
				handleChange = {this.handleInput}
			/>
			<Input type={'number'}
				title= {'Buy a beer for a friend!'}
				name= {'beers'}
				value={this.state.order.beers}
				placeholder = {'Quantity'}
				handleChange = {this.handleBeerChange}
			/>
      <AllFriendInfo
        numBeers = {this.state.order.beers}
        friends = {this.state.friends}
        updateFriendAttribute = {this.updateFriendAttribute}
      />
			<Button
				action={this.handleFormSubmit}
				style={buttonStyle}

				type={"primary"}
				title={"Submit"}
			/>{ " " }
		</form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
