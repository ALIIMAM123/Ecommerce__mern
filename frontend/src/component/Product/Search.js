import React, { useState, Fragment } from "react";
import "./Products.css";
const Search = (props) => {
	const [keyword, setKeyword] = useState("");
	console.log(props);
	const { history, match } = props;

	console.log(match.params.keyword, "match");

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/products/${keyword}`);
		} else {
			history.push(`/products`);
		}
	};

	console.log(keyword, "keyword");
	return (
		<Fragment>
			<div className="check">
				<form className="searchBox" onSubmit={searchSubmitHandler}>
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<input type="submit" value="Search" className="submit-button" />
				</form>
			</div>
		</Fragment>
	);
};

export default Search;
