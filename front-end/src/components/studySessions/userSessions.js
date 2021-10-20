import YellowSessionCard from "./yellowSessionCard";

const tabs = [
  { name: "Your created study sessions", current: true },
  { name: "Your past sessions", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserSessions() {
  const handleTabNavigation = (tab, tabIdx) => {
    tab.current = true;
    if (tabIdx === 1) {
      tabs[1].current = false;
    } else {
      tabs[0].current = false;
    }
  };

  return (
    <div className="bg-blue-light pt-10 h-screen">
      <nav
        className="flex ml-10 mr-10 mb-4 z-0 rounded-lg shadow divide-x divide-gray-200"
        aria-label="Tabs"
      >
        {tabs.map((tab, tabIdx) => (
          <a
            onClick={() => handleTabNavigation(tab, tabIdx)}
            key={tab.name}
            className={classNames(
              tab.current
                ? "text-gray-900 bg-purple-dark bg-opacity-30"
                : "text-gray-500 bg-purple-light hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 bg-white py-4 px-4 text-sm font-medium text-center hover:bg-purple-dark hover:bg-opacity-30 focus:z-10"
            )}
            aria-current={tab.current ? "page" : undefined}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                tab.current ? "bg-purple-dark" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </a>
        ))}
      </nav>
      <YellowSessionCard />
    </div>
  );
}
