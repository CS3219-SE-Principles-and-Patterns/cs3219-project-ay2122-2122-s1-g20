import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="py-6 align-middle justify-center mt-5">
      <form className="space-y-6" action="#" method="POST">
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
        <p className="text-sm pt-5 text-purple-dark flex justify-center">
          <button type="button" onClick={""} className="hover:underline">
            Forgot your password?
          </button>
        </p>
        <p className="text-sm flex justify-center">
          Do not have an account?
          <button
            type="button"
            onClick={""}
            className="text-purple-dark pl-1 hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
