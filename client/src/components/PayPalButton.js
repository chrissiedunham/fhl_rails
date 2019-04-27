import React, { Component } from 'react';
import Button from '../components/Button';

class PayPalButton extends Component {
  constructor(props) {
    super(props);

    this.postToPayPal = this.postToPayPal.bind(this);
  }

  encodeQueryData(data) {
    return Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }


  postToPayPal() {
    var email = process.env.REACT_APP_BUSINESS_EMAIL;
    var orderPayload = {
			cmd: '_cart',
			upload: '1',
			business: this.props.email,
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
    }).then(response => { return response.txt();})
      .then(responseData => { return responseData;})
      .then(orderResponse => {
        alert(orderResponse);
        this.setState({ orderResponse });
      })
      .catch(err => {
        alert("fetch error" + err);
      });
  }

  render() {
    return <input
      id={"pay_button"}
      type={'image'}
      src={"http://www.paypal.com/en_US/i/btn/x-click-but01.gif" }
		  onChange={this.postToPayPal}
			onClick={this.postToPayPal}
      name={"submit"}
      alt={"Make payments with PayPal - it's fast, free and secure!"}

    />
  }
}

export default PayPalButton;
