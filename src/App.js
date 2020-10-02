import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Market from './components/Market/Market';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
  
      <Router>
        <Header></Header>
        <Switch>
          <Route path = "/market">
            <Market></Market>
          </Route>
          <Route path = "/review">
            <Review></Review>
          </Route>
          <PrivateRoute path = "/orders">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path = "/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path = "/Login">
            <Login></Login>
          </Route>
          <Route exact path = "/">
            <Market></Market>
          </Route>
          <Route path = "/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path = "*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
