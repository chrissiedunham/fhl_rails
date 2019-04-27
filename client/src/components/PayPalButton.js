import React, { Component } from 'react';
import Button from '../components/Button';

class PayPalButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input
      type={'image'}
      src={"http://www.paypal.com/en_US/i/btn/x-click-but01.gif" }
		  onChange={this.props.action}
			onClick={this.props.action}
    />
  }
}

export default PayPalButton;
