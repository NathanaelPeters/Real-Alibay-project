import React, { Component } from "react";
import Frontpage from "./Frontpage.jsx";
import { BrowserRouter, Route } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AddItem from "./AddItem.jsx";
import Profile from "./Profile.jsx";
import Orders from "./Orders.jsx";
import Mycart from "./Mycart.jsx";
import Body from "./Body.jsx";
import { initialItems, initialProfile, initialCart } from "./Data.js";
import Search from "./Search.jsx";
import { Pay } from './Payment.jsx';
import Details from "./details.jsx";
import LoginSignup from "./LoginSignupForm.jsx"

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
  renderCart = () => {
    return (
      <div>
        {this.props.cart.map(item => (
          <Mycart
            cost={item.price}
            profileID={item.profileID}
            imageLocation={item.image}
            description={item.description}
          />
        ))}
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
          />
        }
        })
        }
      </div>
    );
  };
  renderAllItems = () => {
    return (
      <div>
                <Search />
        {this.props.items.map(item => (
          <Body
            cost={item.price}
            profileID={item.profileID}
            itemID={item.itemID}
            imageLocation={item.image}
            description={item.description}
            item={item}
            username={this.state.username}
            // cartTotal={cart.total}
            // cartID={cart.id}
            // cartItem={cart.item}
          />
          ))}
          </div>
        );
      };
    render = () => {
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
        <Route exact={true} path="/Mycart" render={this.renderCart} />
        <Route exact={true} path="/LoginSignup" render={() => <LoginSignup />} />
        <Route
          path="/Orders"
          render={() => <Orders username={this.state.username} />}
        />
        <Route exact={true} path="/" render={this.renderAllItems} />
        <Route
          exact={true}
          path="/Details/:id"
          render={routerData => (<Details itemID={routerData.match.params.id} />
          )}
        />
        <Route exact={true} path="/Payment" redner={() => <Pay username={this.state.username} />} />
      </BrowserRouter>
    );
  };
}


let mapStateToProps = state => {
  console.log(state);
  return { login: state.loggedIn, items: state.items, cart: state.cart };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;