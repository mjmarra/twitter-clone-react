import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import axios from "axios";
import { useSelector } from "react-redux";

const URL = "https://twitter-clone-backend-khaki.vercel.app/api/users/update";

export default function Register() {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedUser = useSelector((state) => state.userData.user);

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [image, setImage] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.put(
				URL,
				{
					firstname: `${firstname}`,
					lastname: `${lastname}`,
					username: `${username}`,
					image: `${image}`,
				},
				{
					headers: {
						Authorization: "Bearer " + loggedUser.accessToken,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				dispatch(
					actionCreators.updateUser(firstname, lastname, username, image)
				);
				history.push("/");
			})
			.catch((error) => {
				console.log(error);
				history.push("/");
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
								<label htmlFor="image">Image</label>
								<input
									type="text"
									name="image"
									onChange={(e) => setImage(e.target.value)}
									value={image}
									id="image"
									placeholder="Enter your image..."
									className="form-control bg-transparent text-light"
									required
								/>
							</div>

							<button
								type="submit"
								name="button"
								className="btn btn-block btn-outline-twitter rounded-pill my-5"
								value="Upload"
							>
								Update Details
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
