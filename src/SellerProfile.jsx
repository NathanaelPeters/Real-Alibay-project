import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { connect } from "react-redux";

class UnconnectedSellerProfile extends Component {
  render() {
    console.log(this.props.sellers);
    let result = this.props.sellers.filter(id => {
      return id.id === this.props.sellerID;
    });
    console.log(result);
    return (
      <div className="profile">
        <div>
          <img src={result[0].image} height="300px" />
        </div>
        <div>
          <div>Username: {result[0].name} </div>
          <Link to="/Orders">Link to Other items this seller is selling</Link>
        </div>
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    sellers: st.sellers
  };
};

let SellerProfile = connect(mapStateToProps)(UnconnectedSellerProfile);
export default SellerProfile;
