import React from "react";
import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
	return (
		<>
			<nav style={{ padding: "2rem" }}>
				<Link to="/">Go Back</Link>
			</nav>
			<header style={{ textAlign: "center" }}>
			<Link to="http://localhost:5000/auth/github">Login with github</Link>
			</header>
			<main
				className="main"
			>
			</main>
			<footer></footer>
		</>
	);
};

export default Login;