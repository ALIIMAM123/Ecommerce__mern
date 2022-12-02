import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "../constants/UserConstant";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.post(
			`/api/v1/login`,
			{ email, password },
			config,
		);
		console.log(data, "dattta");
		localStorage.setItem("token", data?.token);
		dispatch({ type: LOGIN_SUCCESS, payload: data });
	} catch (error) {
		console.log(error, "resposne_error");

		dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};

// REGISTER ACTION

export const register = (user) => async (dispatch) => {
	// console.log(user , "dattttta" )
	// debugger;
	// console.log(userData, "checkkiii");

	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = { headers: { "Content-Type": "multipart/form-data" } };
		const { data } = await axios.post(`api/v1/register`, user, config);
		console.log(data, "apiRes");
		dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
	} catch (error) {
		// console.log(error.response.data.message, "register_error");
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
			// payload: error.,
		});
	}
};

// LOAD USER ACTION
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });
		// const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.get(`/api/v1/me`);

		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		console.log(error, "resposne_error");

		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
	}
};

// LOGOUT USER ACTION
export const logout = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/v1/logout`);
		console.log(data.message, "logout");

		dispatch({ type: LOGOUT_SUCCESS, payload: data.message });
	} catch (error) {
		console.log(error, "resposne_error");

		dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
	}
};

//  CLEAR ERROR ACTION
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
