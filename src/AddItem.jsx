import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedAddItem extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      description: "",
      image: "",
      newItem: [],
      group: "",
      category: ""
    };
  }

  handleTitle = event => {
    console.log("new Title", event.target.value);
    this.setState({ title: event.target.value });
  };
  handlePrice = event => {
    console.log("new Price", event.target.value);
    this.setState({ price: event.target.value });
  };
  handleDescription = event => {
    console.log("new Description", event.target.value);
    this.setState({ description: event.target.value });
  };
  handlePicture = event => {
    event.preventDefault();
    this.setState({ image: event.target.files[0] });
  };
  handleGroupSelect = event => {
    console.log("new Group", event.target.value);
    this.setState({ group: event.target.value });
  };
  handleCategorySelect = event => {
    console.log("new Category", event.target.value);
    this.setState({ category: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("price", this.state.price);
    data.append("description", this.state.description);
    data.append("thepic", this.state.image);
    data.append("group", this.state.group);
    data.append("category", this.state.category);
    console.log(data);
    let fetcheddata = await fetch("/addItem", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let newItem = await fetcheddata.text();
    console.log("New item:", newItem);
    newItem = JSON.parse(newItem);
    this.props.dispatch({
      type: "add-item",
      item: newItem.newItem
    });
  };
  render = () => {
    return (
      <div>
        <div className="additem">
          <h1 align="center">
            Hello {this.props.username}! Would you like to sell something?
          </h1>
          <h2 align="center">Well, What is it?</h2>
        </div>
        <form
          className="additemform"
          onSubmit={this.handleSubmit}
          align="center"
        >
          <div>
            <h3>What is your product?</h3>
            <input
              onChange={this.handleTitle}
              placeholder="Title of your product!"
            />
          </div>
          <div>
            <h3>How much is your product?</h3>
            <input
              onChange={this.handlePrice}
              placeholder="Price of your product!"
            />
          </div>
          <div>
            <h3>Add a description to it!</h3>
            <textarea
              className="descbox"
              onChange={this.handleDescription}
              placeholder="Describe your product!"
              rows="5"
              cols="50"
            />
            {/* Checkboxes for group and category */}
            <div>
              <label className="additemoption">
                <input
                  type="radio"
                  name="group"
                  value="men"
                  onChange={this.handleGroupSelect}
                />
                <h3>Men's</h3>
              </label>
              <label className="additemoption">
                <input
                  type="radio"
                  name="group"
                  value="women"
                  onChange={this.handleGroupSelect}
                />
                <h3>Women's</h3>
              </label>
              <label className="additemoption">
                <input
                  type="radio"
                  name="group"
                  value="children"
                  onChange={this.handleGroupSelect}
                />
                <h3>Children's</h3>
              </label>
            </div>
            <div>
              <label className="additemoption">
                <input
                  type="radio"
                  name="category"
                  value="top"
                  onChange={this.handleCategorySelect}
                />
                <h3>Top</h3>
              </label>
              <label className="additemoption">
                <input
                  type="radio"
                  name="category"
                  value="bottom"
                  onChange={this.handleCategorySelect}
                />
                <h3>Bottom</h3>
              </label>
              <label className="additemoption">
                <input
                  type="radio"
                  name="category"
                  value="accessory"
                  onChange={this.handleCategorySelect}
                />
                <h3>Accessory</h3>
              </label>
            </div>
          </div>

          <div>
            <p>
              <h3>
                Last step, upload a picture to show us what it looks like!
              </h3>
            </p>
            <input
              type="file"
              name="item-image"
              onChange={this.handlePicture}
            />
          </div>
          <div>
            <h3>Now click submit and start selling!</h3>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { login: state.loggedIn };
};
let Additem = connect(mapStateToProps)(UnconnectedAddItem);

export default Additem;
