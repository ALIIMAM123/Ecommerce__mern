import React, { Fragment, useEffect } from "react";
// import MetaData from "../../component/layout/MetaData";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "./profile.css";

const Profile = ({ history }) => {
	const { loading, user, isAuthenticated } = useSelector((state) => state.user);
	console.log(user, "userrrr");
	console.log(isAuthenticated, "isAuth");

	useEffect(() => {
		if (isAuthenticated === false) {
			history.push("/login");
		}
	}, [history, isAuthenticated, user]);

	console.log(user?.avatar?.url, "urrrr");
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="profileContainer">
					<div className="left-side">
						<div className="left-side-wrapper-container">
							<img
								src={user?.user?.avatar?.url}
								className="img__profile"
								alt="profile-imagee"
							/>
							<h3 className="profileName">{user?.name}</h3>
							<button className="update-user-buton">Edit Profile</button>
						</div>
					</div>
					<div className="right-side">
						<div className="fullName-container detail-container">
							<h4 className="email-heading"> Full Name</h4>
							<p className="email-para">{user?.user?.name}</p>
						</div>
						<div className="fullName-container detail-container">
							<h4 className="email-heading">Email</h4>
							<p className="email-para">{user?.user?.email}</p>
						</div>
						<div className="fullName-container detail-container">
							<h4 className="email-heading">Joined On</h4>
							<p className="email-para">{user?.user?.role}</p>
						</div>
						{/* <div className="order-container detail-container">
							<h4 className="email-heading">Email</h4>
							<p className="email-para">{user?.email}</p>
						</div> */}
						<div className="change-password-container myOrder">
							<button className="password-change-button">My Orders</button>
						</div>
						<div className="change-password-container changePassword">
							<button className="password-change-button">
								Change Password
							</button>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Profile;
