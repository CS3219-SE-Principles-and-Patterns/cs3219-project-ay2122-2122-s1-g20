import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmailConfirmationPage = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailConfirmation = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const responseData = await response.json();

      if (response.status !== 200) {
        throw new Error(responseData.message);
      }

      if (response.status == 200) {
        // Route to home page
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7">
        Please enter your email address.
      </div>
      <p className="text-xl text-sm md:text-xl text-purple-dark p-7">
        You will receive an email to reset your password.
      </p>
      <form
        onSubmit={handleEmailConfirmation}
        className="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
          </div>
          <input
            value={email}
            onChange={handleEmailChange}
            id="email"
            name="email"
            type="text"
            required
            className="mt-1 text-xs py-3 appearance-none mb-8 w-64 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
        >
          Send
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

export default EmailConfirmationPage;
