import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
import { Link } from "react-router-dom";
import { Pay } from './payment.jsx'
class Mycart extends Component {
  render() {
    return (
      <div>
        <div>Your cart</div>
        <div className="cart">
          <div className="product">
          <img className="image"
            height="82px"
            width="61 px"
            src={this.props.imageLocation}
          />
          <div>
            <div className="description">{this.props.description}</div>
            <div className="price">{this.props.cost}</div>
            <div className="quantity">{this.props.quantity}</div>
            <Link className="checkout" to={"/payment/" + this.props.payment}></Link>
            <button className="remove" onClick={this.props.removeItem}>Remove</button>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
export default Mycart;

