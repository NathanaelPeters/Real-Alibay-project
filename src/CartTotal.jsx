import React, { Component } from "react";
import CartItem from "./CartItem.jsx";
import Pay from "./Payment.jsx";
export default class CartTotal extends Component {
  constructor(props) {
    super(props);
    let firstTotal = 0;
    console.log("cartprops", this.props.cart);
    this.props.cart.forEach(item => {
      firstTotal += item.price;
    });
    this.state = {
      total: firstTotal
    };
  }

  updateTotal = price => {
    this.setState({ total: this.state.total + price });
  };
  componentDidUpdate = prevProps => {
    if (
      prevProps.cart.length !== this.props.cart.length &&
      this.props.cart.length === 0
    ) {
      this.setState({ total: 0 });
    }
  };

  render() {
    let displayTotal =
      this.state.total === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <p className="details">
          {" "}
          Total: {"$" + this.state.total}{" "}
          <Pay total={this.state.total} className="checkout" />
        </p>
      );
    return (
      <div>
        {this.props.cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            itemID={item.id}
            updateTotal={this.updateTotal}
          />
        ))}
        <div>{displayTotal}</div>
      </div>
    );
  }
}
