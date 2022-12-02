const express = require("express");
const app = express();
// imported middleware
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());


app.use(
	fileUpload({
		useTempFiles: true,
		
	}),
);
 
app.use(bodyParser.urlencoded({extended:true,parameterLimit:100000, limit:"1000mb"}))
app.use(bodyParser.json({limit :"1000mb"}));
// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
