import React, { Fragment, useState } from "react";
// import Faq from "react-faq-component";
// import UpArrow from "../../images/UpArrow.png";
import { BsFillNodePlusFill } from "react-icons/bs";
import "./Faq.css";

const data = {
	title: "faq",
	rows: [
		{ id: 1, Ques: "Accesories", Ans: "laptop" },

		{ id: 2, Ques: "Footware?", Ans: "footware" },

		{ id: 3, Ques: "Bottom?", Ans: "bottom" },
		{ id: 4, Ques: "Pants", Ans: "Jeans" },
		{ id: 5, Ques: "Shirt", Ans: "T-shirt" },
		{ id: 6, Ques: "Jacket", Ans: "Jacket" },
		{ id: 7, Ques: "what's tao?", Ans: "Shoes" },
	],
};

const MyFaq = (props) => {
	// const [itemId, setItemId] = useState(0);
	// const [mappedId, setMappedId] = useState(0);

	console.log(props, "props");
	const { handleCategoryChange } = props;

	// const handleItem = (e) => {
	// 	console.og(e, "event");
	// 	handleCategoryChange(e);
	// };

	const [toggle, setToggle] = useState(false);
	const handleToggle = (id) => {
		console.log(id, "id on click");
		setToggle(!toggle);
		// setItemId(id);
	};
	return (
		<Fragment>
			<div className="faq-container">
				{data?.rows?.map((item) => (
					<div className="heading-container" key={item.id}>
						<div
							className="ques-icon-container"
							style={{
								display: "flex",
								// backgroundColor: "green",
								width: "100%",
							}}
						>
							<p className="ques">{item.Ques}</p>
							<BsFillNodePlusFill
								className="cross-icon"
								color="rgba(171, 147, 244, 0.9)"
								onClick={handleToggle}
								// onClick={() => handleToggle(item.id)}
							/>
						</div>

						{data?.rows?.map(
							(eachId) =>
								// console.log(eachId, "eachId")
								console.log(eachId.id, "eachMappedId"),
							// setMappedId(eachId.id),
						)}

						{toggle && (
							<p
								className="select-item"
								onClick={() => handleCategoryChange(item.Ans)}
							>
								{item.Ans}
							</p>
						)}

						{/*<p
							className="select-item"
							onClick={() => handleCategoryChange(item.Ans)}
						>
							{item.Ans}
						</p> */}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default MyFaq;
