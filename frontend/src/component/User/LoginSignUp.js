import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./loginSignUp.css";

// IMAGE
import Profile from "../../images/Profile.png";

// LOADER
import Loader from "../../Loader/Loader";
// ALERT
import { useAlert } from "react-alert";

// REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";

// ERROR FROM REDUX STORE

const LoginSignUp = ({ history }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user,
	);

	const userData = useSelector((state) => state.user);
	console.log(userData?.user?.avatar?.url, "userData");

	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const [avatar, setAvatar] = useState(null);
	// const [avatarPreview, setAvatarPreview] = useState(Profile);
	// console.log(avatar, "checkAvatar");

	const [logo, setLogo] = useState(Profile);

	const loginSubmit = (e) => {
		e.preventDefault();
		// console.log(" Login form submitted");
		dispatch(login(loginEmail, loginPassword));
		history.push("/account");
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			// debugger;
			setAvatar(e.target.files[0]);
			const reader = new FileReader();
			// reader.onload = (e) => {
			// 	if (reader.readyState === 2) {
			// 		setAvatar(reader.result);

			// 	}
			// };

			reader.onload = function (event) {
				// The file's text will be printed here
				console.log(event.target.result);
				// setAvatar(reader.result);
				setLogo(reader.result);
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	console.log(avatar, "avatar");

	const registerSubmit = (e) => {
		e.preventDefault();
		// console.log("Form Submitted");

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar, avatar.name);
		// console.log("Sign Up Form Submitted");

		console.log([...myForm], "myForm");
		dispatch(register(myForm));
		// console.log(myForm , "myForm")
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isAuthenticated) {
			history.push("/dashboard");
		}
	}, [dispatch, error, alert, history, isAuthenticated]);

	const switchTabs = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}

		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="LoginSignup-container">
						<div className="loginSignUp-Box">
							<div>
								<div className="login_SignUp_toggle">
									<p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
									<p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
								</div>
								<button ref={switcherTab}></button>
							</div>
							{/* {/  LOGIN FORM  /} */}
							<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
								{/*Email start */}
								<div className="loginEmail">
									<MailOutlineIcon />
									<input
										type="text"
										placeholder="Email"
										required
										value={loginEmail}
										onChange={(e) => setLoginEmail(e.target.value)}
									/>
								</div>
								{/*Email End */}

								{/*Password start */}
								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="Password"
										required
										value={loginPassword}
										onChange={(e) => setLoginPassword(e.target.value)}
									/>
								</div>
								{/*Password End */}
								<Link to="/password/forgot">Forgot Password ? </Link>
								<input type="submit" value="Login" className="loginBtn" />
							</form>

							{/* {/  REGISTER FORM /} */}
							<form
								className="signUpForm"
								ref={registerTab}
								encType="multipart/form-data"
								onSubmit={registerSubmit}
							>
								{/*signUp start -- name */}
								<div className="signUpName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={registerDataChange}
									/>
								</div>
								{/*signUp End -- name */}
								{/*signUp start -- Email */}
								<div className="signUpEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={registerDataChange}
									/>
								</div>
								{/*signUp End -- Email */}
								{/*signUp start -- Password */}
								<div className="signUpPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="Password"
										required
										name="password"
										value={password}
										onChange={registerDataChange}
									/>
								</div>
								{/*signUp End -- Password */}
								{/*signUp start -- Image Upload*/}
								<div id="registerImage">
									<img
										src={logo}
										alt="Avatar Preview"
										className="avatarImage"
										style={{ height: "3rem", width: "3rem" }}
									/>
									<input
										type="file"
										name="avatar"
										accept="image/*"
										// onChange={registerDataChange}
										// onChange={(event) => {
										// 	console.log(event.target.files[0]);
										// 	setAvatar(event.target.files[0]);
										// }}
										// onChange={(event) =>
										// 	setAvatar(
										// 		event.target.files[0],
										// 		setAvatarPreview(event.target.files[0]),
										// 	)
										// }
										onChange={registerDataChange}
									/>
								</div>
								{/*signUp End -- Image Upload*/}

								{/*signUp start -- SIGNUP BUTTON*/}
								<input
									type="submit"
									value="Register"
									className="signUpBtn"
									// disable={loading ? true : false}
								/>
								{/*signUp start -- SIGNUP BUTTON*/}
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default LoginSignUp;
