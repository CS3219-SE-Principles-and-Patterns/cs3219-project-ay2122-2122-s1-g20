const BlueSessionCard = () => {
  return (
    <div className="bg-purple-light  pb-5 pt-1 ml-8 mr-8 rounded-xl">
      <div className="flex justify-between">
        <div>
          <div className="flex">
            <span className="pl-4 pt-3 text-purple-dark lg:text-2xl">
              CHIONG CS3219 OTOT TASKS
            </span>
            <span className="p-3 font-bold text-purple-dark lg:text-2xl">
              #CS3219
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-purple-dark lg:text-md justify-self-start">
              Capacity: 3/5
            </p>
            <p className="text-purple-dark lg:text-md">
              Date: 23/10/2021, Sunday
            </p>
            <p className="text-purple-dark lg:text-md">Time: 3-5pm</p>
          </div>
        </div>
        <button className="mr-10 text-purple-dark hover:text-opacity-50 text-xl">
          Join
        </button>
      </div>
    </div>
  );
};

export default BlueSessionCard;
