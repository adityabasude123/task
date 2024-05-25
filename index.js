const connectDB = require("./db.util");
const Express = require("express");

const app = Express();
const port = process.env.PORT || 5000;

connectDB();

app.use(Express.json());

app.use("/api", require("./api.route"));

app.listen(port, () => console.log(`Server running on port ${port}`));
