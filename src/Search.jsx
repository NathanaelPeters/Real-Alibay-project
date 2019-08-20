import { connect } from "react-redux";
import React, { Component } from "react";
import items from "./data";
import { Link } from "react-router-dom";

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
      <div className="searchbox" height="100px">
        <div>
          <div>
            Search query
            <input
              type="text"
              onChange={this.handleQuery}
              value={this.props.query}
            />
          </div>
        </div>
        <div>
          <div>
            Minimum price
            <input
              type="text"
              onChange={this.handleMinimumPrice}
              value={this.props.minPrice.toString()}
            />
          </div>
        </div>
        <div>
          <div>
            Maximum price
            <input
              type="text"
              onChange={this.handleMaximumPrice}
              value={this.props.maxPrice.toString()}
            />
          </div>
        </div>
        <div>
          <div>
            <div>
              <input
                type="radio"
                name="group"
                value="men"
                onChange={this.handleSelectGroup}
              />{" "}
              Men's
              {this.props.group === "men" ? submenu : null}
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="group"
                value="women"
                onChange={this.handleSelectGroup}
              />{" "}
              Women's
              {this.props.group === "women" ? submenu : null}
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="group"
                value="children"
                onChange={this.handleSelectGroup}
              />
              Children's
              {this.props.group === "children" ? submenu : null}
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="group"
                value=""
                onChange={this.handleSelectGroup}
              />
              All
            </div>
          </div>
        </div>
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
