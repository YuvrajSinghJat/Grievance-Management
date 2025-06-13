const mongoose = require("mongoose");

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected Successfully");
	} catch (error) {
		console.error("MongoDB Connection Failed:", error.message);
		throw error;
	}
};

module.exports = { dbConnect };
