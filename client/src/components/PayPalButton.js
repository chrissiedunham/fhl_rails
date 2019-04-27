import React, { Component } from 'react';
import Button from '../components/Button';

class PayPalButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input
      id={"pay_button"}
      type={'image'}
      src={"http://www.paypal.com/en_US/i/btn/x-click-but01.gif" }
		  onChange={this.props.action}
			onClick={this.props.action}
      name={"submit"}
      alt={"Make payments with PayPal - it's fast, free and secure!"}

    />
  }
}

export default PayPalButton;
