import React, { useState } from "react";
import { Link } from "react-router-dom";
import Buttons from "../../Elements/Button/Button";
import Inputs from "../../Elements/Inputs/Inputs";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { firestore } from "../../../FireBase/FireBase";
import "./Payment.scss";

const initialState = {
  Address: "",
  City: "",
  zip: "",
  state: "",
  Name: "",
};

const Payment = (props) => {
  const stripes = useStripe();
  const elements = useElements();

  const [Billing, setBilling] = useState({ ...initialState });
  const [Shipping, setShipping] = useState({ ...initialState });
  const [order, setOrder] = useState(false);
  const [orders, setOrders] = useState(null);
  const [count, setCount] = useState(1);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripes || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error /*, paymentMethod */ } = await stripes.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert("Payment invalid please try again");
    } else {
      try {
        //get orders from account
        const doc = await firestore.collection("Users").doc(props.id).get();
        const data = doc.data();
        if (data === []) {
          setOrders(null);
        } else {
          setOrders(data.orders);
        }
        //check for previous orders to set id for mapping later
        
        console.log(data.orders);
        if (data.orders !== false) {
          console.log("hit:" + data.orders.length);
          setCount(data.orders.length + 1);
        }
        //set new order
        console.log(count);
        const item = {
          count: count,
          items: data.cart,
          ship: Shipping,
          bill: Billing,
        };
        orders.push(item)
        await firestore.collection("Users").doc(props.id).update({
          orders: orders,
          cart: [],
        });
        setOrder(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShipping({
      ...Shipping,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBilling({
      ...Billing,
      [name]: value,
    });
  };

  const configCard = {
    iconStyle: "solid",
    hidePostalCode: true,
  };

  if (order === false) {
    return (
      <div className="payment">
        <form onSubmit={handleSubmit} className="pay">
          <h3>Billing address</h3>
          <div className="Billing">
            <Inputs
              required
              type="text"
              name="Name"
              value={Billing.Name}
              placeholder="Name of Recipient"
              handleChange={(evt) => handleBilling(evt)}
            />
            <Inputs
              required
              type="text"
              name="Address"
              value={Billing.Address}
              placeholder="Address"
              handleChange={(evt) => handleBilling(evt)}
            />
            <Inputs
              required
              type="text"
              name="City"
              value={Billing.City}
              placeholder="City"
              handleChange={(evt) => handleBilling(evt)}
            />
            <Inputs
              required
              type="text"
              name="state"
              value={Billing.state}
              placeholder="state"
              handleChange={(evt) => handleBilling(evt)}
            />
            <Inputs
              required
              type="text"
              name="zip"
              value={Billing.zip}
              placeholder="Zip code"
              handleChange={(evt) => handleBilling(evt)}
            />
          </div>
          <h3>Shipping address</h3>
          <div className="Shipping">
            <Inputs
              required
              type="text"
              name="Name"
              value={Shipping.Name}
              placeholder="Name on card"
              handleChange={(evt) => handleShipping(evt)}
            />
            <Inputs
              required
              type="text"
              name="Address"
              value={Shipping.Address}
              placeholder="Address"
              handleChange={(evt) => handleShipping(evt)}
            />
            <Inputs
              required
              type="text"
              name="City"
              value={Shipping.City}
              placeholder="City"
              handleChange={(evt) => handleShipping(evt)}
            />
            <Inputs
              required
              type="text"
              name="state"
              value={Shipping.state}
              placeholder="state"
              handleChange={(evt) => handleShipping(evt)}
            />
            <Inputs
              required
              type="text"
              name="zip"
              value={Shipping.zip}
              placeholder="Zip code"
              handleChange={(evt) => handleShipping(evt)}
            />
          </div>
          <p>
            Your card wont be charged this is just validating card. None of the
            products are actually for sale on site. (Use 4242-4242-4242-4242
            Exp: 04/42, CVC: 424, Postal: 42424 as test card if you wish) No
            card information will be saved
          </p>
          <CardElement option={configCard} />
          <br />
          <Buttons type="submit">Pay now</Buttons>
        </form>
        <Link to="/">
          <Buttons> Home </Buttons>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="completedOrder">
        <h1>Your order is now complete</h1>
        <Link to="/">
          <Buttons> Home </Buttons>
        </Link>
      </div>
    );
  }
};

export default Payment;