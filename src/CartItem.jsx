import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.item.price,
      qty: 1
    };
  }

  handleSelectChange = event => {
    let oldPrice = this.state.price;
    let newPrice = this.props.item.price * event.target.value;
    let priceDiff = newPrice - oldPrice;
    console.log("select event", event.target.value);
    this.setState(
      {
        price: this.props.item.price * event.target.value,
        qty: event.target.value
      },
      () => {
        this.props.updateTotal(priceDiff);
      }
    );
  };
  removeItem = () => {
    console.log("cart item", this.props.itemID);
    this.props.dispatch({ type: "remove-item", item: this.props.itemID });
    this.props.updateTotal(-this.state.price);
    return;
  };
  render() {
    let { price, description, image, id } = this.props.item;

    return (
      <div>
        <div className="cart">
          <div className="product">
            <img className="image" height="82px" width="61 px" src={image} />
            <div>
              <div className="description">{description}</div>
              <div className="price">{"$" + this.state.price}</div>
              <button className="remove" onClick={this.removeItem}>
                Remove
              </button>
              <select onChange={this.handleSelectChange} className="dropdown">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(CartItem);
