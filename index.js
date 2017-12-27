const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

//Server set-up
const PORT = process.env.PORT || 4000;
// const server = http.createServer(app);

app.listen(PORT, function(err) {
	console.log("Server running in port: " + PORT);
});
