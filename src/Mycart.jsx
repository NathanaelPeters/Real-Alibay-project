import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
import { Link } from "react-router-dom";
import { Pay } from "./payment.jsx";
class Mycart extends Component {
  removeItem() {
    let item = {
      username: this.props.username,
      ...this.props.item
    };
    console.log("item", item);
    this.props.dispatch({ type: "remove-item", item: item });
  }
  render() {
    return (
      <div>
        <div>Your cart</div>
        <div className="cart">
          <div className="product">
            <img
              className="image"
              height="82px"
              width="61 px"
              src={this.props.imageLocation}
            />
            <div>
              <div className="description">{this.props.description}</div>
              <div className="price">{this.props.cost}</div>
              <div className="quantity">{this.props.quantity}</div>
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
export default Mycart;
