import { Container, CssBaseline } from "@mui/material";
import RecordList from "./RecordList";
import { useState } from "react";
import dayjs from "dayjs";

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <Container sx={{ mt: 0 }}>
      <CssBaseline />
      <RecordList
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Container>
  );
};

export default UserDashboard;
