import React, { useContext, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { AccountContext } from "../../context/AccountContext";
import AlertMessage from "../alerts/AlertMessage";

const LoginForm = () => {
  const { setUser } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isError, setisError] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        setAlertMessage(responseData.message);
        setisError(true);
        setEmail("");
        setPassword("");
        setOpenAlert(true);
        throw new Error(responseData.message);
      }

      if (response.status === 200) {
        // update user information in account context
        setUser(responseData.user, responseData.token);
        // if first login, route to /profilePic, if not route to home page
        setAlertMessage(responseData.message);
        setisError(false);
        setEmail("");
        setPassword("");
        handleNext(
          responseData.user.profilePic ? "/profile" : "/setProfilePic"
        );
      }
    } catch (error) {
      setisError(true);
    }
  };

  const history = useHistory();
  const handleNext = useCallback(
    (nextPage) => history.push(nextPage),
    [history]
  );

  return (
    <div className="py-6 align-middle justify-center mt-5">
      {alertMessage !== "" && openAlert ? (
        <AlertMessage
          open={openAlert}
          setOpen={setOpenAlert}
          isError={isError}
          message={alertMessage}
        />
      ) : undefined}
      <form
        onSubmit={handleLogin}
        className="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label
            htmlFor="email"
            className="block flex text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
            value={email}
            className="mt-1 appearance-none w-64 py-3 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark text-xs focus:border-purple-dark sm:text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsRevealPassword((prevState) => !prevState)}
              className="text-purple-dark hover:underline text-xs sm:text-sm hover:bg-opacity-75"
            >
              Show Password
            </button>
          </div>
          <input
            value={password}
            onChange={handlePasswordChange}
            id="password"
            name="password"
            type={isRevealPassword ? "text" : "password"}
            required
            className="mt-1 text-xs py-3 appearance-none mb-8 w-64 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
        >
          Log In
        </button>
        <p className="text-sm pt-5 hover:underline text-purple-dark flex justify-center">
          <Link to="/resetPassword">Forgot your password?</Link>
        </p>

        <p className="text-sm flex justify-center">
          Do not have an account?
          <Link className="text-purple-dark pl-1 hover:underline" to="/signup">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
