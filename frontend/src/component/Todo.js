import React, { useState } from "react";

const Todo = () => {
	const [name, setName] = useState("");
	const [formData, setFormData] = useState("");

	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	console.log(name);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormData(name);
	};
	return (
		<div
			className="todo-app"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<div className="inner-container">
				<p>NAME</p>
				<form type="submit" onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleInputChange}
						value={name}
						name="name"
					/>
					<button className="button">Add</button>
				</form>

				<p>{formData}</p>
			</div>
		</div>
	);
};

export default Todo;
