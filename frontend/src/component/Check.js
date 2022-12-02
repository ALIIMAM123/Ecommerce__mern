import axios from "axios";

const Check = async () => {
	try {
		const data = await axios.get(
			"https://youtube138.p.rapidapi.com/auto-complete/",
			{
				header: {
					"X-RapidAPI-Key":
						"7182167f92msh9224615bc6dc523p10bb52jsn92108569411c",
					"X-RapidAPI-Host": "youtube138.p.rapidapi.com",
				},
				params: { q: "desp", hl: "en", gl: "US" },
			},
		);
		console.log(data);
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export default Check;
