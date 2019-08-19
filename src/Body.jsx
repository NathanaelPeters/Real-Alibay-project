import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { connect } from "react-redux";
import store from "./store.js";
import { Details } from "./details.jsx"

class UnconnectedBody extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  handleMinimumPrice = evt => {
    let price = parseInt(evt.target.value);
    if (isNaN(price)) price = 0;
    this.props.dispatch({ type: "minimum-price", price: price });
  };
  handleMaximumPrice = evt => {
    let price = parseInt(evt.target.value);
    if (isNaN(price)) price = 0;
    this.props.dispatch({ type: "maximum-price", price: price });
  };

  handleSelectGroup = event => {
    console.log(event.target.value);
    this.props.dispatch({ type: "select-group", value: event.target.value });
  };
  handleSelectCategory = () => {
    console.log("checked", event.target.checked);
    console.log(this.props.items, event.target.value);
    this.props.dispatch({
      type: "select-category",
      category: event.target.value,
      include: event.target.checked
    });
  };
  handleCartButton = () => {
    let item = {
      username: this.props.username,
      ...this.props.item
    };
    this.props.dispatch({
      type: "additemcart",
      item: item
    });
  };
  render = () => {
    return (
      <div className="card center ">
        <img
          className="imagelocation"
          height="82px"
          width="61 px"
          src={this.props.imageLocation}
        />
        <div>
          <div>{this.props.description}</div>
          <div>{this.props.cost}</div>
          <div className="button">
            <Link className="button1" to={"/Details/" + this.props.item.id}>
              More Details
            </Link>
            <p className="line">
            <button className="button2" onClick={this.handleCartButton}>
              Add to cart
            </button>
          </p>
          </div>
        </div>
      </div>
    );
  };
}

let Body = connect()(UnconnectedBody);
export default Body;
