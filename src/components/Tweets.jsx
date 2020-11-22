import React from "react";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

export default function Tweets() {
	const tweets = useSelector((state) => state.tweets);

	if (tweets) {
		return tweets.map((tweet, index) => {
			return <Tweet key={index} tweet={tweet} />;
		});
	} else {
		return <div></div>;
	}
}
