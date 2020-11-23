import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import axios from "axios";

const URL = "https://twitter-clone-backend-five.vercel.app/api/login";

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post(URL, {
				email: `${email}`,
				password: `${password}`,
			})
			.then((res) => {
				dispatch(
					actionCreators.logIn(
						res.data.accessToken,
						res.data.id,
						res.data.username,
						res.data.email,
						res.data.firstname,
						res.data.lastname,
						res.data.image,
						res.data.following
					)
				);
				console.log(res);
				Number(res.status) === 200 ? history.push("/") : history.push("/login");
			})
			.catch((error) => {
				console.log(error);
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
							<div className="form-group mt-4">
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
								className="btn btn-block btn-twitter rounded-pill mt-5"
								value="Upload"
							>
								Login
							</button>
							<Link
								className="btn btn-block btn-outline-twitter rounded-pill my-4"
								to="/register"
							>
								Sign Up
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
