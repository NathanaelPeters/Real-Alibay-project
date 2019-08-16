import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";

class Body extends Component {
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
            <p>
              <Link className="button2" to={"/AddtoCart" + this.props.cart}>
                Add to cart
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
}
export default Body;
