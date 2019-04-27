import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import PayButton from './components/PayButton';
import BraintreeGetPaymentMethodForm from './containers/BraintreeGetPaymentMethodForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      order: {
        tickets: '',
        raffle_tickets: '',
        beers: '',
      },
      dropinInstance: {},
      paymentMethodPayload: {},
      orderResponse: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.setDropinState = this.setDropinState.bind(this);
    this.getDropinState = this.getDropinState.bind(this);
    this.setPaymentMethodPayload = this.setPaymentMethodPayload.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
  }

  updateState(updateFunction) {
    this.setState(prevState => {
      return updateFunction(prevState);
    }, () => console.log(this.state));
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
      .then(orderResponse => {
        alert(JSON.stringify(orderResponse));
        this.setState({ orderResponse });
      })
      .catch(err => {
        alert("fetch error" + err);
      });
  }

  getOrderData() {
    return this.state.order
  }

  render() {
    var payButtonOrThankYou;
    if (this.state.orderResponse) {
      payButtonOrThankYou = <h2>Thanks for your order!</h2>;
    } else {
      payButtonOrThankYou = <PayButton
          paymentMethodPayload={this.state.paymentMethodPayload}
          handleFormSubmit={this.postOrder}
          paymentMethodForm={
            <BraintreeGetPaymentMethodForm
              setDropinState={this.setDropinState}
              setPaymentMethodPayload={this.setPaymentMethodPayload}
              getDropinState={this.getDropinState}
            />
          }
        />
    }

    return (
			<div className="col-md-6">
        <h1>Faith, Hops, Love</h1>
        <FormContainer
          friends={this.state.friends}
          order={this.state.order}
          getOrderData={this.getOrderData}

          updateState={this.updateState}
          handleInput={this.handleInput}
          updateFriendAttribute={this.updateFriendAttribute}
        />
        { payButtonOrThankYou }
			</div>
    );
  }
}

export default App;
