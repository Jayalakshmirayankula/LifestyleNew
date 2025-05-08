import '../App.css';
import Validate from "../TestCode/APIValidation";
import {Counter} from "../TestCode/counter";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashBoard from "./DashBoard";
import LifeStyle from "../Container/Lifestyle";
import React from "react";

function App() {
  return (
      <>
          <HashRouter>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/LifeStyle" element={<LifeStyle />} />
              </Routes>
          </HashRouter>
 {/*     <div>
        <h1>Counter</h1>
        <Counter/>
      </div>
  <div>
    <h1>Validation</h1>
    <Validate/>
  </div>*/}
</>
)
  ;
}

export default App;
