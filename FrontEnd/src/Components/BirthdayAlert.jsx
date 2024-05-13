import React, { useContext, useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import UserContext from "./UserContext";
import { Cake as CelebrationIcon } from "@mui/icons-material"; // Import Cake icon from Material-UI

const BirthdayAlert = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [birthdayAlert, setBirthdayAlert] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Add a cache-busting parameter to the API requests
        const uniqueIdentifier = Math.random().toString(36).substring(7);

        // Fetch total number of users
        const totalResponse = await axios.get(
          `${Api_EndPoint}/api/users?cacheBuster=${uniqueIdentifier}`,
        );

        // Check for birthdays
        const users = totalResponse.data.users;
        const today = dayjs();
        const birthdayUsers = users.filter(
          (user) =>
            dayjs(user.dob).month() === today.month() &&
            dayjs(user.dob).date() === today.date(),
        );

        if (birthdayUsers.length > 0) {
          setBirthdayAlert(
            <div severity="info">
              <CelebrationIcon severity="info" /> Today is the birthday of{" "}
              {birthdayUsers.map((user) => user.name).join(", ")}
            </div>,
          );
        } else {
          setBirthdayAlert(null);
        }
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };
    fetchRecords();
  }, [Api_EndPoint]);

  return (
    <Box>
      <CssBaseline />
      <Container>{birthdayAlert}</Container>
    </Box>
  );
};
export default BirthdayAlert;
