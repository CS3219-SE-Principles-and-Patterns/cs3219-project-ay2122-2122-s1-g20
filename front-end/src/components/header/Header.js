/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AccountContext } from "../../context/AccountContext";
import { api } from "../../utils/api";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const history = useHistory();
  const navigation = [
    { name: "StudySessions", href: "/studysessions" },
    { name: "Chats", href: "/chat" },
  ];

  const { email, handleUpdateSalt, token, profilePic } =
    useContext(AccountContext);
  const [logoutSuccess, setLogoutSuccess] = useState("false");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  });

  const cookies = new Cookies();
  const past = new Date(Date.now() - 86400000);

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log(email);
    await api
      .post("/user/logout", { email })
      .then((res) => {
        handleUpdateSalt(res.data.user.jwtSalt);
        setLogoutSuccess(true);
        setIsLoggedIn(false);
      })
      .then(() => {
        if (logoutSuccess) {
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Disclosure as="nav" className="bg-purple-dark">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span className="h-full font-semibold text-2xl text-white block align-center w-auto">
                    StudyBuddy
                  </span>
                </div>
                {isLoggedIn ? (
                  <div className="hidden pl-3 sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          onClick={(e) => {
                            //maintain context between tabs navigation
                            e.preventDefault();
                            history.push(item.href);
                          }}
                          key={item.name}
                          href={item.href}
                          className="px-3 py-2 text-white rounded-md hover:bg-gray-700 hover:text-white text-sm font-medium"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : undefined}
              </div>
              {isLoggedIn ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}

                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={profilePic}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                history.push("/profile");
                              }}
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                cookies.set("token", " ", {
                                  path: "/",
                                  expires: past,
                                });
                                cookies.set("salt", " ", {
                                  path: "/",
                                  expires: past,
                                });
                                cookies.remove("token");
                                cookies.remove("salt");
                                handleLogout();
                              }}
                              href="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : undefined}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  onClick={(e) => {
                    //maintain context between tabs navigation
                    e.preventDefault();
                    history.push(item.href);
                  }}
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
