import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Landing from "./screens/Landing";
import { checkToken } from "../src/utils/index"

const AuthRoute = ({ children }) => {
  const isAuthenticated = checkToken();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = checkToken();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthRoute><Welcome/></AuthRoute>}
        />
        <Route
          path="/login"
          element={<AuthRoute><Login/></AuthRoute>}
        />
        <Route
          path="/landing"
          element={<PrivateRoute><Landing /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;