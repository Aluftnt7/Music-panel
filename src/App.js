import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.scss";
import RoutePage from "./cmps/RoutePage";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <RoutePage />
      </Router>
    </div>
  );
}

export default App;
