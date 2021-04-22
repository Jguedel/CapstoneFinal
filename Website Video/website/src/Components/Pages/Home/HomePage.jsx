import React, { useState, useEffect } from "react";
import { firestore } from "../../../FireBase/FireBase";
import "./HomePage.scss";

const HomePage = (props) => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        var list = [];
        var snapshot = await firestore.collection("Helpful").get();
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setSites([...list]);
      } catch (e) {
        alert(e);
      }
    };

    fetchSites();
  }, [props]);

  return (
    <div className="HomePage">
      <h1>Home Page</h1>
      <div className="goal">
        <h3>Goal</h3>
        <p>
          My goal with this website is to create and easy and socially
          responsible shopping experiance in one place.
        </p>
      </div>
      <div className="Sites">
        <h3>How you can help the enviroment in other ways</h3>
        {sites.map((site) => (
          <div className="singleSite" key={site.Name}>
            <p>Name: {site.Name}</p>
            <img src={site.img} alt={site.Name + "'s Logo"} />
            <p>
              <b> What they do:</b> <br />
              {site.WhatDo}
            </p>
            <p>
              <b> How they do it: </b>
              <br />
              {site.HowDo}
            </p>
            <a href={site.site} title="example">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
