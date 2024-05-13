import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./Components/UserProvider.jsx";
import { Toaster } from "react-hot-toast";
import "../setupEnv.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </React.StrictMode>
);
