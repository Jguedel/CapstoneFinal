import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../../FireBase/FireBase";
import "./Cart.scss";
import Button from "../../Elements/Button/Button";

const CartPage = (props) => {
  const [cart, setCart] = useState(null);
  var totalPrice = 0;

  useEffect(() => {
    const fetchCart = async () => {
      const doc = await firestore.collection("Users").doc(props.id).get();
      const data = doc.data();
      if (data === []) {
        setCart(null);
      } else {
        setCart(data.cart);
      }
    };

    fetchCart();
  }, [props]);

  if (!cart) {
    return <h1>Loading...</h1>;
  }

  function setPrice(price, Quan) {
    totalPrice += Quan * price;
  }

  const removeCart = async (toRemove) => {
    const index = cart.indexOf(toRemove);
    var ans;
    if (index === 0 && cart.length > 1) {
      ans = cart.splice(1, cart.length - 1);
    } else {
      const front = cart.splice(0, index);
      const back = cart.splice(index, cart.length - 1);
      if (front.length === 0) {
        ans = back;
      } else if (back.length === 0) {
        ans = front;
      } else {
        ans = [...front, ...back];
      }
    }
    await firestore.collection("Users").doc(props.id).update({
      cart: ans,
    });
  };

  return (
    <div className="cartpage">
      <h1>Check out</h1>
      <div className="cart">
        {cart.map((cartItem) => (
          <div key={cartItem.id} className="cartItem">
            <div className="prodImg">
              <img src={cartItem.Img} alt="Product" />
            </div>
            <p className="price">Price: ${cartItem.price}</p>
            <p className="quan">Quantity: {cartItem.Quan}</p>
            <p className="name">{cartItem.Name}</p>
            <Button className="delete" onClick={() => removeCart(cartItem)}>
              Delete item
            </Button>
            {setPrice(cartItem.price, cartItem.Quan)}
          </div>
        ))}
        <div className="checkout">
          <h3>Total Price: ${totalPrice} </h3>
          <Link to="/checkout">
            <button> Checkout </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
