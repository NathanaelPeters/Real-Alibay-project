import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
import { Link } from "react-router-dom";
class Mycart extends Component {
  render() {
    return (
      <div>
        <div>Your cart</div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Mycart;
