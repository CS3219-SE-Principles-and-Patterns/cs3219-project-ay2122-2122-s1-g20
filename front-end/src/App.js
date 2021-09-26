import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/start/login";
import SignUpPage from "../src/pages/start/signup";
import Header from "./components/header/Header";
import SignUpConfirmation from "./pages/start/signupConfirmation";
import ResetPasswordPage from "./pages/start/resetPassword";
import EmailConfirmationPage from "./pages/start/emailConfirmation";

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
          <Route path="/resetPassword">
            <ResetPasswordPage />
          </Route>
          <Route path="/emailConfirmation">
            <EmailConfirmationPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
