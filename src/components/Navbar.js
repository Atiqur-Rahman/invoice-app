import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-300 transition duration-300"
          >
            Invoice App
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/products"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Products
            </Link>
            <Link
              to="/invoice"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Invoices
            </Link>
            <Link
              to="/inventory"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Inventory
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="mr-4">Hello, {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-4 py-2 px-4 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
            <Link
              to="/products"
              className="block text-white hover:text-blue-300 transition duration-300"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/invoices"
              className="block text-white hover:text-blue-300 transition duration-300"
              onClick={toggleMenu}
            >
              Invoices
            </Link>
            <Link
              to="/inventory"
              className="block text-white hover:text-blue-300 transition duration-300"
              onClick={toggleMenu}
            >
              Inventory
            </Link>
            {user ? (
              <>
                <span className="block text-white">Hello, {user.email}</span>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-blue-300 transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white hover:text-blue-300 transition duration-300"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
