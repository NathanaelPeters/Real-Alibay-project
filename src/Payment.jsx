import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
class Pay extends Component {
    onToken = (token) => {
      fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
      }).then(response => {
        response.json().then(data => {
          alert(`We are in business, ${data.email}`);
        });
      });
    }
   
    // ...
   
    render() {
      return (
        // ...
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_0AvT91UxEppE8b6zXfLdRQkQ00xKBrlaZ9"
        />
      )
    }
  }
  export default Pay;