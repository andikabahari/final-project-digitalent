import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import {
  AppNavbar,
  AppFooter,
  Home,
  Login,
  Register,
  Tasks,
  Users
} from "./components";

import { store, fetchUserAuth } from "./redux";

const App = () => {
  useEffect(() => store.dispatch(fetchUserAuth()), []);

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route path="/tasks" component={Tasks} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
        <AppFooter />
      </Router>
    </Provider>
  );
};

export default App;
