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
import ErrorPage from "./pages/errors/404";
import StudySessionsHome from "./pages/studySession/studyHome";
import PrivateRoute from "./routing/PrivateRoute";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <AccountProvider>
      <SessionProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignUpPage />
              </Route>
              <Route
                exact
                path="/signup/confirmation/verified/:uniqueString"
                component={EmailVerification}
              />
              <Route exact path="/signup/confirmation">
                <SignUpConfirmation />
              </Route>
              <Route
                exact
                path="/signup/confirmation/verified/:uniqueString"
                component={EmailVerification}
              />
              <Route
                exact
                path="/resetPassword/:token"
                component={ResetPasswordPage}
              />
              <Route exact path="/resetPassword">
                <EmailConfirmationPage />
              </Route>

              {/* After first login - account customization */}
              <PrivateRoute
                path="/setProfilePic"
                exact
                component={SetProfilePicPage}
              />
              <PrivateRoute
                path="/addModules"
                exact
                component={AddModulesPage}
              />
            </Switch>
            <PrivateRoute path="/profile" exact component={ProfilePage} />
            <PrivateRoute path="/chat" exact component={ChatPage} />
            <Route path="/error">
              <ErrorPage />
            </Route>
            <PrivateRoute
              path="/studySessions"
              exact
              component={StudySessionsHome}
            />
          </BrowserRouter>
        </div>
      </SessionProvider>
    </AccountProvider>
  );
}

export default App;
