import React, { useState, useEffect } from "react";
import { firestore } from "../../../FireBase/FireBase";
import "./Orders.scss";

const OrdersAdmin = (props) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (props.id) {
        const doc = await firestore.collection("Users").doc(props.id).get();
        const data = doc.data();
        setOrder(data.orders);
      }
    };
    fetchOrder();
  }, [props]);

  return (
    <div className="adminOrders">
      <h1>Orders</h1>
      {order &&
        order.map((orderItem) => (
          <div className="singleOrder" key={orderItem.count}>
            <p>Name: {orderItem.ship.Name}</p>
            <p>Shipping address: {orderItem.ship.Address}</p>
            <p>City: {orderItem.ship.City}</p>
            <p>State: {orderItem.ship.state}</p>
            <div>
              <table>
                <thead>
                  <tr>
                    <td>Product Name</td>
                    <td>Quantity</td>
                    <td>Price</td>
                  </tr>
                </thead>
                {orderItem.items.map((products) => (
                  <tbody key={products.id}>
                    <tr key={products.id}>
                      <td>{products.Name}</td>
                      <td>{products.Quan}</td>
                      <td>${products.price}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrdersAdmin;
