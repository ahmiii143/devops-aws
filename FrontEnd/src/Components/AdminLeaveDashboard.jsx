import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckCircle, Cancel, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";

const AdminLeaveDashboard = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for managing modal open/close
  const [selectedRequest, setSelectedRequest] = useState(null); // State for storing the selected leave request
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      console.log("API Response:", response.data); // Log the response data
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const updateLeaveRequest = async (userName, leaveRequestId, newStatus) => {
    console.log("User Name:", userName);
    console.log("Leave Request ID:", leaveRequestId);
    console.log("New Status:", newStatus);

    try {
      await axios.put(
        `http://localhost:3000/api/users/${userName}/updateLeaveRequest`,
        {
          leaveRequestId,
          newStatus,
        },
      );
      // Fetch users again to update the UI with the latest data
      fetchUsers();
      toast.success("Leave request updated successfully");
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast.error("Error updating leave request");
    }
    console.log("Leave request ID:", leaveRequestId); // Log leaveRequestId
  };

  // Function to open the modal and set the selected request
  const handleOpenModal = (request) => {
    // Find the user associated with the selected request
    const user = users.find((user) =>
      user.leaveRequests.some((req) => req._id === request._id),
    );
    setSelectedUser(user);
    setSelectedRequest(request);
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalOpen(false);
  };

  return (
    <>
      {/* Reason Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400, // Adjust the width as needed
            bgcolor: "white",
            p: 4,
            borderRadius: 4, // Add some border radius for a rounded look
          }}>
          {/* Close button */}
          <IconButton
            sx={{
              position: "absolute",
              top: 3,
              right: 18,
            }}
            onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          {/* Display selected request details */}
          {selectedRequest && selectedUser && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", marginBottom: 4 }}>
                Leave Request Details
              </Typography>
              {/* Additional input (text field) */}
              <TextField
                fullWidth
                label="Reason"
                variant="outlined"
                multiline // Enable multiline
                rows={4} // Set the number of rows to show initially
                value={selectedRequest ? selectedRequest.reason : ""}
                disabled={!selectedRequest} // Disable the field if no request is selected
              />
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <IconButton
                  onClick={() =>
                    updateLeaveRequest(
                      selectedUser.username, // Access username from the selected user
                      selectedRequest._id,
                      "disapproved",
                    )
                  }
                  color="error">
                  <Cancel />
                </IconButton>
                <IconButton
                  onClick={() =>
                    updateLeaveRequest(
                      selectedUser.username, // Access username from the selected user
                      selectedRequest._id,
                      "approved",
                    )
                  }
                  color="success">
                  <CheckCircle />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Box
        className=" items-center justify-center space-x-4 mb-4 border border-gray-300 p-24  pl-[-5] rounded-md shadow-2xl  bg-[#DBF3FA] pr-20"
        paddingBottom={3}
        boxShadow={3}
        mb={4}
        p={5}
        borderRadius={4}
        ml={40}
        mt={2}
        width={"80%"}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Leave Requests
        </Typography>
        <Divider
          variant="middle"
          sx={{
            mt: 5,
            mb: 7,
            borderColor: "primary.main",
            borderWidth: 2,
          }}
        />
        <TableContainer component={Paper}>
          <Table className="bg-[#DBF3FA] ">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>User</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Leave Type</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Leave Subject</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Start Date</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>End Date</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Leaves</b>
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography variant="subtitle1">
                    <b>Status</b>
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Reason</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Status</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) =>
                user.leaveRequests.map((request) => {
                  console.log("Request:", request); // Log the request object
                  console.log("Request ID:", request._id); // Log the _id field
                  return (
                    <TableRow key={request._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>{request.leaveSubject}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>
                        <div className="ml-5">{request.leaveDays}</div>
                      </TableCell>
                      {/* <TableCell>{request.status}</TableCell> */}
                      <TableCell>
                        <div className="ml-3">
                          <IconButton onClick={() => handleOpenModal(request)}>
                            <Visibility />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.status === "approved" && (
                          <IconButton color="success">
                            <CheckCircle />
                          </IconButton>
                        )}
                        {request.status === "disapproved" && (
                          <IconButton color="error">
                            <Cancel />
                          </IconButton>
                        )}
                        {request.status !== "approved" &&
                          request.status !== "disapproved" && (
                            <div>Pending</div>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                }),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminLeaveDashboard;
