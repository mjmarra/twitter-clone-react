import React, { useState, useEffect } from "react";
import Tweets from "./Tweets";
import Sidebar from "./Sidebar";
import LateralSidebar from "./LateralSidebar";
import "./twitter.css";
import "./CustomModal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import { Link } from "react-router-dom";
import useModal from "./useModal";
import CustomModal from "./CustomModal";

export default function Home() {
	const loggedUser = useSelector((state) => state.userData.user);

	const dispatch = useDispatch();
	const URL_users =
		"https://twitter-clone-backend-khaki.vercel.app/api/users/followed";
	const [tweetContent, setTweetContent] = useState("");
	const [update, setUpdate] = useState(false);

	// GET TWEETS
	useEffect(() => {
		axios
			.get(URL_users, {
				headers: {
					Authorization: "Bearer " + loggedUser.accessToken,
				},
			})
			.then((res) => {
				dispatch(actionCreators.saveTweets(res.data));
			})
			.catch((error) => {
				console.log(error);
			});
	}, [update]);

	// CREATE NEW TWEET
	function handleSubmit(e) {
		const URL_tweets =
			"https://twitter-clone-backend-khaki.vercel.app/api/tweets";
		e.preventDefault();
		axios
			.post(
				URL_tweets,
				{
					content: `${tweetContent}`,
				},
				{
					headers: {
						Authorization: "Bearer " + loggedUser.accessToken,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setTweetContent("");
				setUpdate(true);
			})
			.then(setUpdate(false))
			.catch((error) => {
				console.log(error);
			});
	}
	const { isShowing, toggle } = useModal();

	return (
		<div className="page-wrapper">
			<CustomModal isShowing={isShowing} hide={toggle} setUpdate={setUpdate} />
			<div className="row">
				<div className="col-3">
					<Sidebar toggle={toggle} />
				</div>
				<div className="col-9">
					<div className="row">
						<div className="col-lg-7">
							<div className="main-wrapper">
								<h4 className="pl-4">Inicio</h4>
								<hr />
								<form onSubmit={handleSubmit}>
									<div className="media">
										<div>
											<img
												src={loggedUser.image}
												alt="Profile"
												className="avatar-home mr-3"
											/>
										</div>
										<div className="media-body">
											<div className="form-group">
												<input
													type="text"
													className="form-control bg-transparent text-light"
													name="content"
													onChange={(e) => setTweetContent(e.target.value)}
													value={tweetContent}
													placeholder="¿Qué está pasando?"
													autoComplete="off"
												/>
											</div>
										</div>
									</div>
									<div className="text-right pr-4">
										<button
											type="submit"
											className="btn btn-twitter rounded-pill px-3 my-2"
										>
											Twittear
										</button>
									</div>
								</form>
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
