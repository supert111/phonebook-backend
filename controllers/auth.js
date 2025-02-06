const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET_KEY } = process.env;

// Реєстрація
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res
      .status(201)
      .json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Логін
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Логаут
const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

// Поточний користувач
const getCurrentUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, logout, getCurrentUser };
