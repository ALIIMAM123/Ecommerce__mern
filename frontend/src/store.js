import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
	productDetailsReducer,
	productReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/UserReducer";
// import { composeWithDevTools } from "react-devtools-extension";

const reducer = combineReducers({
	products: productReducer,
	productDetails: productDetailsReducer,
	user: userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let initialState = {};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(...middleware)),
	// const store = createStore(reducers, composeEnhancers(middleware));
);

export default store;
