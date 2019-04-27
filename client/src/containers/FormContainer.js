import React, {Component} from 'react';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import AllFriendInfo from '../components/AllFriendInfo';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketOptions: [
        { value: "1", label: "1 Ticket ($25)"},
        { value: "2", label: "2 Tickets ($40)"},
        { value: "3", label: "3 Tickets ($60)"},
      ],
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateFriends = this.updateFriends.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
  }

  updateFriends(e) {
    var numFriends = e.target.value;
    var newFriends = [];
    for (var i=0; i < numFriends; i++) {
      newFriends.push({ "name": '', "email": ''});
    }

    this.props.updateState(function(prevState) {
      console.log(newFriends);
      return {
        friends: newFriends,
        order : {
          ...prevState.order, beers: numFriends
        }
      }
    }
    )
  }

  updateFriendAttribute(e) {
    let value = e.target.value;
    let name = e.target.name;
    let friend_index = parseInt(name.match(/\d+/g));
    let friend_attribute = name.match(/[a-z]+/g)[1];

    this.props.updateState(function(prevState) {
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
    }
    )
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.props.updateState(function(prevState) {
      return {
        order : {
          ...prevState.order, [name]: value
        }
      }
    }
    )
  }


  render() {
    return (
      <div className="dropin-wrapper">
        <form className="container-fluid" >
          <Select type={'number'}
            title= {'Tickets'}
            name= {'tickets'}
            value={this.props.getOrderData()["tickets"]}
            placeholder = {'Quantity'}
            handleChange = {this.handleInput}
            options = {this.state.ticketOptions}
          />
          <Input type={'number'}
            title= {'Raffle Tickets'}
            name= {'raffle_tickets'}
            value={this.props.getOrderData()["raffle_tickets"]}
            placeholder = {'Quantity'}
            handleChange = {this.handleInput}
          />
          <Input type={'number'}
            title= {'Buy a beer for a friend!'}
            name= {'beers'}
            value={this.props.getOrderData()["beers"]}
            placeholder = {'Quantity'}
            handleChange = {this.updateFriends}
          />
          <AllFriendInfo
            numBeers = {this.props.order.beers}
            friends = {this.props.friends}
            updateFriendAttribute = {this.updateFriendAttribute}
          />
        </form>
      </div>
    );
  }
}

export default FormContainer;
