const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

// const connectDatabase = require("./config/database");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception - error
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due Uncaught Exception`);
	process.exit(1);
});

// config
dotenv.config({ path: "config/config.env" });
// dotenv.config({ path: "config/config.env" });

// connecting to database
connectDatabase();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
	console.log(`server is working on  http://localhost:${process.env.PORT}`);
});

// console.log(youtube);

// Unhandled Promise Rejection

// -> this this intensionally we need to shutdown server
process.on("unhandledRejection", (err) => {
	console.log(`Error : ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
