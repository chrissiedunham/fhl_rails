import React, { Component } from 'react';
import Button from '../components/Button';

class PayButton extends Component {
  render() {
    const paymentMethod = this.props.paymentMethodPayload["nonce"];
    if (paymentMethod) {
      return <div>
        <p>Thanks, we've verified and stored your payment info! { paymentMethod }</p>
          <Button
            action={this.props.handleFormSubmit}
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
