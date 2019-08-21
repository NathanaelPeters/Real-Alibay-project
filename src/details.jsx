import React, { Component } from "react";
import "./main.css";
import { initialItems } from "./Data.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedDetails extends Component {
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
  render() {
    let {
      price,
      image,
      description,
      sellerId,
      quantity,
      itemName
    } = this.props.item;
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <div className="details">
          <div className="TitleImage">
            <h2>{itemName}</h2>
            <div className="priced">
              <h3>{"$" + price}</h3>
            </div>
          </div>
          <div className="detailproduct">
            <img className="image" height="410px" width="305px" src={image} />
          </div>
          <br />
          <div className="descButtons">
            <div className="descriptiond">{description}</div>

            <div className="quantityd">In stock: {quantity}</div>
            <button className="Add" onClick={this.handleCartButton}>
              Add to Cart
              <i class="fas fa-cart-plus" />
            </button>
            <Link className="button6" to={"/SellerProfile/" + sellerId}>
              See the Seller!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    items: st.items
  };
};

let Details = connect(mapStateToProps)(UnconnectedDetails);
export default Details;
