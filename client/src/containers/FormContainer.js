import React, {Component} from 'react';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import AllFriendInfo from '../components/AllFriendInfo';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketOptions: [
        { value: "1", label: "1 Ticket ($25)"},
        { value: "2", label: "2 Tickets ($40)"},
        { value: "3", label: "3 Tickets ($60)"},
      ],
    }
  }

  render() {
    return (
      <div className="dropin-wrapper">
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
        </form>
      </div>
    );
  }
}

export default FormContainer;
