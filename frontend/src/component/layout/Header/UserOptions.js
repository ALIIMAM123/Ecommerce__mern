import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

// react-router-dom-v5
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { useAlert } from "react-alert";

// Action import
import { logout } from "../../../actions/userAction";
//BackDrop
import { Backdrop } from "@material-ui/core";

// cookies
// import { Cookies } from "react-cookie";

const UserOptions = ({ user }) => {
	const requiredToken = useSelector((state) => state.user.user.token);
	console.log(requiredToken, "reqToken");
	const history = useHistory();
	const alert = useAlert();
	const dispatch = useDispatch();

	console.log(user, "xxxxxx");
	// const { avatar } = user;
	// console.log(avatar, "avatarrrr");
	const [open, setOpen] = useState(false);
	const options = [
		{ icon: <ListAltIcon />, name: "Order", func: orders },
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{ icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
	];

	if (user?.role === "admin") {
		options.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function dashboard() {
		history.push("/dashboard");
	}

	function orders() {
		history.push("/orders");
	}

	function account() {
		const localToken = localStorage.getItem("token");
		if (localToken === requiredToken) {
			history.push("/account");
		} else {
			history.push("/login");
		}
	}

	function logoutUser() {
		localStorage.removeItem("token");
		dispatch(logout());
		alert.success("Logout Succesfully");
		history.push("/login");
	}

	return (
		<Fragment>
			<Backdrop open={open} style={{ zIndex: 10 }} />
			<SpeedDial
				ariaLabel="SpeedDial example"
				style={{ zIndex: 999 }}
				className="speedDial"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				icon={
					<img
						className="speedDialIcon"
						src={user?.user?.avatar?.url || "/Profile.png"}
						alt="Profile"
					/>
				}
				direction="down"
			>
				{options.map((item) => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
					/>
				))}
			</SpeedDial>
		</Fragment>
	);
};

export default UserOptions;
