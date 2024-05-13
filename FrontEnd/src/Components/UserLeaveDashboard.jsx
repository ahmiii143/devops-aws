import React, { useState, useEffect, useContext } from "react";
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
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import UserContext from "./UserContext";
import DisplayCard from "./DisplayCard";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility } from "@mui/icons-material";

const UserLeaveDashboard = () => {
  const { username } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [leave, setLeave] = useState(0);
  const [reasonModalOpen, setReasonModalOpen] = useState(false); // State for managing modal open/close
  const [selectedReasonRequest, setSelectedReasonRequest] = useState(null); // State for storing the selected leave request

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:3000/api/users/${username}`,
      );

      setUser(response.data.leaveRequests);
      setLeave({
        leaveCount: response.data.leaveCount,
        unpaidLeaves: response.data.unpaidLeaves,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Function to open the modal and set the selected request
  const handleReasonOpenModal = (request) => {
    setSelectedReasonRequest(request);
    setReasonModalOpen(true);
  };

  // Function to close the modal
  const handleReasonCloseModal = () => {
    setSelectedReasonRequest(null);
    setReasonModalOpen(false);
  };

  return (
    <>
      {/* Reason Modal */}
      <Modal open={reasonModalOpen} onClose={handleReasonCloseModal}>
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
            onClick={handleReasonCloseModal}>
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          {/* Display selected request details */}
          {selectedReasonRequest && (
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
                value={
                  selectedReasonRequest ? selectedReasonRequest.reason : ""
                }
                disabled={!selectedReasonRequest} // Disable the field if no request is selected
              />
            </>
          )}
        </Box>
      </Modal>

      <div className="flex justify-between">
        <div className="container ml-80  cursor-pointer">
          <div className="relative shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center btn-style ">
            <div className="p-7">
              <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
                Your Remaining Leaves
              </h5>
              <h4 className="text-white text-3xl font-bold flex justify-center">
                {leave.leaveCount}
              </h4>
            </div>
          </div>
        </div>
        <div className="container ml-32  cursor-pointer">
          <div className="relative shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center btn-style ">
            <div className="p-7">
              <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
                Your Unpaid Leaves
              </h5>
              <h4 className="text-white text-3xl font-bold flex justify-center">
                {leave.unpaidLeaves}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Box
        className=" items-center justify-center space-x-4 mb-4 border border-gray-300 p-24  pl-[-5] rounded-md shadow-2xl  bg-[#DBF3FA] pr-20"
        paddingBottom={3}
        boxShadow={3}
        mb={4}
        p={5}
        borderRadius={4}
        ml={40}
        mt={15}
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
          <Table className="bg-[#DBF3FA]">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Leave Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Start Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    End Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Reason
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Leaves
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => {
                return (
                  <TableRow>
                    <TableCell>{user.leaveType}</TableCell>
                    <TableCell>{user.startDate}</TableCell>
                    <TableCell>{user.endDate}</TableCell>
                    <TableCell>
                      <div className="ml-3">
                        <IconButton onClick={() => handleReasonOpenModal(user)}>
                          <Visibility />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <div className="ml-6">{user.leaveDays}</div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserLeaveDashboard;
