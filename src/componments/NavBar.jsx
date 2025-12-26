import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function NavBar({ filterProductsBySearch }) {
  let { user, userLogout } = useContext(AuthContext);
  let { cartItems, count, total } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">ShopEase</div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <Link
              to={"/"}
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Favourite Button */}
              <button className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Cart Button */}
              <Link
                to={"/checkout"}
                className="relative flex items-center text-gray-700 hover:text-blue-500 focus:outline-none transition-colors duration-200"
              >
                <div className="relative">
                  <p className="absolute top-[-30px] right-[1px] text-[red] font-bold text-3xl">
                    {/* {count} */} {total}
                  </p>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
                    />
                  </svg>
                </div>
              </Link>

              {/* Profile Button */}
              <button
                onClick={userLogout}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
              >
                Register
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
