import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";
import { jsonReducer } from "./jsonReducer";

const rootReducer = combineReducers({
  search:searchReducer,
  user:userReducer,
  json:jsonReducer
})

export default rootReducer