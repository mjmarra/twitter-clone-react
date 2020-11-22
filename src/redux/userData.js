const initialState = {
	loggedIn: false,
	user: {},
};

const removeFollowed = (array, action) => {
	return array.filter((user) => user !== action.payload);
};

export default function userData(state = initialState, action) {
	switch (action.type) {
		case "LOG_IN":
			return {
				loggedIn: true,
				user: { ...action.payload },
			};
		case "LOG_OUT":
			localStorage.clear();
			return {
				loggedIn: false,
				user: {},
			};
		case "FOLLOW":
			return {
				...state,
				user: {
					...state.user,
					following: [...state.user.following, action.payload],
				},
			};
		case "UNFOLLOW":
			return {
				...state,
				user: {
					...state.user,
					following: removeFollowed(state.user.following, action),
				},
			};
		case "UPDATE_USER":
			return {
				...state,
				user: {
					...state.user,
					username: action.payload.username,
					firstname: action.payload.firstname,
					lastname: action.payload.lastname,
					image: action.payload.image,
				},
			};

		default:
			return state;
	}
}
