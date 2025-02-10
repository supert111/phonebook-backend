// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

// const authMiddleware = (req, res, next) => {
//   // Отримання токену з заголовка
//   const token = req.headers.authorization?.split(" ")[1];

//   // Якщо токен відсутній
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }

//   // Перевірка наявності SECRET_KEY
//   if (!SECRET_KEY) {
//     console.error("SECRET_KEY is not defined in .env file");
//     return res.status(500).json({ message: "Internal server error" });
//   }

//   try {
//     // Верифікація токену
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded; // Додаємо декодовані дані до об'єкта запиту
//     next(); // Передаємо управління наступному middleware або контролеру
//   } catch (error) {
//     // Обробка помилок верифікації токену
//     console.error("Token verification failed:", error.message);
//     return res.status(401).json({ message: "Not authorized, invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token missing",
      code: "TOKEN_MISSING",
    });
  }

  if (!SECRET_KEY) {
    console.error("SECRET_KEY is not defined in .env file");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // Різні відповіді для різних типів помилок
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token format",
        code: "TOKEN_INVALID",
      });
    }

    return res.status(401).json({
      message: "Authentication failed",
      code: "AUTH_FAILED",
    });
  }
};

module.exports = authMiddleware;
