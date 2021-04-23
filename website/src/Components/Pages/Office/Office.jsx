import React from "react";
import { useEffect, useState } from "react";
import { firestore } from "../../../FireBase/FireBase";
import Button from "../../Elements/Button/Button";
import { Link } from "react-router-dom";

const Office = (props) => {
  const [OfficeList, setOfficeList] = useState([]);
  const [cartList, setCart] = useState(null);

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

  const getOffice = async () => {
    try {
      var list = [];
      var snapshot = await firestore.collection("Office").get();
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setOfficeList([...list]);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getOffice();
  }, []);

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

  if (!OfficeList) {
    // You can render a placeholder if you like during the load, or just return null to render nothing.
    return <h1>Loading...</h1>;
  }

  return (
    <div className="OfficeLayout">
      <h1>Office</h1>
      <div className="products">
        {OfficeList.map((listItem) => (
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
            {props.currentUser && (
              <div className="link">
                <Button>
                  <Link to="/Office">More Info</Link>
                </Button>
                <Button
                  onClick={() =>
                    addCart(listItem.Name, listItem.img, listItem.price)
                  }
                >
                  Add to cart
                </Button>
              </div>
            )}
            {!props.currentUser && (
              <div className="link">
                <Button>
                  <Link to="/Office">More Info</Link>
                </Button>
                <Button>
                  <Link to="/login">Add to cart</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Office;
