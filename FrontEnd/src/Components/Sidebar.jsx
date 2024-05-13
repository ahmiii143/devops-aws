import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import { FaHome, FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaMoon, FaChartBar, FaPenSquare } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import {
  RiArrowLeftDoubleLine,
  RiArrowUpDoubleLine,
  RiArrowRightSLine,
} from "react-icons/ri";

const Sidebar = ({ mode, setMode }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode
  const [showSidebar, setShowSidebar] = useState(true); // State to track sidebar visibility
  const [userRole, setUserRole] = useState(""); // Initialize userRole state
  const isAdmin = role === "admin";
  const isUser = role === "user";
  const [showLeavesSubMenu, setShowLeavesSubMenu] = useState(false);

  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setDarkMode(!darkMode);

    // Toggle dark mode class on HTML element
    document.documentElement.classList.toggle("dark");

    // Toggle dark mode class on body element
    document.body.classList.toggle("dark");

    // Toggle dark mode class on sidebar element
    const sidebarElement = document.querySelector(".sidebar");
    if (sidebarElement) {
      sidebarElement.classList.toggle("dark");
    }

    // Update mode state in parent component if needed
    if (mode !== undefined && setMode !== undefined) {
      setMode(darkMode ? "light" : "dark");
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleLeavesSubMenu = () => {
    setShowLeavesSubMenu(!showLeavesSubMenu);
  };

  useEffect(() => {
    if (
      !isActiveLink("/home/leave") &&
      !isActiveLink("/home/userleavedashboard") &&
      !isActiveLink("/home/adminleavedashboard")
    ) {
      setShowLeavesSubMenu(false);
    }
  }, [location]);
  return (
    <div>
      {showSidebar ? (
        <RiArrowLeftDoubleLine
          onClick={toggleSidebar}
          className="fixed z-50 ml-72 mt-80 text-[#19B0E7] text-3xl focus:outline-none transform cursor-pointer"
          title="Close Sidebar"
        />
      ) : (
        <RiArrowLeftDoubleLine
          onClick={toggleSidebar}
          className="fixed z-50 ml- mt-80 rotate-180 text-[#19B0E7] text-3xl focus:outline-none transform cursor-pointer"
          title="Open Sidebar"
        />
      )}
      {showSidebar && (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] mt-0 bg-[#19B0E7]">
          <div>
            <img
              src="/src/assets/Images/sidebarlogo.png"
              alt="Your Logo"
              style={{ marginTop: "20px" }}
            />
            <div className="h-[2px] bg-white opacity-50 my-4" />
            <div className="mx-6 px-6 py-4 mt-50">
              <Link to="/home" title="home"></Link>
            </div>
            <ul className="space-y-2 tracking-wide ">
              <li>
                <Link
                  to="/home"
                  aria-label="dashboard"
                  className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg text-black ${
                    isActiveLink("/home") ? "btn-style" : ""
                  }`}>
                  <FaHome
                    className={`w-6 h-6 ${
                      isActiveLink("/home") ? "text-white" : "text-white"
                    }`}
                  />
                  <span
                    className={`-mr-1 font-medium ${
                      isActiveLink("/home") ? "text-white" : "text-white"
                    }`}>
                    Home
                  </span>
                </Link>
              </li>
              {role === "user" && (
                <li>
                  <Link
                    to="/home/attendence"
                    className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                      isActiveLink("/home/attendence")
                        ? "btn-style text-white"
                        : " "
                    }`}>
                    <FaUserCheck
                      className={`w-6 h-6 ${
                        isActiveLink("/home/attendence")
                          ? "text-white"
                          : "text-white "
                      }`}
                    />
                    <span
                      className={`-mr-1 font-medium ${
                        isActiveLink("/home/attendence")
                          ? "text-white"
                          : "text-white "
                      }`}>
                      Attendance
                    </span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/home/profile"
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                    isActiveLink("/home/profile") ? "btn-style text-white" : ""
                  }`}>
                  <CgProfile
                    className={`w-6 h-6 ${
                      isActiveLink("/home/profile")
                        ? "text-white"
                        : "text-white"
                    }`}
                  />
                  <span
                    className={`-mr-1 font-medium ${
                      isActiveLink("/home/profile")
                        ? "text-white"
                        : "text-white"
                    }`}>
                    Profile
                  </span>
                </Link>
              </li>
              {/* Settings option */}
              <li>
                <Link
                  to="/home/update-password" // Directly provide the path to the ChangePassword component
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                    isActiveLink("/home/update-password")
                      ? "btn-style text-white"
                      : ""
                  }`}>
                  <FaCog
                    className={`w-6 h-6 ${
                      isActiveLink("/home/update-password")
                        ? "text-white"
                        : "text-white"
                    }`}
                  />
                  <span
                    className={`-mr-1 font-medium ${
                      isActiveLink("/home/update-password")
                        ? "text-white"
                        : "text-white"
                    }`}>
                    Settings
                  </span>
                </Link>
              </li>

              <li>
                <div
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer ${
                    showLeavesSubMenu ? "btn-style text-white" : ""
                  }`}
                  onClick={toggleLeavesSubMenu}>
                  <CiCalendarDate
                    className={`w-6 h-6 ${
                      showLeavesSubMenu ? "text-white" : "text-white"
                    }`}
                  />
                  <span
                    className={`-mr-1 font-medium  ${
                      showLeavesSubMenu ? "text-white" : "text-white"
                    }`}>
                    Leaves
                  </span>
                  <RiArrowRightSLine
                    className={`text-white ${
                      showLeavesSubMenu ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {showLeavesSubMenu && (
                  <ul className="space-y-2 tracking-wide">
                    <li>
                      <Link
                        to="/home/leave"
                        className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                          isActiveLink("/home/leave")
                            ? "btn-style text-white"
                            : ""
                        }`}>
                        <FaPenSquare
                          className={`w-6 h-6 ${
                            isActiveLink("/home/leave")
                              ? "text-white"
                              : "text-white"
                          }`}
                        />
                        <span
                          className={`-mr-1 font-medium ${
                            isActiveLink("/home/leave")
                              ? "text-white"
                              : "text-white"
                          }`}>
                          Leave Form
                        </span>
                      </Link>
                    </li>
                    {isUser && (
                      <li>
                        <Link
                          to="/home/userleavedashboard"
                          className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                            isActiveLink("/home/userleavedashboard")
                              ? "btn-style text-white"
                              : ""
                          }`}>
                          <FaChartBar
                            className={`w-6 h-6 ${
                              isActiveLink("/home/userleavedashboard")
                                ? "text-white"
                                : "text-white"
                            }`}
                          />
                          <span
                            className={`-mr-1 font-medium ${
                              isActiveLink("/home/userleavedashboard")
                                ? "text-white"
                                : "text-white"
                            }`}>
                            Leave Request
                          </span>
                        </Link>
                      </li>
                    )}

                    {isAdmin && (
                      <li>
                        <Link
                          to="/home/adminleavedashboard"
                          className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                            isActiveLink("/home/adminleavedashboard")
                              ? "btn-style text-white"
                              : ""
                          }`}>
                          <FaChartBar
                            className={`w-6 h-6 ${
                              isActiveLink("/home/adminleavedashboard")
                                ? "text-white"
                                : "text-white"
                            }`}
                          />
                          <span
                            className={`-mr-1 font-medium ${
                              isActiveLink("/home/adminleavedashboard")
                                ? "text-white"
                                : "text-white"
                            }`}>
                            Leave Request
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t mb-0.1 ">
            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110">
              {darkMode ? (
                <FaMoon className="w-6 h-6 mb-2 space-x-2" />
              ) : (
                <FaSun className="w-6 h-6 mb-2 space-x-2" />
              )}
              <span>Dark Mode</span>
            </button>
            {/* Logout button */}
            <button className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110">
              <Link
                to="/"
                onClick={() => {
                  login(false);
                }}>
                <FaSignOutAlt className="w-6 h-6 mb-2 space-x-2" />
                <span>Logout</span>
              </Link>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
