import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import apiFetch from "@lib/utils/api";
import { getUser, setUser } from "@lib/utils/user";

const MenuItems = [
  {
    name: "Your Profile",
    href: "/users/",
    current: false,
  },
  {
    name: "Your Stats",
    href: "/users/me/stats",
    current: false,
  },
  {
    name: "Log out",
    href: "/logout",
    current: false,
  },
];

export default function AccountMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [navItems, setNavItems] = useState(MenuItems);
  const router = useRouter();

  useEffect(() => {
    const current = MenuItems.find((item) => item.href === router.pathname);
    const user = getUser()
    if(user) {
      MenuItems[0].href = `/users/${user.id}`
      setLoggedIn(true);
    }

    if (current) {
      setNavItems(
        MenuItems.map((item) => ({
          ...item,
          current: item.href === current.href,
        }))
      );
    }
  }, [router.pathname]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username") as string;
    const password = data.get("password") as string;

    if (username && password) {
      const res = await apiFetch<{message:string, data?: {id: number, username: string, rights: number}}>("/api/auth/login", {method: "POST", body: JSON.stringify({username, password})});
      if(res.data) {
        setLoggedIn(true);
        setUser(res.data);
      }
    }


  } 

  if (!loggedIn) {
    return (
      <>
        <button className="btn bg-red-600 border-red-800 text-white font-bold">
          <a href={`${router.pathname}#login`}>
            <h1>Log In</h1>
          </a>
        </button>

        <div id="login" className="modal">
          <div className="modal-box">
            <form className="p-2 m-2" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="input-group mb-3">
                  <span>Username</span>
                  <input
                    required
                    type="text"
                    placeholder="user1"
                    className="input input-bordered"
                    name="username"
                  />
                </label>
                <label className="input-group">
                  <span>Password</span>
                  <input
                    required
                    type="password"
                    placeholder="********"
                    className="input input-bordered"
                    name="password"
                  />
                </label>
              </div>

              <div className="modal-action">
              <button type="submit" className="btn bg-green-600 border-green-600">
                Log in
              </button>
              <a href={`${router.pathname}`} className="btn bg-red-800">
                Cancel
              </a>
            </div>
            </form>
            
          </div>
        </div>
      </>
    );
  }

  return (
    <Menu as="div" className="ml-3 relative z-50">
      <div>
        <Menu.Button className="bg-red-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <UserIcon className="block h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navItems.map((item) => (
            <Menu.Item key={item.name}>
              {() => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}