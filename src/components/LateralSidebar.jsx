import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./twitter.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LateralSidebar() {
	const loggedUser = useSelector((state) => state.userData.user);

	const [usersToFollow, setUsersToFollow] = useState(null);

	const URL = "http://localhost:5000/api/users";

	useEffect(() => {
		axios
			.get(URL, {
				headers: {
					Authorization: "Bearer " + loggedUser.accessToken,
				},
			})
			.then((res) => {
				setUsersToFollow(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="lateral-sidebar">
			<h5>A quién seguir</h5>

			{usersToFollow &&
				usersToFollow.map((user, index) => {
					return (
						<div key={index} className="media my-3">
							<div>
								<img
									src={user.image}
									alt="Foto"
									className="avatar-small mr-3"
								/>
							</div>
							<div className="media-body">
								<Link to={`/profile/${user.username}`}>
									<p className="my-0 profile-link">
										{`${user.firstname} ${user.lastname}`}
									</p>
								</Link>
								<p className="my-0 text-muted">{`@${user.username}`}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
}
