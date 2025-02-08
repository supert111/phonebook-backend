const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  getContacts,
  addContact,
  deleteContact,
} = require("../controllers/contacts");

// Отримати всі контакти
router.get("/", authMiddleware, getContacts);

// Додати новий контакт
router.post("/", authMiddleware, addContact);

// Видалити контакт за ID
router.delete("/:contactId", authMiddleware, deleteContact);

module.exports = router;
