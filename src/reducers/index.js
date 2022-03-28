import {combineReducers} from "redux"
import {usersReducer} from "./usersReducer";
import {competitionsReducer} from "./compReducer"
import {participantReducer} from './participantReducer'
// import {compReducer} from "./competitionReducers"

export default combineReducers({
user: usersReducer,
comp: competitionsReducer,
part: participantReducer,

})