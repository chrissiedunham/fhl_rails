import React, { Component } from 'react';
import Button from '../components/Button';

class PayButton extends Component {
  constructor(props) {
    super(props);

    this.postOrder = this.postOrder.bind(this);
  }

  postOrder() {
    var orderPayload = {
      tickets: this.props.tickets,
      raffle_tickets: this.props.raffle_tickets,
      email: this.props.email,
      beers: this.props.friends,
      payment_method_nonce: this.props.paymentMethodPayload["nonce"],
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
    const paymentMethod = this.props.paymentMethodPayload["nonce"];
    if (paymentMethod) {
      return <div>
        <p>Thanks, we've verified and stored your payment info! { paymentMethod }</p>
          <Button
            action={this.postOrder}
            style={buttonStyle}

            id={"submit-button"}
            type={"primary"}
            title={"Pay with saved credit card"}
          />
        </div>
    } else {
      return this.props.paymentMethodForm
    }
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default PayButton;
