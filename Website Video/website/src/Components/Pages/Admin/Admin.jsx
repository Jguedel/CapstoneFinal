import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Elements/Button/Button";
import Inputs from "../../Elements/Inputs/Inputs";
import { firestore } from "../../../FireBase/FireBase";
import "./Admin.scss";

const initialState = {
  Name: "",
  img: "",
  Description: "",
  price: "",
  Quantity: "",
  cat: "Tech",
  Maker: "",
  EvntBenefit: "",
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    var {
      Name,
      img,
      Description,
      price,
      cat,
      Quantity,
      Maker,
      EvntBenefit,
    } = this.state;
    try {
      price = parseInt(price);
      Quantity = parseInt(Quantity);
      firestore.collection(cat).doc(Name).set({
        Name,
        Description,
        price,
        img,
        Quantity,
        Maker,
        EvntBenefit,
      });
      alert("Product " + Name + " added to " + cat);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {
      Name,
      img,
      Description,
      price,
      cat,
      Quantity,
      Maker,
      EvntBenefit,
    } = this.state;
    return (
      <div>
        <h1>Admin Page</h1>
        <div className="addP">
          <form onSubmit={this.handleSubmit}>
            <Inputs
              required
              type="text"
              name="Name"
              value={Name}
              placeholder="Name"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="text"
              name="img"
              value={img}
              placeholder="Img URL"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="text"
              name="Description"
              value={Description}
              placeholder="Discription"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="text"
              name="Maker"
              value={Maker}
              placeholder="Maker"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="text"
              name="EvntBenefit"
              value={EvntBenefit}
              placeholder="EvntBenefit"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="number"
              name="price"
              value={price}
              placeholder="Price"
              onChange={this.handleChange}
            />
            <Inputs
              required
              type="number"
              name="Quantity"
              value={Quantity}
              placeholder="Quantity"
              onChange={this.handleChange}
            />
            <div className="cat">
              <label>Categories:</label>
              <select name="cat" value={cat} onChange={this.handleChange}>
                <option name="cat" value="Tech">
                  Tech
                </option>
                <option name="cat" value="Kitchen">
                  Kitchen
                </option>
                <option name="cat" value="Cleaning">
                  Cleaning
                </option>
                <option name="cat" value="Restroom">
                  Restroom
                </option>
                <option name="cat" value="Office">
                  Office
                </option>
              </select>
            </div>
            <Button type="submit">Add New Product</Button>
          </form>
          <div className="link">
            <Link to="/orders">Veiw Orders</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
