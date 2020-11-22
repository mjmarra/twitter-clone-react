import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import axios from "axios";

const URL = "http://localhost:5000/api/users";

export default function Register() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	// const [image, setImage] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post(URL, {
				firstname: `${firstname}`,
				lastname: `${lastname}`,
				username: `${username}`,
				email: `${email}`,
				password: `${password}`,
			})
			.then((res) => {
				console.log(res.data);
				history.push("/");
			})
			.catch((error) => {
				console.log(error);
				history.push("/login");
			});
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 d-none d-md-block">
					<div className="intro"></div>
				</div>

				<div className="col-md-6">
					<div className="login-signup-wrapper">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="firstname">Firsname</label>
								<input
									type="text"
									name="firstname"
									onChange={(e) => setFirstname(e.target.value)}
									value={firstname}
									id="firstname"
									placeholder="Enter your firstname..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="lastname">Lastname</label>
								<input
									type="text"
									name="lastname"
									onChange={(e) => setLastname(e.target.value)}
									value={lastname}
									id="lastname"
									placeholder="Enter your lastname..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									name="username"
									onChange={(e) => setUsername(e.target.value)}
									value={username}
									id="username"
									placeholder="Enter your username..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									id="email"
									placeholder="Enter your email..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>
							<div className="form-group mb-5">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									id="password"
									placeholder="Enter your password..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>

							<button
								type="submit"
								name="button"
								className="btn btn-block btn-outline-twitter rounded-pill my-4"
								value="Upload"
							>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
