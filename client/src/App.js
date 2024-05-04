// @ts-nocheck
import "./App.css";
import Login from "./Components/Internal/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interal from "./Components/Internal/Internal";
import Customer from "./Components/Customer/Customer";
import CustomerLogin from "./Components/Customer/CustomerLogin";
import ValidateTable from "./Components/Customer/ValidateTable";
import Wrapper from "./Components/Internal/Wrapper";
import {
  CustomerContext,
  CustomerContextData,
} from "./Components/Customer/CustomerContextData";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/table/:table/*"
            element={
              <>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ValidateTable>
                        <CustomerContext.Provider value={CustomerContextData()}>
                          <Customer />
                        </CustomerContext.Provider>
                      </ValidateTable>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <ValidateTable>
                        <CustomerLogin />
                      </ValidateTable>
                    }
                  />
                </Routes>
              </>
            }
          />
          <Route
            path="/internal/*"
            element={
              <>
                <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/*" element={ <Wrapper><Interal/></Wrapper> }/>
                </Routes>
              </>
            }
          ></Route>
          <Route path="/*" element={<div>YESSSS</div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
