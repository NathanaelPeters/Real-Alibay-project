import React, { Component } from "react";
import Frontpage from "./Frontpage.jsx";
import {
  BrowserRouter,
  Route
} from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AddItem from "./AddItem.jsx";
import Profile from "./Profile.jsx";
import Orders from "./Orders.jsx";
import Mycart from "./Mycart.jsx";
import Body from "./Body.jsx";
import { initialItems, initialProfile, initialCart } from "./Data.js";
import Search from "./Search.jsx";

class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined,
      setusername: "",
      setpwd: "",
      signuptoggle: false,
      loggedIn: false
    };
  }
  renderAddtoCart = routerData => {
    let cartID = routerData.match.params.cid;
    let candidates = initialCart.filter(cart => {
      return cart.id === cartID;
    });
    return <Mycart cart={candidates[0]} />;
  };
  renderAllItems = () => {
    return (
      <div>
        {this.props.items.map(item => (
          <Body
            cost={item.price}
            profileID={item.profileID}
            imageLocation={item.image}
            description={item.description}
            // cartTotal={cart.total}
            // cartID={cart.id}
            // cartItem={cart.item}
          />
        ))}
      </div>
    );
  };
  usernameChange = evt => {
    console.log("login username:", evt.target.value);
    this.setState({ usernameInput: evt.target.value });
  };
  passwordChange = evt => {
    console.log("login pwd:", evt.target.value);
    this.setState({ passwordInput: evt.target.value });
  };
  submitloginHandler = async evt => {
    evt.preventDefault();
    console.log("username", this.state.usernameInput);
    console.log("password", this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (!body.success) {
      alert("login failed");
      return;
    }
    this.props.dispatch({
      type: "login-success"
    });
    this.setState({ username: name });
  };
  usernameSet = evt => {
    console.log("set username:", evt.target.value, this.state);
    this.setState({ setusername: evt.target.value });
  };
  passwordSet = evt => {
    console.log("set password:", evt.target.value);
    this.setState({ setpwd: evt.target.value });
  };
  submitsignupHandler = async evt => {
    evt.preventDefault();
    console.log("set username", this.state.setusername);
    console.log("set password", this.state.setpwd);
    let username = this.state.setusername;
    let password = this.state.setpwd;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/signup response", body);
    body = JSON.parse(body);
    if (!body.success) {
      alert(textres.error);
    }
    if (body.success) {
      let response = await fetch("/login", {
        method: "POST",
        body: data,
        credentials: "include"
      });
      let responseBod = await response.text();
      console.log("responseBody from login", responseBod);
      let body = JSON.parse(responseBod);
      console.log("parsed body", body);
      this.props.dispatch({
        type: "login-success"
      });
      this.setState({ username: username });
    }
  };
  signuptoggle = () => {
    this.setState({ signuptoggle: !this.state.signuptoggle });
  };
  render = () => {
    console.log("username:", this.state.username);
    if (this.props.login === false) {
      if (this.state.signuptoggle === false) {
        return (
          <div className="login-page">
            <div className="form">
              <form className="register-form">
                <input
                  type="text"
                  onChange={this.usernameSet}
                  placeholder="Create username"
                />
                <input
                  type="text"
                  onChange={this.passwordSet}
                  placeholder="Create password"
                />
                <button onClick={this.submitsignupHandler}>create</button>
                <p>Already registered?</p>
                <p className="message" onClick={this.signuptoggle}>
                  Sign in
                </p>
              </form>{" "}
            </div>{" "}
          </div>
        );
      }
      return (
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                type="text"
                onChange={this.usernameChange}
                placeholder="username"
              />
              <input
                type="text"
                onChange={this.passwordChange}
                placeholder="password"
              />
              <button onClick={this.submitloginHandler}>login</button>
              <p>Not registered? </p>
              <p className="message" onClick={this.signuptoggle}>
                Create an account{" "}
              </p>
            </form>
          </div>
        </div>
      );
    }
    return (
      <BrowserRouter>
        <Frontpage username={this.state.username} />{" "}
        <Route
          path="/profile"
          render={() => <Profile username={this.state.username} />}
        />
        <Route
          path="/AddItem"
          render={() => <AddItem username={this.state.username} />}
        />
        <Route
          path="/Mycart"
          render={() => <Mycart username={this.state.username} />}
        />
        <Route
          path="/Orders"
          render={() => <Orders username={this.state.username} />}
        />
        <Route exact={true} path="/" render={this.renderAllItems} />
        <Route
          exact={true}
          path="/AddtoCart/:cid"
          render={this.renderAddtoCart}
        />
      </BrowserRouter>
    );
  };
}
let mapStateToProps = state => {
  console.log(state);
  return { login: state.loggedIn, items: state.items };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;