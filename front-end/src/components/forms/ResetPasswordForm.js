import React, { useState } from "react";
import AlertMessage from "../alerts/AlertMessage";
import { useParams, Link } from "react-router-dom";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  const { token } = useParams();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      if (password !== passwordConfirmation) {
        setIsError(true);
        setAlertMessage("Passwords do not match!");
        setPassword("");
        setPasswordConfirmation("");
        throw new Error("Passwords do not match!");
      } else {
        const response = await fetch(
          "http://localhost:8080/api/user/resetPassword/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: password,
              token: token,
            }),
          }
        );

        const responseData = await response.json();

        if (response.status !== 200) {
          setAlertMessage(responseData.message);
          setIsError(true);
          setPassword("");
          setPasswordConfirmation("");
          throw new Error(responseData.message);
        }

        if (response.status === 200) {
          setAlertMessage(responseData.message);
          setIsError(false);
          setPassword("");
          setPasswordConfirmation("");
        }
      }
    } catch (error) {
      setIsError(true);
    }
  };

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
        onSubmit={handlePasswordReset}
        className="space-y-6 mb-10"
        action="#"
        method="POST"
      >
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
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
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password Confirmation
            </label>
          </div>
          <input
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type={isRevealPassword ? "text" : "password"}
            required
            className="mt-1 text-xs py-3 appearance-none mb-8 w-64 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
        >
          Reset
        </button>
      </form>
      <Link
        className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-purple-dark hover:bg-opacity-75 mt-6"
        to="/login"
      >
        Back to log in
      </Link>
    </div>
  );
};

export default ResetPasswordForm;
