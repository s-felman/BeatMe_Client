import {combineReducers} from "redux"
import {usersReducer} from "./usersReducer";
import {competitionsReducer} from "./compReducer"
// import {compReducer} from "./competitionReducers"

export default combineReducers({
user: usersReducer,
comp: competitionsReducer,

})