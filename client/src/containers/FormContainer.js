import React, {Component} from 'react';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import AllFriendInfo from '../components/AllFriendInfo';
import Button from '../components/Button';
import BraintreeContainer from './BraintreeContainer';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketOptions: [
        { value: "1", label: "1 Ticket ($25)"},
        { value: "2", label: "2 Tickets ($40)"},
        { value: "3", label: "3 Tickets ($60)"},
      ],
      paymentMethodPayload: {},
    }
    this.postOrder = this.postOrder.bind(this);
    this.doRequestPaymentMethod = this.doRequestPaymentMethod.bind(this);
  }


  postOrder() {
    var orderPayload = {
      tickets: this.props.order.tickets,
      raffle_tickets: this.props.order.raffle_tickets,
      email: "test_new_email@gmail.com",
      beers: this.props.friends,
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
    }
    )
  }

  doRequestPaymentMethod (e) {
    e.preventDefault();

    console.log("requesting...");
    this.state.dropinInstance
      .requestPaymentMethod()
      .then(paymentMethodPayload => {
        console.log(paymentMethodPayload);
        this.setState({ paymentMethodPayload });
        this.postOrder();
        console.log("Successfully posted order!");
      })
      .catch(paymentMethodError => {
        console.error(paymentMethodError);
      });
  }

  render() {
    return (
      <div className="dropin-wrapper">
        <h3> { this.props.testObj.testVal } </h3>
        <form className="container-fluid" >
          <Select type={'number'}
            title= {'Tickets'}
            name= {'tickets'}
            value={this.props.order.tickets}
            placeholder = {'Quantity'}
            handleChange = {this.props.handleInput}
            options = {this.state.ticketOptions}
          />
          <Input type={'number'}
            title= {'Raffle Tickets'}
            name= {'raffle_tickets'}
            value={this.props.order.raffle_tickets}
            placeholder = {'Quantity'}
            handleChange = {this.props.handleInput}
          />
          <Input type={'number'}
            title= {'Buy a beer for a friend!'}
            name= {'beers'}
            value={this.props.order.beers}
            placeholder = {'Quantity'}
            handleChange = {this.props.handleBeerChange}
          />
          <AllFriendInfo
            numBeers = {this.props.order.beers}
            friends = {this.props.friends}
            updateFriendAttribute = {this.props.updateFriendAttribute}
          />
          <BraintreeContainer
            initPaymentForm={this.props.initPaymentForm}
          />
          <Button
            action={this.props.handleFormSubmit}
            style={buttonStyle}

            id={"submit-button"}
            type={"primary"}
            title={"Submit"}
          />{ " " }
        </form>
      </div>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
