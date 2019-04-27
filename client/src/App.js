import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';
import PayButton from './components/PayButton';
import PayPalButton from './components/PayPalButton';
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

    this.encodeQueryData = this.encodeQueryData.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.postToPayPal = this.postToPayPal.bind(this);
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

  encodeQueryData(data) {
    return '?' + Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }

  postToPayPal() {

    var email = process.env.REACT_APP_BUSINESS_EMAIL;
    var orderPayload = {
			cmd: '_cart',
			upload: '1',
			business: email,
			currency_code: 'USD',
			item_name_1: 'fhl_ticket',
			amount_1: 25.01,
			item_name_2: 'fhl_raffle_ticket',
			amount_2: 40.01,
			item_name_3: 'fhl_beer',
			amount_3: 13.01
    };

    fetch('https://www.paypal.com/cgi-bin/webscr', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/html,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': '',
        'Host': 'www.paypal.com',
      },
      body: this.encodeQueryData(orderPayload),
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

  postOrder() {
    var orderPayload = {
      tickets: this.state.order.tickets,
      raffle_tickets: this.state.order.raffle_tickets,
      email: "test_new_email@gmail.com",
      beers: this.state.friends,
      payment_method_nonce: this.state.paymentMethodPayload["nonce"],
    };
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
              getDropinState={this.getDropinState}
              updateState={this.updateState}
            />
          }
        />
    }

    payButtonOrThankYou = <PayPalButton
      action={this.postToPayPal}
      />

    return (
			<div className="col-md-6">
        <h1>Faith, Hops, Love</h1>
        <FormContainer
          friends={this.state.friends}
          order={this.state.order}
          getOrderData={this.getOrderData}
          updateState={this.updateState}
        />
        { payButtonOrThankYou }
			</div>
    );
  }
}

export default App;
