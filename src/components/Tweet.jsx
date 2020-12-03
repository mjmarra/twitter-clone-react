import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Tweet({ tweet }) {
	const dispatch = useDispatch();
	const loggedUser = useSelector((state) => state.userData.user);

	useEffect(() => {
		const URL = `https://twitter-clone-backend-khaki.vercel.app/api/users/${tweet.author.username}`;
		axios
			.get(URL, {
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
	}, []);

	function handleDelete() {
		const URL = `https://twitter-clone-backend-khaki.vercel.app/api/tweets/${tweet._id}`;
		axios
			.get(URL, {
				headers: {
					Authorization: "Bearer " + loggedUser.accessToken,
				},
			})
			.then((res) => {
				console.log(res);
				dispatch(actionCreators.deleteTweet(tweet._id));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleLike() {
		console.log(loggedUser.id);
		console.log(tweet._id);
		const URL = `https://twitter-clone-backend-khaki.vercel.app/api/tweets/${tweet._id}`;
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
				dispatch(actionCreators.likeTweet(loggedUser.id, tweet._id));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div>
			<div className="media">
				<div>
					<img
						src={tweet.author.image}
						alt="Foto"
						className="avatar-home mr-3"
					/>
				</div>
				<div className="media-body">
					<Link to={`/profile/${tweet.author.username}`}>
						<p className="my-0 profile-link d-inline-block">{`${tweet.author.firstname} ${tweet.author.lastname}`}</p>
					</Link>
					<span className="text-muted">@{tweet.author.username}</span>
					<p className="my-0">{tweet.content}</p>
					<small className="my-0 text-muted">
						{moment(tweet.createdAt).format(`DD/MM/YYYY - HH:mm:ss`)}
					</small>
					<small className="my-0 text-muted ml-4 mr-1">
						{tweet.likes.length} likes
					</small>
					{tweet.likes.includes(loggedUser.id) && (
						<i onClick={handleLike} className="fas fa-heart fa-xs"></i>
					)}
					{!tweet.likes.includes(loggedUser.id) && (
						<i onClick={handleLike} className="far fa-heart fa-xs"></i>
					)}
					{loggedUser.username === tweet.author.username && (
						<i
							onClick={handleDelete}
							className="fas fa-trash-alt fa-xs ml-3"
						></i>
					)}
				</div>
			</div>
			<hr className="my-4" />
		</div>
	);
}
