import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="max-w-7xl pt-10 md:pt-48 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold pt-7">
        Page not found!
      </div>
      <p className="text-xl text-sm md:text-2xl text-purple-dark p-7">
        The page you have requested for <br /> is invalid.
      </p>
      <button
        type="submit"
        className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
      >
        <Link className="text-black pl-1 hover:underline" to="/login">
          Back
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
