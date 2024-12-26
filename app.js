const express = require("express");
const bodyParser = require("body-parser");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
