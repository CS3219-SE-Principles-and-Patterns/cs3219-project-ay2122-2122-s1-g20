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
import ChatPage from "./pages/chat";
import { AccountProvider } from "./context/AccountContext";
import EmailVerification from "./pages/start/emailVerification";

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
            <Route
              path="signup/confirmation/verified/:uniqueString"
              component={EmailVerification}
            />
            <Route path="/resetPassword/:token" component={ResetPasswordPage} />
            <Route path="/resetPassword">
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
          <Route path="/chat">
            <ChatPage />
          </Route>
        </BrowserRouter>
      </div>
    </AccountProvider>
  );
}

export default App;
