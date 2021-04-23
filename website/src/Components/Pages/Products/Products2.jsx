import React from "react";
import { useEffect, useState } from "react";
import { firestore } from "../../../FireBase/FireBase";
import Button from "../../Elements/Button/Button";
import "./Products2.scss";

const Product = (props) => {
  const [ProductList, setProductList] = useState([]);
  const [cartList, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if(props.id){
      const doc = await firestore.collection("Users").doc(props.id).get();
      const data = doc.data();
      if (data === []) {
        setCart(null);
      } else {
        setCart(data.cart);
      }
    }
    else{
      return <h1>Loading....</h1>;
    }
    };

    fetchCart();
  }, [props]);

  const getProduct = async () => {
    if (props.Cat) {
      try {
        var list = [];
        var snapshot = await firestore.collection(props.Cat).get();
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setProductList([...list]);
      } catch (e) {
        alert(e);
      }
    }
    else{
      return <h1>Loading...</h1>;
    }
  };

  useEffect(() => {
    getProduct();
  },);

  const addCart = async (name, img, price) => {
    try {
      var quanChangeAt = null;
      var item = {
        id: name,
        Name: name,
        Img: img,
        Quan: 1,
        price: price,
      };
      if (cartList === null) {
        alert("Please Login first");
        return;
      }
      for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].Name === item.Name) {
          quanChangeAt = i;
        }
      }
      if (quanChangeAt !== null) {
        item.Quan = cartList[quanChangeAt].Quan + 1;
        cartList[quanChangeAt] = item;
        await firestore.collection("Users").doc(props.id).update({
          cart: cartList,
        });
      } else {
        cartList.push(item);
        await firestore.collection("Users").doc(props.id).update({
          cart: cartList,
        });
      }
      alert(name + " added to cart succefully");
      console.log("added cart", cartList);
    } catch (error) {
      alert(error);
    }
  };

  if (!ProductList) {
    // You can render a placeholder if you like during the load, or just return null to render nothing.
    return <h1>Loading...</h1>;
  }

  return (
    <div className="ProductLayout">
      <h1>{props.Cat}</h1>
      <div className="products">
        {ProductList.map((listItem) => (
          <div className="item" key={listItem.Name}>
            <h2>{listItem.Name}</h2>
            <img src={listItem.img} alt={listItem.Name} />
            <h5>Description</h5>
            <p>{listItem.Description}</p>
            <br />
            <h5>Envirmental Benifit</h5>
            <p>{listItem.EvntBenefit}</p>
            <br />
            <h5>Price</h5>
            <p>$ {listItem.price}</p>
            <Button
              onClick={() =>
                addCart(listItem.Name, listItem.img, listItem.price)
              }
            >
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
