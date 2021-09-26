import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/start/login";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
