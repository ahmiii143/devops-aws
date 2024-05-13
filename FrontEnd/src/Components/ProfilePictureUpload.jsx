import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Avatar, Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfilePictureUpload = () => {
  const {
    username,
    userProfilePic,
    setUserProfilePicture,
    fetchProfilePicture,
    Api_EndPoint,
  } = useContext(UserContext);

  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Fetch the user's profile picture on component mount
    fetchProfilePicture(username);
  }, [username, fetchProfilePicture]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    //upadting the selected file state
    setSelectedFile(file);

    //displaying image immediately in avatar
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserProfilePicture(reader.result);
    };
    if (file) {
      // reader.readAsDataURL(event.target.files[0]);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //storing image in formData
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.put(
        `${Api_EndPoint}/api/users/${username}/update-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response) {
        fetchProfilePicture(username); // Fetch the updated profile picture from the backend
        toast.success("Profile Picture Updated");
        setFile(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.log("Error Updating Profile Pic", err);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <label htmlFor="upload-avatar">
        <Avatar
          sx={{
            cursor: "pointer",
            m: 5,
            bgcolor: "grey",
            width: "200px",
            height: "200px",
            "&:hover": {
              "& .upload-icon": {
                display: "block",
              },
            },
          }}
          onClick={handleImageClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          alt="profile picture">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          ) : userProfilePic ? (
            <img
              src={`${Api_EndPoint}/uploads/Images/${userProfilePic}`} //fetching dymaically images from backend
              alt="ProfilePicture"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <>
              {isHovered && (
                <CameraAltIcon
                  className="upload-icon"
                  fontSize="large"
                  // color=""
                  // onClick={openFileDialog}
                />
              )}
            </>
          )}
        </Avatar>

        <input
          accept="image/*"
          id="upload-avatar"
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {file && (
          <div>
            <Button
              type="submit"
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
              variant="outlined">
              Upload
            </Button>
          </div>
        )}
      </label>
    </form>
  );
};

export default ProfilePictureUpload;
