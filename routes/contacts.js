const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  getContacts,
  addContact,
  deleteContact,
} = require("../controllers/contacts");

// Отримати всі контакти
router.get("/", protect, getContacts);

// Додати новий контакт
router.post("/", protect, addContact);

// Видалити контакт за ID
router.delete("/:contactId", protect, deleteContact);

module.exports = router;
