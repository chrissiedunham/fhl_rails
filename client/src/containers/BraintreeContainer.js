import React, {Component} from 'react';

class BraintreeContainer extends Component {
  constructor(props) {
    super(props);
  }

  /* This life cycle hook gets executed when the component mounts */
  componentDidMount() {
    this.props.initPaymentForm();
  }


  render() {
    return (
      <div id="dropin-container"></div>
    );
  }
}

export default BraintreeContainer;
