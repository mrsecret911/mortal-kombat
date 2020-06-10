import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import PressEnter from "./pages/PressEnter";
import SelectCharacter from "./pages/SelectCharacter";
import BattleLoading from "./pages/BattleLoading";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <PressEnter />
          </Route>
          <Route path="/select">
            <SelectCharacter />
          </Route>
          <Route path="/loading">
            <BattleLoading />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
