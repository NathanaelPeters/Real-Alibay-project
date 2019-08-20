import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
import { Link } from "react-router-dom";
import { Pay } from "./payment.jsx";
class CartItem extends Component {
  removeItem = () => {
    return;
  };
  render() {
    let { price, description, image } = this.props.item;

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
              <button className="remove" onClick={this.props.removeItem}>
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
export default CartItem;
