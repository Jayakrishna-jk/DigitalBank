import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import LogoutButton from "./Logout";
// import LogoutButton from "./Logout";
// import { useAuth } from "@/utils/types";

const Header: React.FC = () => {
  // const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
//   const { userRole } = useAuth()
  const userRole="user";
  const linkClass = "transition px-2 py-1 rounded font-medium";
  const activeClass = "text-blue-300";
//  let jayakrishna="test";
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-lg sm:text-xl font-bold dark:text-white">
           Digital Banking 
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {userRole ==="user" && (
            <>
            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>
          </>
          )}
           {/* {userRole ==="admin" && (
            <NavLink
            to="/home"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>
           )} */}
          {/* <ThemeSwitcher /> */}
          {/* <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button> */}
          <LogoutButton />
        </nav>

        <div className="md:hidden pl-3 absolute right-5 top-3 md:static md:right-auto md:top-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/policies"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Policies
            </NavLink>
            <NavLink
              to="/investments"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Investments
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/calculator"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Calculator
            </NavLink>
            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                `${linkClass} block ${isActive ? activeClass : ""}`
              }
            >
              Alerts
            </NavLink>
            {/* <ThemeSwitcher /> */}
            {/* <LogOut color="blue" />
              <button
                onClick={handleLogout}
                className="w-full bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button> */}
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
