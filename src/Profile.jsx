import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  // handleProfilePic = () => {

  //   event.preventDefault();
  //   let fetcheddata = await fetch("/profilePic", {
  //     method: "POST",
  //     body: data,
  //     credentials: "include"
  //   });
  //   let newPic = await fetcheddata.text();
  //   newPic = JSON.parse(newPic);

  // };
  render = () => {
    return (
      <div className="profile">
        <div>
          <img src="../uploads/unknown-pic.jpg" height="300px" />
        </div>
        <div>
          <button onClick={this.handleProfilePic}>
            Change profile picture
          </button>
        </div>
        <div>
          <div>Username: {this.props.username}</div>
          <Link to="/Orders">Link to orders made</Link>
          {/* <Link></Link>  where we'd put the items that the seller is selling*/}
        </div>
      </div>
    );
  };
}

export default Profile;
