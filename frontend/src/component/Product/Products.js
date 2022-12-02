import React from "react";
import "./Products.css";

import { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
// import { clearError, getProduct } from "../../actions/productAction";
import { clearErrors, getProduct } from "../../actions/productAction";

import Loader from "../../Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import MyFaq from "./Faq";

// import Faq from "react-faq-component";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

// const categories = [
// 	"laptop",
// 	"footware",
// 	"bottom",
// 	"jeans",
// 	"T-shirt",
// 	"smart-phone",
// ];

const Products = ({ match }) => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 25000]);
	const [categoryItem, setCategoryItem] = useState("");
	const [ratings, setRatings] = useState(0);

	// const { products, loading, error, productsCount, resultPerPage } =
	// 	useSelector((state) => state.products);

	const {
		products,
		loading,
		productsCount,
		resultPerPage,
		filteredProductsCount,
		error,
	} = useSelector((state) => state.products);

	const priceHandler = (event, newPrice) => {
		setPrice(newPrice);
	};

	console.log(price, "price");

	// getting keyword from url;
	console.log(match, "match");
	console.log(match.params, "params");
	const keyword = match.params.keyword;

	console.log(keyword, "keyword");

	// console.log(match.params.keyword, "checking match");

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	console.log(currentPage, "currentPage");
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors);
		} else {
			dispatch(getProduct(keyword, currentPage, price, categoryItem, ratings));
		}
	}, [
		dispatch,
		keyword,
		currentPage,
		price,
		categoryItem,
		ratings,
		alert,
		error,
	]);

	let count = filteredProductsCount;

	const handleCategoryChange = (productName) => {
		console.log(productName, "productss");
		setCategoryItem(productName);
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div
					className="product2-container"
					style={{
						backgroundColor: "white",
						maxWidth: "100%",
						padding: "10px",
					}}
				>
					<MetaData title="PRODUCTS--ECOMMERCE" />

					<h2 className="heading">Product</h2>
					<div className="product2-wrapper-container">
						{/* ||  FILTER SECTION  ||  */}
						<div className="filter-container">
							<h1 className="filter-heading">FILTER BY PRICE</h1>
							<div className="filter-price-hr-line">
								<div className="filter-price-hr-line-2"></div>
							</div>
							<div className="slider-scrool">
								<Slider
									value={price}
									onChange={priceHandler}
									valueLabelDisplay="auto"
									aria-labelledby="range-slider"
									min={0}
									max={25000}
								/>
							</div>

							<h1 className="category-heading">FILTER BY CATEGORY</h1>
							{/*  FAQ SECTION */}
							<MyFaq handleCategoryChange={handleCategoryChange} />
							<h1 className="category-heading">FILTER BY RATING</h1>
							<fieldset className="fieldSet">
								<Typography component="legend" className="ratinglegend">
									Rating Above
								</Typography>
								<Slider
									value={ratings}
									onChange={(e, newRating) => {
										setRatings(newRating);
									}}
									min={0}
									max={5}
									aria-labelledby="continuous-slider"
									valueLabelDisplay="auto"
								/>
							</fieldset>
						</div>
						{/* ||  PRODUCT SECTION  ||  */}
						<div className="helloooo">
							<div className="product-container">
								{/*<h1 className="product-container">Product Container</h1> */}

								<div className="product--inner-container container">
									{products &&
										products.map((product) => (
											<ProductCard key={product._id} product={product} />
										))}
								</div>
							</div>
							<div className="pagination-container">
								{resultPerPage < count && (
									<div className="paginationBox">
										<Pagination
											activePage={currentPage}
											itemsCountPerPage={resultPerPage}
											totalItemsCount={productsCount}
											onChange={setCurrentPageNo}
											nextPageText="Next"
											prevPageText="Prev"
											firstPageText="1st"
											lastPageText="Last"
											itemClass="page-item"
											linkClass="page-link"
											activeClass="pageItemActive"
											activeLinkClass="pageLinkActive"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Products;
