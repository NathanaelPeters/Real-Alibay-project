import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
import { Link } from "react-router-dom";
import { Pay } from "./payment.jsx";
import { connect } from "react-redux";

class CartItem extends Component {
  removeItem = () => {
    console.log("cart item", this.props.itemID);
    this.props.dispatch({ type: "remove-item", item: this.props.itemID });
    return;
  };
  render() {
    let { price, description, image, id } = this.props.item;

    return (
      <div>
        <div className="cart">
          <div className="product">
            <img className="image" height="82px" width="61 px" src={image} />
            <div>
              <div className="description">{description}</div>
              <div className="price">{"$" + price}</div>
              <Link
                className="checkout"
                to={"/payment/" + this.props.payment}
              />
              <button className="remove" onClick={this.removeItem}>
                Remove
              </button>
              <select className="dropdown">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(CartItem);
