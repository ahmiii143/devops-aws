import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import sidebarlogo from "../assets/Images/sidebarlogo.png";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "./UserContext";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Please enter a name";
      isValid = false;
    }
    if (!formData.userName) {
      newErrors.userName = "Please enter a unique username";
      isValid = false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (
      formData.password.length < 7 ||
      formData.password.length > 15 ||
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\-{}|:;\\'\\",<.>/?\\`~]).{8,}$/.test(
        formData.password,
      )
    ) {
      newErrors.password =
        "Please enter a valid password between 7 and 15 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const usernameExists = await axios.get(
          `${Api_EndPoint}/api/users/exists/${formData.userName}`,
        );
        if (usernameExists.data.exists) {
          toast.error(
            "Username already exists. Please choose a different username.",
          );
          return;
        }
        const apiEndpoint = "/api/users";
        await axios.post(`${Api_EndPoint}${apiEndpoint}`, {
          name: formData.name,
          username: formData.userName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Registered Successfully");
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      toast.error("Form is not valid");
    }
  };

  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center bg-gradient-to-r from-sky-600 to-cyan-400 text-white">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <p className="text-9xl text-white mt-1">Attendance</p>
          <img className="max-w-48 ml-auto" src={sidebarlogo} alt="logo" />
          <p className="text-4xl text-white mt-1">Welcome to Daily TimeSheet</p>
          <div className="flex justify-end  mt-6">
            <a
              href="#"
              className="hover:bg-gradient-to-r from-cyan-400 to-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-700 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 mt-10 p-5">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-[#DBF3FA] rounded-md shadow-2xl p-5 mb-10"
            onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-10 flex flex-col justify-center  ">
              SignUp
            </h1>
            <div className="flex items-center  mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              &nbsp;
              <input
                id="name"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChanges}
                maxLength="30"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="userName"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.userName ? "border-red-500" : ""
                }`}
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChanges}
                maxLength="25"
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-xs">{errors.userName}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v5a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M8 11a1 1 0 100-2 1 1 0 000 2zM4 15a1 1 0 100-2 1 1 0 000 2zM16 15a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="email"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChanges}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm4-2a1 1 0 00-1-1h2a1 1 0 000-2H6a1 1 0 00-1 1v2zM5 16a1 1 0 100-2h10a1 1 0 100 2H5z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="password"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChanges}
              />
              <button
                type="button"
                className="focus:outline-none ml-auto"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.071 12.543C17.23 14.859 14.311 16 12 16c-1.243 0-2.478-.282-3.623-.834m-1.426-.852C6.718 14.16 5.031 13 3 13c-1.419 0-2.604.737-3 1.776m3.966-7.327c1.662-1.907 3.887-3.16 6.334-3.522M21 12c-.276 0-.526-.112-.707-.293-.267-.267-.267-.701 0-.968C21.474 10.112 22 9.075 22 8c0-2.21-3.581-4-8-4s-8 1.79-8 4c0 1.075.526 2.112 1.707 2.739.267.267.267.701 0 .968-.267.267-.701.267-.968 0C2.526 12.112 2 11.075 2 10c0-3.158 5.373-6 10-6s10 2.842 10 6c0 1.075-.526 2.112-1.707 2.739-.267.267-.267.701 0 .968.181.181.431.293.707.293z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm4-2a1 1 0 00-1-1h2a1 1 0 000-2H6a1 1 0 00-1 1v2zM5 16a1 1 0 100-2h10a1 1 0 100 2H5z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="confirmPassword"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"} // Use showPassword state to toggle password visibility
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChanges}
              />
              <button
                type="button"
                className="focus:outline-none ml-auto"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.071 12.543C17.23 14.859 14.311 16 12 16c-1.243 0-2.478-.282-3.623-.834m-1.426-.852C6.718 14.16 5.031 13 3 13c-1.419 0-2.604.737-3 1.776m3.966-7.327c1.662-1.907 3.887-3.16 6.334-3.522M21 12c-.276 0-.526-.112-.707-.293-.267-.267-.267-.701 0-.968C21.474 10.112 22 9.075 22 8c0-2.21-3.581-4-8-4s-8 1.79-8 4c0 1.075.526 2.112 1.707 2.739.267.267.267.701 0 .968-.267.267-.701.267-.968 0C2.526 12.112 2 11.075 2 10c0-3.158 5.373-6 10-6s10 2.842 10 6c0 1.075-.526 2.112-1.707 2.739-.267.267-.267.701 0 .968.181.181.431.293.707.293z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
            <div className="flex justify-between items-center mb-8">
              <button
                type="submit"
                className="focus:outline-none bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-8 rounded-2xl">
                Register
              </button>
              <RouterLink
                to="/"
                className="text-sm text-gray-600 hover:underline">
                Already have an account? Login
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
