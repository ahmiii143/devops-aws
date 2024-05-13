import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { IconButton, InputAdornment } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext from "./UserContext";

export default function ChangePassword() {
  const { username, Api_EndPoint } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  //validation of ChangePasswordForm
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-{}|:;'"<>.?\\`~]).{8,}$/;

    // Validate password
    if (
      formData.password.length < 7 ||
      formData.password.length > 15 ||
      !passwordRegex.test(formData.password)
    ) {
      newErrors.password = "Enter a valid password between 7 and 15 characters";
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      );
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //handleChange Function
  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //handleForm Function
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axios.put(
          `${Api_EndPoint}/api/users/${username}/update-profile`,
          {
            password: formData.password,
          }
        );

        toast.success("Password Changed Successfully");

        //setting the form to empty
        setFormData({ password: "", confirmPassword: "" });
      } catch (err) {
        console.error("Error in Updating Password", err);
      }
    } else {
      //Password is not valid
      toast.error("Enter a Valid Password");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 23, marginLeft: "auto" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(219, 243, 250)",
          padding: "20px",
          margin: "12px",
          boxShadow: "14px 12px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 4, width: "100%" }}
        >
          <div className="mb-6 text-center text-black">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-semibold text-white-900 dark:text-black-900"
            >
              Enter New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="•••••••••"
              required
              name="password"
              value={formData.password}
              onChange={handleChanges}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-6 text-center text-black">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-lg font-semibold text-white-900 text-black-600"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="•••••••••"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChanges}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <Button
            className="btn-style"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
