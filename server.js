require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const contactsRouter = require("./routes/contacts");


const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3000', "https://huk-goit-react-hw-09-phonebook.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

// Перевірка наявності MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1); // Зупиняємо додаток, якщо змінна відсутня
}


// Підключення до MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Маршрути
app.use("/users", authRouter);
app.use("/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
