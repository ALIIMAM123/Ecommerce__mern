import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
	return (
		<footer id="footer">
			{/* left Footer */}
			<div className="leftFooter">
				<h4>Download Our APP</h4>
				<p>Download App for Android and IOS mobile Phone</p>
				<img src={playStore} alt="playStore" />
				<img src={appStore} alt="playStore" />
			</div>
			{/* mid Footer */}
			<div className="midFooter">
				<h1>Ecommerce</h1>
				<p>High Quality is Our First Priority</p>
				<p>Copyright 2022 &copy; Ali</p>
			</div>
			{/* right Footer */}
			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="http://instagram.com/"> Instagram</a>
				<a href="http://instagram.com/">Youtube</a>
				<a href="http://instagram.com/">Facebook</a>
			</div>
		</footer>
	);
};

export default Footer;
