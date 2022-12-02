import {
	// LOGIN
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	// REGISTER
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,

	// LOAD USER
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,

	//    LOGOUT USER
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,

	// ERROR BOUNDARY
	CLEAR_ERRORS,
} from "../constants/UserConstant";

export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_USER_REQUEST:
		case LOAD_USER_REQUEST:
			// debugger;
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_USER_SUCCESS:
		case LOAD_USER_SUCCESS:
			console.log(action.payload, "checkingToken");
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				// user: action.payload,
				user: null,
			};
		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				error: action.payload,
				user: null,
			};
		case LOGIN_FAIL:
		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				error: action.payload,
				user: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
