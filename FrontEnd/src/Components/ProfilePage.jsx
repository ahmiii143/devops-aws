import { useContext, useState } from "react";
import UserContext from "./UserContext";
import ProfilePictureUpload from "./ProfilePictureUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { nameUser, username, Api_EndPoint, email, phNumber, dob } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: nameUser,
    email: email,
    username: username,
    phoneNo: phNumber,
    dob: dob,
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNo: false,
  });

  // Handling Form Data
  const handleValueChange = (event) => {
    const inputValue = event.target.value;

    // Allow only letters and spaces
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: filteredValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty fields
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = true;
    }
    if (!formData.phoneNo.trim()) {
      errors.phoneNo = true;
    }
    setFormErrors(errors);

    // If any field is empty, prevent form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      // Making an API call to update both phone number and date of birth
      await axios.put(`${Api_EndPoint}/api/users/${username}/update-profile`, {
        phoneNo: formData.phoneNo,
        dob: formData.dob,
      });
      toast.success("Profile Updated");
    } catch (err) {
      console.error("Error Updating Profile Data", err);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  function formatDate(dateString) {
    // Check if dateString is not empty or null
    if (dateString) {
      // Split the dateString at 'T' and take the first part
      return dateString.split("T")[0];
    }
    return ""; // Or return any default value you prefer if dateString is empty or null
  }

  return (
    <div className="max-w-2.5xl mx-auto mt-0">
      <h1 className="text-center text-3xl font-bold mb-20">
        Profile Information
      </h1>
      <div className="flex items-center justify-center ">
        <div
          className="flex items-center justify-center space-x-4 mb-4 border border-gray-300 p-24  pl-[-5] rounded-md shadow-2xl  bg-[#DBF3FA] pr-20 "
          style={{ boxShadow: "14px 12px 20px rgba(0, 0, 0, 0.6)" }}>
          <div className="w-1/2 border-r border-black mr-44 pr-10">
            <ProfilePictureUpload />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-1/2 ml-12 ">
              <div className="flex items-center space-x-4 mb-4 justify-end  ">
                <label htmlFor="name" className="label-style">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className={`input-style ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  value={formData.name}
                  onChange={handleValueChange}
                  maxLength="30"
                  disabled
                />
                {formErrors.name && (
                  <span className="text-red-500 block mt-1">
                    Please fill this field
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end ">
                {" "}
                {/* Changed div to flex */}
                <label htmlFor="email" className=" label-style ">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-style cursor-not-allowed"
                  value={email}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                {" "}
                {/* Changed div to flex */}
                <label htmlFor="username" className="label-style">
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  className="input-style cursor-not-allowed"
                  value={username}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                <label htmlFor="dob" className="label-style">
                  DOB:
                </label>
                <div className="flex items-center">
                  <input
                    id="dob"
                    type="date"
                    style={{ width: "210px" }}
                    className="input-style "
                    value={formatDate(formData.dob)}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        dob: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                <label htmlFor="phoneNo" className="label-style">
                  Phone:
                </label>
                <div>
                  <input
                    id="phoneNo"
                    type="tel"
                    className={`input-style ${
                      formErrors.phoneNo ? "border-red-500" : ""
                    }`}
                    value={formData.phoneNo}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        phoneNo: e.target.value,
                      }))
                    }
                  />
                  {formErrors.phoneNo && (
                    <span className="text-red-500 mt-1">
                      Please fill this field
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <button
                type="submit"
                className="mt-10  mr-48 px-7 py-2 rounded-md shadow-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-cyan-400 hover:to-sky-600">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
