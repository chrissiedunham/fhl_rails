import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import PayButton from './components/PayButton';
import BraintreeForm from './containers/BraintreeForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testObj: {
        testVal: 'test value',
      },
      friends: [],
      order: {
        tickets: '',
        raffle_tickets: '',
        beers: '',
      },
      dropinInstance: {},
      paymentMethodPayload: {},
      paymentResponse: '',
    }

    this.handleBeerChange = this.handleBeerChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.setDropinState = this.setDropinState.bind(this);
    this.getDropinState = this.getDropinState.bind(this);
    this.setPaymentMethodPayload = this.setPaymentMethodPayload.bind(this);
  }

  handleBeerChange(e) {
    e.persist();
    this.handleInput(e);
    this.setState( prevState => {
      var numFriends = e.target.value;
      var newFriends = [];
      for (var i=0; i < numFriends; i++) {
        newFriends.push({ "name": '', "email": ''});
      }
      return {
        friends: newFriends
      }
    }, () => console.log("order: " + this.state.order, "friends: " + this.state.friends)
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
    }, () => console.log(this.props.order)
    )
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
    }, () => console.log(this.props.friends)
    )
  }

  setDropinState (dropinInstance) {
    this.setState({ dropinInstance });
  }

  getDropinState () {
    return this.state.dropinInstance;
  }

  setPaymentMethodPayload (paymentMethodPayload) {
    this.setState({ paymentMethodPayload });
  }

  postOrder() {
    var orderPayload = {
      tickets: this.state.order.tickets,
      raffle_tickets: this.state.order.raffle_tickets,
      email: "test_new_email@gmail.com",
      beers: this.state.friends,
      payment_method_nonce: this.state.paymentMethodPayload["nonce"],
    };
    console.log(orderPayload);
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: orderPayload })
    }).then(response => { return response.json();})
      .then(responseData => { return responseData;})
      .then(data => {
        alert(JSON.stringify(data));
      })
      .catch(err => {
        alert("fetch error" + err);
      });
  }

  render() {
    return (
			<div className="col-md-6">
        <FormContainer
          testObj={this.state.testObj}
          friends={this.state.friends}
          order={this.state.order}

          handleBeerChange={this.handleBeerChange}
          handleInput={this.handleInput}
          updateFriendAttribute={this.updateFriendAttribute}
        />
        <PayButton
          paymentMethodPayload={this.state.paymentMethodPayload}
          handleFormSubmit={this.postOrder}
          paymentMethodForm={
            <BraintreeForm
              setDropinState={this.setDropinState}
              setPaymentMethodPayload={this.setPaymentMethodPayload}
              getDropinState={this.getDropinState}
            />
          }
        />
			</div>
    );
  }
}

export default App;
