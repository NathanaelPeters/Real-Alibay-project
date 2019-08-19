import React, { Component } from "react";

class ItemPage extends Component {
  render() {
    return (
      <div>
        <img
          className="imagelocation"
          height="82px"
          width="61 px"
          src={this.props.item.image}
        />
        <div>
          <div>{this.props.item.description}</div>
          <div>{this.props.item.price}</div>
        </div>
      </div>
    );
  }
}

export default ItemPage;
