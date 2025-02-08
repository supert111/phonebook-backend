const Contact = require("../models/Contact");

// Отримати всі контакти користувача
const getContacts = async (req, res) => {
  const { id } = req.user;

  try {
    const contacts = await Contact.find({ owner: id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Додати новий контакт
const addContact = async (req, res) => {
  const { id } = req.user;
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ message: "Name and number are required" });
  }

  try {
    const newContact = await Contact.create({ name, number, owner: id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Видалити контакт за ID
const deleteContact = async (req, res) => {
  const { id } = req.user;
  const { contactId } = req.params;

  try {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send(); // 204 - No Content
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getContacts, addContact, deleteContact };
