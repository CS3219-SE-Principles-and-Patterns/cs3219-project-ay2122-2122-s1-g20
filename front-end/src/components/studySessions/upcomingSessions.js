import { SearchIcon } from "@heroicons/react/solid";

const UpcomingSessions = () => {
  return (
    <div className="bg-yellow-light h-screen">
      <p className="text-xl text-purple-dark font-medium mt-10">
        Upcoming study sessions you <br />
        might be interested in
      </p>
      <form className="pl-8 pr-8 pt-4 flex" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search for study sessions
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute p-3 inset-y-0 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full bg-white h-full pl-10 pr-3 py-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search for study sessions"
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  );
};

export default UpcomingSessions;
