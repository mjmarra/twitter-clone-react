import React, { useState, useEffect } from "react";
import Tweets from "./Tweets";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import LateralSidebar from "./LateralSidebar";
import "./twitter.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfilePage() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const loggedUser = useSelector((state) => state.userData.user);

	const [user, setUser] = useState({});
	useEffect(() => {
		const URL = `https://twitter-clone-backend-five.vercel.app/api/users/${username}`;
		axios
			.get(URL)
			.then((res) => {
				setUser(res.data);
				dispatch(actionCreators.saveTweets(res.data.tweets));
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);

	function handleFollow(e) {
		const URL = `https://twitter-clone-backend-five.vercel.app/api/users/follow/${e.target.value}`;
		axios
			.put(
				URL,
				{},
				{
					headers: {
						Authorization: "Bearer " + loggedUser.accessToken,
					},
				}
			)
			.then((res) => {
				console.log(res);
				dispatch(actionCreators.follow(e.target.value));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleUnfollow(e) {
		const URL = `https://twitter-clone-backend-five.vercel.app/api/users/unfollow/${e.target.value}`;
		axios
			.put(
				URL,
				{},
				{
					headers: {
						Authorization: "Bearer " + loggedUser.accessToken,
					},
				}
			)
			.then((res) => {
				console.log(res);
				dispatch(actionCreators.unfollow(e.target.value));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="page-wrapper">
			<div className="row">
				<div className="col-sm-3">
					<Sidebar />
				</div>
				<div className="col-sm-9">
					<div className="row">
						<div className="col-lg-7">
							<div className="main-wrapper">
								<h4 className="pl-4">{`${user.firstname} ${user.lastname}`}</h4>
								<hr />
								<div className="media d-flex justify-content-between mb-3">
									<div>
										<img
											src={user.image}
											alt="Foto"
											className="avatar-profile mr-3"
										/>
									</div>
									<div>
										{loggedUser.id === user.id && (
											<Link to="/update">
												<button className="btn btn-outline-twitter rounded-pill mt-5">
													Configurar perfil
												</button>
											</Link>
										)}
										{loggedUser.id !== user.id &&
											!loggedUser.following.includes(user.id) && (
												<button
													className="btn btn-twitter rounded-pill mt-5"
													name="id"
													onClick={handleFollow}
													value={user.id}
												>
													Seguir
												</button>
											)}
										{loggedUser.id !== user.id &&
											loggedUser.following.includes(user.id) && (
												<button
													className="btn btn-twitter rounded-pill mt-5"
													name="id"
													onClick={handleUnfollow}
													value={user.id}
												>
													Dejar de seguir
												</button>
											)}
									</div>
								</div>
								<div className="personal-info">
									<h6>{`${user.firstname} ${user.lastname}`}</h6>
									<p className="my-0">@{user.username}</p>
									<p className="my-0">Se unió en enero de 2015</p>
									<p className="my-0">
										<span>
											{user.following && user.following.length} siguiendo
										</span>{" "}
										<span>
											{user.followers && user.followers.length} seguidores
										</span>
									</p>
									<p className="mt-4">Tweets</p>
								</div>
								<hr className="my-4" />
								<Tweets />
							</div>
						</div>
						<div className="col-lg-5">
							<LateralSidebar />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
