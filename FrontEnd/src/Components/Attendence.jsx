import { Box, Container } from "@mui/system";
import PictureCam from "./PictureCam";
import { CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Attendence() {
  const { username, Api_EndPoint } = useContext(UserContext);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already checked in for the day
    const checkIfCheckedIn = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/${username}`
        );
        if (response.data && response.data.leavingTime != null) {
          setAttendanceMarked(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    checkIfCheckedIn();
  }, [username, Api_EndPoint]);

  function redirectToDashboard() {
    toast.success("You Have Already Marked Your Attendance For Today");
    navigate("/home");
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(#0, #0, #0)",
        padding: "30px",
      }}
    >
      <CssBaseline />
      <Container>
        {attendanceMarked ? redirectToDashboard() : <PictureCam />}
      </Container>
    </Box>
  );
}

export default Attendence;
