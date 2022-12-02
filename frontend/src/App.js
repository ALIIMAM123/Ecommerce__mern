import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
// import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
// import Account from "./component/User/Account";

// store and load user to load user details when we  load the page  (using use Effect)
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOptions.js";

// react-redux
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";

// Protected Route
import ProtectedRoute from "./component/Route/ProtectedRoute";

import Todo from "./component/Todo";

function App() {
	// const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.user);
	console.log(user, "helloo");

	React.useEffect(() => {
		webFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"],
			},
		});

		store.dispatch(loadUser());
	}, []);
	return (
		<Router>
			<Header />
			{isAuthenticated && <UserOption user={user} />}
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/sad" component={Loader} />
				<Route exact path="/product/:id" component={ProductDetails} />
				<Route exact path="/products" component={Products} />
				<Route path="/products/:keyword" component={Products} />
				<ProtectedRoute exact path="/search" component={Search} />
				<ProtectedRoute exact path="/account" component={Profile} />
				<Route exact path="/login" component={LoginSignUp} />
				<Route exact path="/todo" component={Todo} />
			</Switch>

			{/* <Footer /> */}
		</Router>
	);
}

export default App;
