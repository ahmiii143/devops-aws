import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCallback, useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const PictureCam = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const { username, Api_EndPoint } = useContext(UserContext);

  useEffect(() => {
    const checkIfCheckedIn = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/${username}`
        );
        setCheckedIn(!!response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    checkIfCheckedIn();
  }, [username, Api_EndPoint]);

  useEffect(() => {
    setImgSrc(null);
  }, [checkedIn]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handlePicSubmit = async () => {
    const date = new Date();
    try {
      if (!checkedIn) {
        await axios.post(`${Api_EndPoint}/api/attendance`, {
          username: username,
          picture: imgSrc,
          entranceTime: date.toISOString(),
        });
        toast.success("Check-in Successful!");
        setCheckedIn(true);
      } else {
        await axios.put(`${Api_EndPoint}/api/attendance/${username}`, {
          leavingTime: date,
        });
        toast.success("Check-out Successful!");
        setCheckedIn(false);
      }
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#DBF3FA] px-80 py-10 rounded-md border border-white border-opacity-40 backdrop-blur-md ml-20 mb-10">
      <div className="mt-10 mb-8 ml-1.5 ">
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" className="max-w-full h-auto" />
        ) : (
          <Webcam
            height={500}
            width={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.8}
            mirrored={true}
          />
        )}
      </div>
      <div className="flex gap-2">
        {imgSrc ? (
          <>
            <Button
              variant="contained"
              className="w-32 btn-style"
              onClick={retake}
            >
              <RefreshIcon />
            </Button>
            <Button
              variant="contained"
              className="w-32 btn-style"
              onClick={handlePicSubmit}
            >
              {checkedIn ? <CheckIcon /> : "Check-in"}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className="w-72 btn-style"
            onClick={capture}
          >
            {checkedIn ? "Check-out" : "Check-in"} &nbsp;
            <CameraAltIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
