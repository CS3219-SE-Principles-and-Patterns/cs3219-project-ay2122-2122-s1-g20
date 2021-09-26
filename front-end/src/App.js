import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/start/login";
import SignUpPage from "../src/pages/start/signup";
import Header from "./components/header/Header";
import SignUpConfirmation from "./pages/start/signupConfirmation";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signup/confirmation">
            <SignUpConfirmation />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
