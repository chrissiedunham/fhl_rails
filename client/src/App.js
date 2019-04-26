import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import BraintreeForm from './containers/BraintreeForm';
import braintree from 'braintree-web-drop-in';

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
    }

    this.handleBeerChange = this.handleBeerChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBraintreeFormSubmit = this.handleBraintreeFormSubmit.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
    this.initBraintreePaymentForm = this.initBraintreePaymentForm.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.doRequestPaymentMethod = this.doRequestPaymentMethod.bind(this);
  }

  doRequestPaymentMethod (e) {
    e.preventDefault();

    console.log("requesting...");
    this.state.dropinInstance
      .requestPaymentMethod()
      .then(paymentMethodPayload => {
        console.log(paymentMethodPayload);
        this.setState({ paymentMethodPayload });
        this.postOrder();
        console.log("Successfully posted order!");
      })
      .catch(paymentMethodError => {
        console.error(paymentMethodError);
      });
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

  initBraintreePaymentForm () {
    braintree.create({
      authorization: 'sandbox_s9f68g98_hytcxkmr57rcqr2b',
      container: '#dropin-container',
      locale: "en_US",
      paymentOptionPriority: ["paypal", "card", "paypalCredit", "applePay"],
      card: {
        cardholderName: {
          required: true,
        },
      },
      applePay: {
        displayName: "Super gr8 Shop",
        paymentRequest: {
          label: "Localized Name",
          total: this.state.transactionAmount,
        },
      },
      dataCollector: {
        kount: true,
      },
    }).then(dropinInstance => {
      this.setState({ dropinInstance });
    }).catch(err => console.error(err));
  }

  handleBraintreeFormSubmit(e) {
    e.preventDefault();

    console.log("requesting...");
    this.state.dropinInstance
      .requestPaymentMethod()
      .then(paymentMethodPayload => {
        console.log(paymentMethodPayload);
        this.setState({ paymentMethodPayload });
        this.postOrder();
        console.log("Successfully posted order!");
      })
      .catch(paymentMethodError => {
        console.error(paymentMethodError);
      });
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
    }
    )
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
          handleFormSubmit={this.postOrder}
          updateFriendAttribute={this.updateFriendAttribute}
          paymentForm= {<BraintreeForm initPaymentForm={this.initBraintreePaymentForm} />}
        />
			</div>
    );
  }
}

export default App;
