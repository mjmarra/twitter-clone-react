export const actionCreators = {
	logIn: (
		accessToken,
		id,
		username,
		email,
		firstname,
		lastname,
		image,
		following
	) => {
		return {
			type: "LOG_IN",
			payload: {
				accessToken,
				id,
				username,
				email,
				firstname,
				lastname,
				image,
				following,
			},
		};
	},
	logOut: () => {
		return {
			type: "LOG_OUT",
			// payload: data,
		};
	},

	updateUser: (firstname, lastname, username, image) => {
		return {
			type: "UPDATE_USER",
			payload: { firstname, lastname, username, image },
		};
	},

	saveTweets: (tweets) => {
		return {
			type: "SAVE_TWEETS",
			payload: tweets,
		};
	},
	deleteTweet: (tweetId) => {
		return {
			type: "DELETE_TWEET",
			payload: tweetId,
		};
	},
	likeTweet: (userId, tweetId) => {
		return {
			type: "LIKE_TWEET",
			payload: { userId, tweetId },
		};
	},
	follow: (followedId) => {
		return {
			type: "FOLLOW",
			payload: followedId,
		};
	},
	unfollow: (unfollowedId) => {
		return {
			type: "UNFOLLOW",
			payload: unfollowedId,
		};
	},
};
