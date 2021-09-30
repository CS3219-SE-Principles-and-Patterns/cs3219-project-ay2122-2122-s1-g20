import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/start/login";
import SignUpPage from "../src/pages/start/signup";
import Header from "./components/header/Header";
import SignUpConfirmation from "./pages/start/signupConfirmation";
import ResetPasswordPage from "./pages/start/resetPassword";
import EmailConfirmationPage from "./pages/start/emailConfirmation";
import SetProfilePicPage from "./pages/firstLogin/setProfilePic";
import AddModulesPage from "./pages/firstLogin/addModules";
import ProfilePage from "./pages/profile";
import { AccountProvider } from "./context/AccountContext";

function App() {
  return (
    <AccountProvider>
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

            {/* After first login - account customization */}
            <Route path="/setProfilePic">
              <SetProfilePicPage />
            </Route>
            <Route path="/addModules">
              <AddModulesPage />
            </Route>
          </Switch>

          <Route path="/profile">
            <ProfilePage />
          </Route>
        </BrowserRouter>
      </div>
    </AccountProvider>
  );
}

export default App;
