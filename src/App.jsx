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
<<<<<<< HEAD
=======
import SearchResults from "./SearchResults.jsx";
import SellerProfile from "./SellerProfile.jsx";
>>>>>>> 23c9739178621b490d90085c385e12fb281df6f6
import { Pay } from "./Payment.jsx";
import Details from "./details.jsx";
import LoginSignup from "./LoginSignupForm.jsx";

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
  searchResults = () => {
    return (
      <div>
        <Search />
        <SearchResults />
      </div>
    );
  };
  renderDetails = routerData => {
    let itemID = routerData.match.params.id;
    return (
      <div>
        {this.props.items.map(item => {
          if (itemID === item.id) {
            <Details
              cost={item.price}
              itemID={item.id}
              imageLocation={item.image}
              description={item.description}
            />;
          }
        })}
      </div>
    );
  };
  renderCart = () => {
    return (
      <div>
<<<<<<< HEAD
        <Search />
        {this.props.items.map(item => (
          <Body
=======
        {this.props.cart.map(item => (
          <Mycart
>>>>>>> 23c9739178621b490d90085c385e12fb281df6f6
            cost={item.price}
            profileID={item.profileID}
            itemID={item.itemID}
            imageLocation={item.image}
            description={item.description}
          />
        ))}
      </div>
    );
  };

  render = () => {
<<<<<<< HEAD
=======
    console.log(this.props.sellers);
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

>>>>>>> 23c9739178621b490d90085c385e12fb281df6f6
    return (
      <BrowserRouter>
        <Frontpage username={this.state.username} />
        <Route
          path="/profile"
          render={() => <Profile username={this.state.username} />}
        />
        <Route
          path="/AddItem"
          render={() => <AddItem username={this.state.username} />}
        />
        <Route exact={true} path="/Mycart" render={this.renderCart} />
        <Route
          path="/Orders"
          render={() => <Orders username={this.state.username} />}
        />
<<<<<<< HEAD
        <Route exact={true} path="/" render={this.renderAllItems} />
        <Route exact={true} path="/Mycart" render={this.renderCart} />
        <Route
          exact={true}
          path="/Details/:id"
          render={routerData => <Details itemID={routerData.match.params.id} />}
        />
        <Route
          exact={true}
          path="/Payment"
          render={() => <Pay username={this.state.username} />}
        />
        <Route path="/LoginSignup" render={() => <LoginSignup />} />
=======
        <Route
          path="/SellerProfile/:id"
          render={routerData => (
            <SellerProfile sellerID={routerData.match.params.id} />
          )}
        />
        <Route exact={true} path="/myCart" render={this.renderCart} />
        <Route exact={true} path="/" render={this.searchResults} />
        exact={true}
        path="/Mycart" render={this.renderCart}
        />
        <Route
          exact={true}
          path="/Details/:id"
          render={routerData => <Details itemID={routerData.match.params.id} />}
        />
        <Route
          exact={true}
          path="/Payment"
          redner={() => <Pay username={this.state.username} />}
        />
>>>>>>> 23c9739178621b490d90085c385e12fb281df6f6
      </BrowserRouter>
    );
  };
}
let mapStateToProps = state => {
  return {
    login: state.loggedIn,
    items: state.items,
    cart: state.cart,
    sellers: state.sellers
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
