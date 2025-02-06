const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Маршрути
app.use("/users", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
