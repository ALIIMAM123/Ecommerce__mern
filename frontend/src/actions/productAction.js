import axios from "axios";
import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCESS,
	ALL_PRODUCT_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCESS,
	PRODUCT_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct =
	(keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
	async (dispatch) => {
		try {
			dispatch({
				type: ALL_PRODUCT_REQUEST,
			});

			let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

			if (category) {
				link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
			}
			const { data } = await axios.get(link);
			console.log(data, "fetchedData");
			dispatch({
				type: ALL_PRODUCT_SUCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_PRODUCT_FAIL,
				// payload: error.response.data.message,
				payload: error.message,
			});
		}
	};

export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		});

		const { data } = await axios.get(`/api/v1/product/${id}`);
		console.log(data, "fetchedData");
		dispatch({
			type: PRODUCT_DETAILS_SUCESS,
			payload: data.product,
		});
	} catch (error) {
		console.log(error.message, "mmmm");
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			// payload: error.response.data.message,
			payload: error.message,
		});
	}
};

// clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
