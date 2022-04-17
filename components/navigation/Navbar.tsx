import { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import AccountMenu from "./LoggedInItems";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Team", href: "/members", current: false },
  { name: "Tools", href: "/tools", current: false },
];

export default function NavBar() {
  const [navItems, setNavItems] = useState(navigation);

  const router = useRouter();

  useEffect(() => {
    const current = navigation.find((item) => item.href === router.pathname);
    if (current) {
      setNavItems(
        navigation.map((item) => ({
          ...item,
          current: item.href === current.href,
        }))
      );
    }
  }, [router.pathname]);

  return (
    <Disclosure as="nav" className="bg-red-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  <h1 className="font-bold text-lg">Uniting People</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-red-900 text-white"
                            : "text-gray-300 hover:bg-red-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <AccountMenu />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-500 mb-2 rounded-b-lg border-b-2 border-red-800">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-red-700 text-white"
                      : "text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium rounded-b-lg border-2 border-red-800"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
