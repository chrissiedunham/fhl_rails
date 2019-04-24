import React, {Component} from 'react';
import braintree from 'braintree-web-drop-in';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import AllFriendInfo from '../components/AllFriendInfo';
import Button from '../components/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        tickets: '',
        raffle_tickets: '',
        beers: '',
      },
      friends: [],
      ticketOptions: ["1 Ticket ($25)", "2 Tickets ($40)", "3 Tickets ($60)", "4 Tickets ($80)"],
      dropinInstance: {},
      paymentMethodPayload: {},
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleBeerChange = this.handleBeerChange.bind(this);
    this.updateFriendAttribute = this.updateFriendAttribute.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.initPaymentForm = this.initPaymentForm.bind(this);
    this.doRequestPaymentMethod = this.doRequestPaymentMethod.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */
  componentDidMount() {
    this.initPaymentForm();
  }

  postOrder() {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          tickets: this.state.order.tickets,
          raffle_tickets: this.state.order.raffle_tickets,
          email: "test_new_email@gmail.com",
          payment_info: this.state.paymentMethodPayload,
        }
      })
    }
    )
  }

  handleFormSubmit(e) {
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

  updateFriendAttribute(e) {
    let value = e.target.value;
    let name = e.target.name;
    let friend_index = parseInt(name.match(/\d+/g));
    let friend_attribute = name.match(/[a-z]+/g)[1];

    this.setState(prevState => {
      return {
        friends: prevState.friends.map((friend,i) => {
          if (i === friend_index) {
            friend[friend_attribute] = value;
            return friend;
          }
          return friend;
        }
        )
      }
    }, () => console.log(this.state.friends)
    )
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => {
      return {
        order : {
          ...prevState.order, [name]: value
        }
      }
    }, () => console.log(this.state.order)
    )
  }

  handleBeerChange(e) {
    e.persist();
    this.handleInput(e);
    this.setState( prevState => {
      var numFriends = e.target.value;
      var newFriends = [];
      for (var i=0; i < numFriends; i++) {
        newFriends.push({ "name": '', "email": ''});
      }
      return {
        friends: newFriends
      }
    }, () => console.log("order: " + this.state.order, "friends: " + this.state.friends)
    )
  }

  initPaymentForm () {
    braintree.create({
      authorization: 'sandbox_s9f68g98_hytcxkmr57rcqr2b',
      container: '#dropin-container'
    }).then(dropinInstance => {
      console.log("drop in instance:" );
      console.log(dropinInstance );
      this.setState({ dropinInstance });
      console.log(this.state);
    }).catch(err => console.error(err));
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
      <form className="container-fluid" >

        <Select type={'number'}
          title= {'Tickets'}
          name= {'tickets'}
          value={this.state.order.tickets}
          placeholder = {'Quantity'}
          handleChange = {this.handleInput}
          options = {this.state.ticketOptions}
        />
        <Input type={'number'}
          title= {'Raffle Tickets'}
          name= {'raffle_tickets'}
          value={this.state.order.raffle_tickets}
          placeholder = {'Quantity'}
          handleChange = {this.handleInput}
        />
        <Input type={'number'}
          title= {'Buy a beer for a friend!'}
          name= {'beers'}
          value={this.state.order.beers}
          placeholder = {'Quantity'}
          handleChange = {this.handleBeerChange}
        />
        <AllFriendInfo
          numBeers = {this.state.order.beers}
          friends = {this.state.friends}
          updateFriendAttribute = {this.updateFriendAttribute}
        />
        <div id="dropin-container"></div>
        <Button
          action={this.handleFormSubmit}
          style={buttonStyle}

          id={"submit-button"}
          type={"primary"}
          title={"Submit"}
        />{ " " }
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
