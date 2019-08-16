import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { connect } from "react-redux";
import store from "./store.js";

class UnconnectedBody extends Component {
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
    console.log(this.props);
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
            <Link className="button1" to={"/profile"}>
              More Details
            </Link>
            <button className="button" onClick={this.handleCartButton}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  };
}

let Body = connect()(UnconnectedBody);
export default Body;
