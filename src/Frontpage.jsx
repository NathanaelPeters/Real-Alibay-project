import React, { Component } from "react";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import Search from "./Search.jsx";

class Frontpage extends Component {
  render = () => {
    return (
      <div>
        <Header username={this.props.username} />
        <Search />
      </div>
    );
  };
}

export default Frontpage;
