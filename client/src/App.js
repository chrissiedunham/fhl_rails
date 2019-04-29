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

    this.paymentButtonOrThankYou = this.paymentButtonOrThankYou.bind(this);
    this.getDropinState = this.getDropinState.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
  }

  updateState(updateFunction) {
    this.setState(prevState => {
      return updateFunction(prevState);
    }, () => console.log(this.state));
  }

  getDropinState () {
    return this.state.dropinInstance;
  }

  getOrderData() {
    return this.state.order
  }

  paymentButtonOrThankYou() {
    if (this.state.orderResponse) {
      return <h2>Thanks for your order!</h2>;
    } else if (this.state.paymentMethodPayload["nonce"]) {
      return <PayButton
        tickets={this.state.order.tickets}
        raffle_tickets={this.state.order.raffle_tickets}
        email={this.state.order.email}
        friends={this.state.friends}
        paymentMethodNonce={this.state.paymentMethodPayload["nonce"]}

        updateState={this.updateState}
      />
    } else {
      return <BraintreeGetPaymentMethodForm
        getDropinState={this.getDropinState}
        updateState={this.updateState}
      />
    }
  }

  render() {
    return (
			<div className="col-md-6">
        <h1>Faith, Hops, Love</h1>
        <FormContainer
          friends={this.state.friends}
          order={this.state.order}
          getOrderData={this.getOrderData}
          updateState={this.updateState}
        />
        { this.paymentButtonOrThankYou() }
			</div>
    );
  }
}

export default App;
