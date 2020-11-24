import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ModalContent({ hide, setUpdate }) {
	const loggedUser = useSelector((state) => state.userData.user);
	const [tweetContent, setTweetContent] = useState("");

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
			.then(hide())
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="modal-content bg-custom">
			<form onSubmit={handleSubmit}>
				<div className="modal-body bg-custom">
					<textarea
						name="content"
						rows="4"
						cols="20"
						className="form-control text-light bg-transparent"
						onChange={(e) => setTweetContent(e.target.value)}
						value={tweetContent}
						placeholder="¿Qué está pasando?"
					></textarea>
				</div>
				<div className="modal-footer">
					<button
						type="submit"
						className="btn btn-twitter rounded-pill px-3 my-2"
					>
						Twittear
					</button>
				</div>
			</form>
		</div>
	);
}
