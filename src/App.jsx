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
import CartItem from "./CartItem.jsx";
import Body from "./Body.jsx";
import { initialItems, initialProfile, initialCart } from "./Data.js";
import Search from "./Search.jsx";
import { Pay } from "./Payment.jsx";
import Details from "./details.jsx";
import LoginSignup from "./LoginSignupForm.jsx";
import SearchResults from "./SearchResults.jsx";

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
        <Search username={this.props.username} />
        <SearchResults username={this.props.username} />
      </div>
    );
  };

  renderDetails = routerData => {
    let itemID = routerData.match.params.id;
    let item = this.props.items.filter(item => itemID === item.id)[0];
    return <Details item={item} />;
  };

  renderCart = () => {
    return (
      <div>
        <h1>Your cart</h1>
        {this.props.cart.map(item => (
          <CartItem item={item} />
        ))}
      </div>
    );
  };
  render = () => {
    return (
      <BrowserRouter>
        <Frontpage username={this.props.username} />
        <Route
          path="/profile"
          render={() => <Profile username={this.props.username} />}
        />
        <Route
          path="/AddItem"
          render={() => <AddItem username={this.props.username} />}
        />
        <Route
          path="/Orders"
          render={() => <Orders username={this.props.username} />}
        />
        <Route
          path="/SellerProfile/:id"
          render={routerData => (
            <SellerProfile sellerID={routerData.match.params.id} />
          )}
        />
        <Route exact={true} path="/Mycart" render={this.renderCart} />
        <Route exact={true} path="/" render={this.searchResults} />
        <Route exact={true} path="/Details/:id" render={this.renderDetails} />

        <Route
          exact={true}
          path="/Payment"
          render={() => <Pay username={this.props.username} />}
        />
        <Route
          exact={true}
          path="/LoginSignup"
          render={() => <LoginSignup />}
        />
        <Route
          exact={true}
          path="/Payment"
          redner={() => <Pay username={this.state.username} />}
        />
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    login: state.loggedIn,
    items: state.items,
    cart: state.cart,
    sellers: state.sellers,
    username: state.username
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
