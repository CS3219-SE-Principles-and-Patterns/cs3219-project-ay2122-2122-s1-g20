import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (password !== passwordConfirmation) {
        setErrorSignUp(true);
        throw new Error("Passwords do not match!");
      } else {
        const response = await fetch("http://localhost:8080/api/user/signup", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
        });

        const responseData = await response.json();

        console.log(responseData.token);

        if (response.status !== 200 || response.status != 201) {
          setErrorSignUp(true);
          console.log("In response != 200");
          throw new Error(responseData.message);
        }

        if (response.status == 200 || response.status === 201) {
          console.log("In response == 200");
          console.log(responseData.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      console.log("In catch clause");
      console.log(errorSignUp);
    }
  };

  return (
    <div className="py-6 align-middle justify-center mt-5">
      <form
        onSubmit={handleSignUp}
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
            type="text"
            name="email"
            id="email"
            value={email}
            className="mt-1 appearance-none w-64 py-3 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark text-xs focus:border-purple-dark sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block flex text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
            value={username}
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
              className="text-purple-dark hover:underline text-xs sm:text-sm"
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
            className="mt-1 text-xs py-3 appearance-none mb-4 w-64 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark sm:text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="password"
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
            className="mt-1 text-xs py-3 appearance-none mb-4 w-64 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
        >
          Log In
        </button>
        <p className="text-sm mt-3 flex justify-center">
          Already have an account?
          <Link className="text-purple-dark pl-1 hover:underline" to="/login">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
