import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile.jsx";
import Mycart from "./Mycart.jsx";
import Orders from "./Orders.jsx";
import AddItem from "./AddItem.jsx";

class UnconnectedHeader extends Component {
  handleLogout = async event => {
    event.preventDefault();
    console.log("LOGOUT form submitted");
    let data = new FormData();
    await fetch("/logout", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let res = await fetch("/logout", { method: "POST", body: data });
    let textres = await res.text();
    textres = JSON.parse(textres);
    if (!textres.success) {
      this.props.dispatch({
        type: "logout-success"
      });
    }
  };
  mycart = () => {
    <Mycart />;
  };
  render = () => {
    return (
      <div className="header">
        <div>
          <Link to="/">
            <img src="../uploads/decodelogo.png" height="100px" />
          </Link>
        </div>
        <Link to="/addItem" className="headerforms">
          {" "}
          Sell{" "}
        </Link>
        <div>Good morning {this.props.username}! </div>
        <div>
          <Link to="/Orders" className="headerforms">
            {" "}
            Orders{" "}
          </Link>
          <Link to="/Mycart" className="headerforms">
            {" "}
            My Cart{" "}
          </Link>
          <Link to="/profile" className="headerforms">
            {" "}
            Profile{" "}
          </Link>{" "}
          <button className="headerforms" onClick={this.handleLogout}>
            {" "}
            Log out{" "}
          </button>
        </div>
      </div>
    );
  };
}
let Header = connect()(UnconnectedHeader);
export default Header;
