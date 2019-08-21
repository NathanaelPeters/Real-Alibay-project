import { connect } from "react-redux";
import React, { Component } from "react";
import initialItems from "./Data.js";
import { Link } from "react-router-dom";

class UnconnectedSearchResults extends Component {
  handleCartButton = item => {
    return () => {
      item = {
        username: this.props.username,
        ...item
      };
      this.props.dispatch({
        type: "additemcart",
        item: item
      });
    };
  };
  render = () => {
    let results = this.props.items
      .filter(item => {
        return (
          !this.props.group ||
          (item.group === this.props.group &&
            this.props.categories.length === 0) ||
          (item.group === this.props.group &&
            this.props.categories.includes(item.category))
        );
      })
      .filter(item => {
        return (
          item.description
            .toLowerCase()
            .includes(this.props.query.toLowerCase()) &&
          item.price >= this.props.minPrice &&
          item.price <= this.props.maxPrice
        );
      });
    return (
      <div>
        {results.map(item => {
          return (
            <div className="card center" key={item.id}>
              <img
                className="imagelocation"
                height="82px"
                width="61 px"
                src={item.image}
              />
              <div>
                <div>{item.itemName}</div>
                <div>{item.cost}</div>
                <div className="button">
                  <Link className="button1" to={"/Details/" + item.id}>
                    More Details
                  </Link>
                  <button
                    className="button"
                    onClick={this.handleCartButton(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    items: st.items,
    minPrice: st.min,
    maxPrice: st.max,
    query: st.searchQuery,
    categories: st.categories,
    group: st.group,
    username: st.username
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
