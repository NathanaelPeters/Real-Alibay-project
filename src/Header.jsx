import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile.jsx";
import CartItem from "./CartItem.jsx";
import Orders from "./Orders.jsx";
import AddItem from "./AddItem.jsx";
import LoginSignup from "./LoginSignupForm.jsx";
import Search from "./Search.jsx";

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
    return <Redirect to="/" />;
  };

  render = () => {
    return (
      <div>
        {this.props.loggedIn === false ? (
          <div className="header">
            <div>
              <Link to="/Shop">
                <img src="../uploads/decodelogo.png" height="100px" />
              </Link>
            </div>
            <Link to="/LoginSignup" className="headerforms">
              Login/Signup
            </Link>
          </div>
        ) : (
          <div>
            <div className="header">
              <div>
                <Link to="/Shop">
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
                <Link to="/CartItem" className="headerforms">
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
          </div>
        )}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Header = connect(mapStateToProps)(UnconnectedHeader);
export default Header;
