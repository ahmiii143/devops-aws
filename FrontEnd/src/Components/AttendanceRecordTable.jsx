import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FormatDateTime from "./FormatDateTime";

function AttendanceRecordTable({ attendanceRecord }) {
  if (attendanceRecord.length === 0) {
    return (
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl font-bold text-center mb-10">No Record</h1>
      </div>
    );
  }
  return (
    <Table
      stickyHeader
      sx={{
        minWidth: 650,
        mt: 3,
      }}
      size="small"
      aria-label="a dense table"
      className="w-full border-collapse ">
      <TableHead>
        <TableRow>
          <TableCell
            align="center"
            className="px-4 py-2 "
            style={{ backgroundColor: "#DBF3FA", color: "black" }}>
            Picture
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}>
            User Name
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}>
            Date
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}>
            Entrance Time
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}>
            Leave Time
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {attendanceRecord.map((record) => (
          <TableRow
            key={record._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            className="border-b border-black-200">
            <TableCell
              component="th"
              align="center" // Aligning the content horizontally to the center
              className="px-4 py-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                {record.picture ? (
                  <>
                    <Avatar sx={{ width: 70, height: 70 }}>
                      <img
                        src={record.picture}
                        alt="Attendance"
                        style={{ maxWidth: "100px" }}
                      />
                    </Avatar>
                  </>
                ) : (
                  "Not Found"
                )}
              </div>
            </TableCell>

            <TableCell align="center" className="px-4 py-2">
              {record.username}
            </TableCell>

            <TableCell
              component="th"
              align="center"
              scope="row"
              className="px-4 py-2">
              {FormatDateTime(record.entranceTime).formattedDate}
            </TableCell>

            <TableCell
              component="th"
              align="center"
              scope="row"
              className="px-4 py-2">
              {FormatDateTime(record.entranceTime).formattedTime}
            </TableCell>

            {record.leavingTime ? (
              <TableCell
                component="th"
                align="center"
                scope="row"
                className="px-4 py-2">
                {FormatDateTime(record.leavingTime).formattedTime}
              </TableCell>
            ) : (
              <TableCell
                component="th"
                align="center"
                scope="row"
                className="px-4 py-2">
                Didn&apos;t Check Out
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AttendanceRecordTable;
