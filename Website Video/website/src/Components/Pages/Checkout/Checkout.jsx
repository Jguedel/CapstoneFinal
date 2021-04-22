import React, { useState, useEffect } from "react";
import { firestore } from "../../../FireBase/FireBase";
import "./Checkout.scss";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { pubKey } from "../../../Stripes/Stripes";

const stripesPromise = loadStripe(pubKey);

const CheckoutPage = (props) => {
  const [cart, setCart] = useState(null);
  var totalPrice= 0;

  useEffect(() => {
    const fetchCart = async () => {
      const doc = await firestore.collection("Users").doc(props.id).get();
      const data = doc.data();
      if (data === undefined) {
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
    totalPrice+= Quan * price;
  }
  return (
    <div>
      <h1>Order Summary</h1>
      <div className="orderSum">
        <table>
          <thead>
            <tr>
              <td>Prouct Name</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Price</td>
            </tr>
          </thead>
          {cart.map((cartItem) => (
            <tbody key={cartItem.id}>
              <tr key={cartItem.id}>
                <td>{cartItem.Name}</td>
                <td className="itemQuan">{cartItem.Quan}</td>
                <td>${cartItem.price}</td>
                <td>${cartItem.price * cartItem.Quan}</td>
              </tr>
              {setPrice(cartItem.price, cartItem.Quan)}
            </tbody>
          ))}
        </table>
      </div>
      <h2>Total: ${totalPrice}</h2>
      <div className="paymentInfo">
        <Elements stripe={stripesPromise}>
          <Payment totalPrice={totalPrice} id={props.id} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
