const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  // Отримання токену з заголовка
  const token = req.headers.authorization?.split(" ")[1];

  // Якщо токен відсутній
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  // Перевірка наявності SECRET_KEY
  if (!SECRET_KEY) {
    console.error("SECRET_KEY is not defined in .env file");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    // Верифікація токену
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Додаємо декодовані дані до об'єкта запиту
    next(); // Передаємо управління наступному middleware або контролеру
  } catch (error) {
    // Обробка помилок верифікації токену
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = authMiddleware;
