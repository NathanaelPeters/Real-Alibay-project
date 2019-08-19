import React, { Component } from "react";
import "./main.css";
import { initialItems } from "./Data.js";
import { connect } from 'react-redux'
class UnconnectedDetails extends Component {
  render() {
    let result = this.props.items.filter(id =>{
      return id.id === this.props.itemID
    })
    return (
      <div>
        <div>Details</div>
        <div className="details">
          <div className="detailproduct">
          <img className="image"
            height="82px"
            width="61px"
            src={result[0].image}
          />
          <div>
            <div className="descriptiond">{result[0].description}</div>
            <div className="priced">{"$" + result[0].price}</div>
            {/* <div className="quantityd">{this.props.quantity}</div> */}
            <button className="Add" onClick={this.mycart}>Add to Cart</button>
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
let mapStateToProps = st => {
  return {
    items: st.items
  }
}

let Details = connect(mapStateToProps)(UnconnectedDetails)
export default Details;
