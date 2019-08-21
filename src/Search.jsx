import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  handleMinimumPrice = evt => {
    let price = parseInt(evt.target.value);
    if (isNaN(price)) price = 0;
    this.props.dispatch({ type: "minimum-price", price: price });
  };
  handleMaximumPrice = evt => {
    let price = parseInt(evt.target.value);
    if (isNaN(price)) price = 0;
    this.props.dispatch({ type: "maximum-price", price: price });
  };

  handleSelectGroup = event => {
    console.log(event.target.value);
    this.props.dispatch({ type: "select-group", value: event.target.value });
  };
  handleSelectCategory = () => {
    console.log("checked", event.target.checked);
    console.log(this.props.items, event.target.value);
    this.props.dispatch({
      type: "select-category",
      category: event.target.value,
      include: event.target.checked
    });
  };
  render = () => {
    let submenu = (
      <div className="checkbox">
        <div>
          <input
            type="checkbox"
            onChange={this.handleSelectCategory}
            value="top"
          />
          Tops
        </div>
        <div>
          <input
            type="checkbox"
            onChange={this.handleSelectCategory}
            value="bottom"
          />
          Bottoms
        </div>
        <div>
          <input
            type="checkbox"
            onChange={this.handleSelectCategory}
            value="accessory"
          />
          Accessories
        </div>
      </div>
    );
    return (
      <div class="searchBox">
        <input
          type="text"
          name="search"
          placeholder="Search.."
          onChange={this.handleQuery}
          value={this.props.query}
        />
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    minPrice: st.min,
    maxPrice: st.max,
    group: st.group,
    category: st.category
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
