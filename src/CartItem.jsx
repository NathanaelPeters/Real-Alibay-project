import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.item.price,
      qty: 1,
      total: this.props.item.price
    };
  }
  handleminus = event => {
    if (this.state.qty < 1) this.state.qty = 0;
    this.setState({
      qty: this.state.qty - 1,
      total: this.props.item.price * this.state.qty
    });
    console.log(this.state.qty);
    this.props.updateTotal(this.state.total);
  };
  handleplus = event => {
    this.setState({
      qty: this.state.qty + 1,
      total: this.props.item.price * this.state.qty
    });
    this.props.updateTotal(this.state.total);
    console.log(this.state);
  };
  removeItem = () => {
    console.log("cart item", this.props.itemID);
    this.props.dispatch({ type: "remove-item", item: this.props.itemID });
    this.props.updateTotal(-this.state.total);
    return;
  };
  render() {
    let { price, description, image, id, itemName } = this.props.item;
    return (
      <div>
        <div class="item">
          <div class="buttons">
            <span class="delete-btn" />
          </div>

          <div class="imagecart">
            <img src={image} alt="" height="100px" />
          </div>

          <div class="descriptioncart">
            <div>{description}</div>
          </div>

          <div class="quantitycart">
            <button
              class="plus-btn"
              type="button"
              name="button"
              onClick={this.handleplus}
            >
              <img src="plus.svg" alt="" />
            </button>
            <input type="text" name="name" value={this.state.qty} />
            <button
              class="minus-btn"
              type="button"
              name="button"
              onClick={this.handleminus}
            >
              <img src="minus.svg" alt="" />
            </button>
          </div>
          <div class="total-price">${this.state.price}</div>
          <button class="btn" onClick={this.removeItem} height="200px">
            <link
              class="btn1"
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <i class="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(CartItem);
