import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { loading, user } = useSelector((state) => state.user);
	const requiredToken = user?.token;

	console.log(requiredToken, "protectedRoute");

	const localToken = localStorage.getItem("token");
	// if (localToken === requiredToken) {
	// 	history.push("/account");
	// } else {
	// 	history.push("/login");
	// }

	return (
		<Fragment>
			{!loading && (
				<Route
					{...rest}
					render={(props) => {
						if (!localToken) {
							return <Redirect to="/login" />;
						} else {
							return <Component {...props} />;
						}
					}}
				/>
			)}
		</Fragment>
	);
};

export default ProtectedRoute;
