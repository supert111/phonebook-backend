const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Дозволяємо CORS для всіх доменів (для розробки)
app.use(cors());

// Middleware для обробки JSON
app.use(express.json());

// Масив для зберігання контактів (тимчасове рішення)
let contacts = [
  { id: 1, name: "John Doe", number: "123-456-7890" },
  { id: 2, name: "Jane Smith", number: "987-654-3210" },
];

// Отримати всі контакти
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Додати новий контакт
app.post("/contacts", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ message: "Name and number are required" });
  }

  const newContact = {
    id: contacts.length + 1, // Генеруємо новий ID
    name,
    number,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Видалити контакт за ID
app.delete("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  contacts.splice(contactIndex, 1);
  res.status(204).send(); // 204 - No Content
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
