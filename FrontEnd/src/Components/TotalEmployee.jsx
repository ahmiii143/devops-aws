import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import TotalEmployeeRecord from "./TotalEmployeeRecord";

const TotalEmployee = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const { Api_EndPoint } = useContext(UserContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `${Api_EndPoint}/api/users/${selectedUser.username}/update-profile`,
        {
          name: newName,
          username: newUsername,
          email: newEmail,
          phoneNo: newPhoneNumber,
        },
      );
      toast.success("Profile Updated");

      // Fetch updated user data after successful update
      const response = await axios.get(`${Api_EndPoint}/api/users`);
      setUsers(response.data.users); // Update the local state with new data
    } catch (err) {
      console.error("Error Updating Profile Data", err);
      toast.error("Failed to update profile. Please try again later.");
    }
    handleCloseModal();
  };

  const handleDelete = async (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/${selectedUser.username}`,
      );
      toast.success("User deleted successfully");

      // Fetch updated user data after successful deletion
      const response = await axios.get(`${Api_EndPoint}/api/users`);
      setUsers(response.data.users); // Update the local state with new data
    } catch (err) {
      console.error("Error Deleting User", err);
      toast.error("Failed to delete user. Please try again later.");
    } finally {
      setIsDeleteModalOpen(false); // Close the delete confirmation modal
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box paddingTop={10} paddingLeft={35}>
      <CssBaseline />
      <Container>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Update Profile
            </Typography>
            {selectedUser && (
              <Box>
                <TextField
                  label="Name"
                  defaultValue={selectedUser.name}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  label="Username"
                  defaultValue={selectedUser.username}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <TextField
                  label="Email"
                  defaultValue={selectedUser.email}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <TextField
                  label="Phone Number"
                  defaultValue={selectedUser.phoneNumber}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <Box mt={2} textAlign="right">
                  <Button onClick={handleCloseModal}>Cancel</Button>
                  <Button variant="contained" onClick={handleUpdateProfile}>
                    Update Profile
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Confirm Deletion
            </Typography>
            {selectedUser && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Are you sure you want to delete the user: {selectedUser.name}?
                </Typography>
                <Box mt={2} textAlign="right">
                  <Button onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={confirmDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
        <Box
          bgcolor="#DBF3FA"
          paddingBottom={10}
          paddingTop={5}
          boxShadow={3}
          mb={4}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3, color: "text.primary" }}>
            Total Employees
          </Typography>
          <Divider
            variant="middle"
            sx={{
              mt: 7,
              mb: 7,
              borderColor: "primary.main",
              borderWidth: 2,
            }}
          />
          <TotalEmployeeRecord
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TotalEmployee;
