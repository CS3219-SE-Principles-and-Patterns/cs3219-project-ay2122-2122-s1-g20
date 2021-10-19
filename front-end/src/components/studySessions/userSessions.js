const tabs = [
  { name: "Your created study sessions", href: "#", current: true },
  { name: "Your past sessions", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserSessions() {
  return (
    <div className="bg-blue-light h-screen">
      <div className="justify-items-center">
        <nav
          className="relative ml-20 mr-20 max-w-lg mt-10 z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "text-gray-900 bg-purple-dark bg-opacity-30"
                  : "text-gray-500 bg-purple-light hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 bg-white py-4 px-4 text-sm font-medium text-center hover:bg-yellow-100 focus:z-10"
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
      </div>
    </div>
  );
}
