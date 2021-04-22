import Firebase from "../FireBase";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import "./TechP.css";

const TechP = () => {
  const [techList, setTechList] = useState([]);

  const getTech = async () => {
    try {
      const list = [];
      var snapshot = await Firebase.firestore().collection("Tech").get();
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setTechList([...list]);
    } catch (e) {
      alert("error");
    }
  };

  useEffect(() => {
    getTech();
  }, []);

  const [Page, pageCh] = useState("");
  if (Page != '') {
    console.log(this.listItem.Name);
  }

  return (
    <div>
      <form>
        {techList.map((listItem) => (
          <div>
            <div className="item" key = {listItem.Name}>
              <h2>{listItem.Name}</h2>
              <br />
              <img src={listItem.img} alt="Product Image"></img>
              <p>{listItem.Description}</p>
            </div>
            <br />
            <button onClick={() => pageCh(this.listItem.Name)}>More Details</button>
            <button onClick={() => pageCh(1)}>Add to Cart</button>
          </div>
        ))}
      </form>
    </div>
  );
};
export default TechP;
