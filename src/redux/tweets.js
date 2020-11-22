const initialState = [];

const removeTweet = (array, action) => {
	return array.filter((tweet) => tweet._id !== action.payload);
};

const likeTweet = (array, action) => {
	return array.map((tweet) => {
		if (tweet._id === action.payload.tweetId) {

			if (tweet.likes.includes(action.payload.userId)) {
				tweet.likes = tweet.likes.filter(id => id !== action.payload.userId)
				return {
					...tweet,
					likes: [...tweet.likes],
				};
			} else {
				return {
					...tweet,
					likes: [...tweet.likes, action.payload.userId],
				};
			}
		} else {
			return tweet;
		}
	});
};

export default function tweets(state = initialState, action) {
	switch (action.type) {
		case "SAVE_TWEETS":
			return [...action.payload];

		case "DELETE_TWEET":
			return removeTweet(state, action);

		case "LIKE_TWEET":
			return likeTweet(state, action);

		default:
			return state;
	}
}
