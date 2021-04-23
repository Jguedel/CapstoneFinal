import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import { auth, handleUserProfile } from "./FireBase/FireBase";

//LAYOUTS
import Main from "./Layout/MainLay";
import ProfileLayout from "./Layout/ProfileLay";
import AdminLayout from "./Layout/AdminLay";
import TechLayout from "./Layout/TechLay";
import CartLayout from "./Layout/CartLay";
import CleaningLayout from "./Layout/CleaningLay";
import KitchenLayout from "./Layout/KitchenLay";
import OfficeLayout from "./Layout/OfficeLay";
import RestroomLayout from "./Layout/RestroomLay";
import AdminOrder from "./Layout/AdminOrder";
import OrderLay from "./Layout/OrderLay";

//PAGES
import Home from "./Components/Pages/Home/HomePage";
import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";
import CheckoutPage from "./Components/Pages/Checkout/Checkout";

const intialState = {
  currentUser: null,
  Roles: null,
  Email: null,
  id: null,
  cart: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...intialState,
    };
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            //USER INFO
            Roles: snapshot.data().Role,
            Email: snapshot.data().email,
            id: snapshot.id,
            cart: snapshot.data().cart,
            userName: snapshot.data().userName,
            //TO SEE IF USER IS LOGGED IN
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        ...intialState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser, Roles, Email, id, cart, userName } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Main currentUser={currentUser} Roles={Roles}>
                <Home />
              </Main>
            )}
          />
          <Route
            path="/register"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <Main currentUser={currentUser} Roles={Roles}>
                  <Register />
                </Main>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <Main currentUser={currentUser} Roles={Roles}>
                  <Login />
                </Main>
              )
            }
          />
          <Route
            path="/profile"
            render={() =>
              !currentUser ? (
                <Redirect to="/login" />
              ) : (
                <ProfileLayout
                  currentUser={currentUser}
                  Roles={Roles}
                  Email={Email}
                  userName={userName}
                />
              )
            }
          />
          <Route
            path="/orders"
            render={() =>
              currentUser && Roles !== "admin" ? (
                <Redirect to="/" />
              ) : (
                <AdminOrder currentUser={currentUser} Roles={Roles} />
              )
            }
          />
          <Route
            path="/myOrders"
            render={() => <OrderLay currentUser={currentUser} id={id} Roles={Roles} />}
          />
          <Route
            path="/tech"
            render={() => (
              <TechLayout
                currentUser={currentUser}
                Roles={Roles}
                id={id}
                Email={Email}
                cart={cart}
                Cat="Tech"
              />
            )}
          />
          <Route
            path="/cleaning"
            render={() => (
              <CleaningLayout
                currentUser={currentUser}
                Roles={Roles}
                id={id}
                Email={Email}
                cart={cart}
                Cat="Cleaning"
              />
            )}
          />
          <Route
            path="/kitchen"
            render={() => (
              <KitchenLayout
                currentUser={currentUser}
                Roles={Roles}
                id={id}
                Email={Email}
                cart={cart}
                Cat="Kitchen"
              />
            )}
          />
          <Route
            path="/office"
            render={() => (
              <OfficeLayout
                currentUser={currentUser}
                Roles={Roles}
                id={id}
                Email={Email}
                cart={cart}
                Cat="Office"
              />
            )}
          />
          <Route
            path="/restroom"
            render={() => (
              <RestroomLayout
                currentUser={currentUser}
                Roles={Roles}
                id={id}
                Email={Email}
                cart={cart}
                Cat="Restroom"
              />
            )}
          />
          <Route
            path="/cart"
            render={() =>
              !currentUser ? (
                <Redirect to="/login" />
              ) : (
                <CartLayout
                  currentUser={currentUser}
                  Roles={Roles}
                  id={id}
                  Email={Email}
                  cart={cart}
                />
              )
            }
          />
          <Route
            path="/checkout"
            render={() =>
              !currentUser ? <Redirect to="/login" /> : <CheckoutPage id={id} />
            }
          />
          <Route
            path="/admin"
            render={() =>
              Roles !== "admin" ? (
                <Redirect to="/login" />
              ) : (
                <AdminLayout currentUser={currentUser} Roles={Roles} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
