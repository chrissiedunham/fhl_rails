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
      payment_method_nonce: this.props.paymentMethodNonce,
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
        this.props.updateState(prevState => {
          return { orderResponse };
        })
      })
      .catch(err => {
        alert("fetch error" + err);
      });
  }

  render() {
    return <div>
      <p>Thanks, we've verified and stored your payment info! { this.props.paymentMethodNonce }</p>
      <Button
        action={this.postOrder}
        style={buttonStyle}

        id={"submit-button"}
        type={"primary"}
        title={"Pay with saved credit card"}
      />
    </div>
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default PayButton;
