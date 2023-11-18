import { combineReducers } from "redux";
import dummyReducer from "./dummyReducer";
import addToBagReducer from "./addToBagReducer";
import searchModalReducer from "./searchModalReducer";
import selectedProductReducer from "./selectedProductReducer";

const rootReducer = combineReducers({
  dummyReducer,
  addToBagReducer,
  searchModalReducer,
  selectedProductReducer,
});
export default rootReducer;
