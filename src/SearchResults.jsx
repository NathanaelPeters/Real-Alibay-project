import { connect } from "react-redux";
import React, { Component } from "react";
import items from "./data.js";
class UnconnectedSearchResults extends Component {
  render = () => {
    let results = items
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
          item.name.includes(this.props.query) &&
          item.price >= this.props.minPrice &&
          item.price <= this.props.maxPrice
        );
      });
    return (
      <div>
        {results.map(item => {
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              {item.description}
            </div>
          );
        })}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    minPrice: st.min,
    maxPrice: st.max,
    query: st.searchQuery,
    categories: st.categories,
    group: st.group
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
