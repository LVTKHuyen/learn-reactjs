const bankService = require("../services/bank.service");

const getList = async (req, res) => {
  const { page, limit } = req.query;
  const ret = await bankService.getList(page, limit);
  res.status(200).json(ret);
};
const createBank = async (req, res) => {
  try {
    const { name, code, shortName } = req.body;
    if (!name) {
      return res.status(200).json({ code: 400, data: "Name is required" });
    }
    const bank = await bankService.createBank(name, code, shortName);
    return res.status(200).json(bank);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create bank" });
  }
};

// Get one bank by ID
const getOneBank = async (req, res) => {
  try {
    const bank = await bankService.getOneBank(req.params.id);
    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }
    return res.json(bank);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get bank" });
  }
};

// Update a bank by ID
const updateBank = async (req, res) => {
  try {
    const updatedBank = await bankService.updateBank(req.params.id, req.body);
    return res.json(updatedBank);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update bank" });
  }
};

// Delete a bank by ID
const deleteBank = async (req, res) => {
  try {
    const bankId = req.params.id;

    const result = await bankService.deleteBank(bankId);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete bank" });
  }
};

module.exports = {
  getList,
  createBank,
  getOneBank,
  updateBank,
  deleteBank,
};
