import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
class Pay extends Component {
  onToken = token => {
    console.log(token);
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`Thank you for your purchase!`);
        this.props.dispatch({ type: "empty-cart" });
        this.props.routerData.push("/");
      });
    });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        name="NRJ"
        description={"Your total is $" + this.props.total}
        token={this.onToken}
        stripeKey="pk_test_0AvT91UxEppE8b6zXfLdRQkQ00xKBrlaZ9"
      />
    );
  }
}
export default connect()(Pay);
