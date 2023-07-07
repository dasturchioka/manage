require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

app.get("/api", (req, res) => {
  return res.json({ msg: "Hello my friend!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server at ${process.env.PORT}`);
});
