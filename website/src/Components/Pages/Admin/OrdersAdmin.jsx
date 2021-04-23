import React, { useState, useEffect } from "react";
import { firestore } from "../../../FireBase/FireBase";
import "./OrdersAdmin.scss";

const OrdersAdmin = (props) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const doc = await firestore.collection("Users");
      const snapshot = await doc.where("orders", "!=", []).get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return <h1>No Orders</h1>;
      }
      var ans = [];
      snapshot.forEach((doc) => {
        ans.push(doc.data().orders);
        //setOrder(doc.data().orders);
      });
      console.log("ans ", ans);
      setOrder(ans);
    };
    fetchOrder();
  }, [props]);

  console.log(order);
  return (
    <div className="adminOrders">
      <h1>Orders</h1>
      {order &&
        order.map((orderItem, index) => (
          <div key={index}>
            {orderItem.map((subItem, sindex) => (
              <div className="singleOrder" key={sindex}>
                {console.log(subItem)}
                {console.log(sindex)}
                <p>Name: {subItem.ship.Name}</p>
                <p>Shipping address: {subItem.ship.Address}</p>
                <p>City: {subItem.ship.City}</p>
                <p>State: {subItem.ship.state}</p>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>Product Name</td>
                        <td>Quantity</td>
                        <td>Price</td>
                      </tr>
                    </thead>
                    {subItem.items.map((products, pindex) => (
                      <tbody key={pindex}>
                        <tr key={pindex}>
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
        ))}
    </div>
  );
};

export default OrdersAdmin;
