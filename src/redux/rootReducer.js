import { combineReducers } from "redux";
import userData from "./userData";
import tweets from "./tweets";

const rootReducer = combineReducers({
	userData,
	tweets
});

export default rootReducer;
