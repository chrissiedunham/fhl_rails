import React, {Component} from 'react';
import braintree from 'braintree-web-drop-in';
import Button from '../components/Button';

class BraintreeGetPaymentMethodForm extends Component {
  constructor(props) {
    super(props);

    this.initBraintreePaymentForm = this.initBraintreePaymentForm.bind(this);
    this.doRequestPaymentMethod = this.doRequestPaymentMethod.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */
  componentDidMount() {
    this.initBraintreePaymentForm();
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
        },
      },
      dataCollector: {
        kount: true,
      },
    }).then(dropinInstance => {
      this.props.updateState(function(prevState) {
        return { dropinInstance };
      })
    }).catch(err => console.error(err));
  }

  doRequestPaymentMethod (e) {
    e.preventDefault();

    this.props.getDropinState()
      .requestPaymentMethod()
      .then(paymentMethodPayload => {
        this.props.updateState(function(prevState) {
          return { paymentMethodPayload };
        })
        console.log("Successfully got payment method!");
      })
      .catch(paymentMethodError => {
        console.error(paymentMethodError);
      });
  }

  render() {
    return (
      <div>
        <div id="dropin-container"></div>
        <Button
          action={this.doRequestPaymentMethod}

          id={"submit-button"}
          type={"primary"}
          title={"Verify Payment Method"}
        />{ " " }
      </div>
    );
  }
}

export default BraintreeGetPaymentMethodForm;
