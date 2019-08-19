import React, { Component } from "react";
import "./main.css";
import { items } from "./Data.js";
class Details extends Component {
  render() {
    return (
      <div>
        <div>Details</div>
        <div className="details">
          <div className="detailproduct">
          <img className="image"
            height="82px"
            width="61 px"
            src={this.props.image}
          />
          <div>
            <div className="descriptiond">{this.props.description}</div>
            <div className="priced">{this.props.cost}</div>
            <div className="quantityd">{this.props.quantity}</div>
            <button className="Add" onClick={this.props.removeItem}>Add to Cart</button>
            <select className="dropdown"> 
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
export default Details;




