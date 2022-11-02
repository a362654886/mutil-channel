import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/index.css";
import "antd/dist/antd.css";
import HomePage from "./pages/HomePage";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
