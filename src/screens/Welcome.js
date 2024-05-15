import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Welcome = () => {
  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Welcome to test app</h1>
      </header>
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            border: "1px solid gray",
            padding: "0.5rem 1rem",
            backgroundColor: "whitesmoke",
            color: "#333",
          }}
        >
          Login
        </Link>
      </main>
    </>
  );
};

export default Welcome;