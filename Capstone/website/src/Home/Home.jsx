import React from 'react';
import app from '../FireBase';
import NavBar from '../NavBar/NavBar'
const Home = () => {
 return (
   <div>
     <NavBar/>
   <h1>Home page</h1>
   <button onClick={() => app.auth().signOut()}>Sign out</button>
   </div>
    );
}

export default Home;
