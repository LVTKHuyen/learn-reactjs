const transactionService = require("../services/transaction.service");

const deposit = async (req, res) => {
  const { amount, description } = req.body;
  if (!amount) {
    return res.status(200).json({ code: 400, data: "amount is required" });
  }
  const ret = await transactionService.deposit(
    req.user.id,
    amount,
    description
  );
  res.status(200).json(ret);
};

const withdraw = async (req, res) => {
  const { amount, description } = req.body;
  if (!amount) {
    return res.status(200).json({ code: 400, data: "amount is required" });
  }
  const ret = await transactionService.withdraw(
    req.user.id,
    amount,
    description
  );
  res.status(200).json(ret);
};

const getList = async (req, res) => {
  let { kind, page, order,limit } = req.query;

  if (!page) {
    page = 1;
  }
 
  const ret = await transactionService.getList(kind, page, order,limit);
  res.status(200).json(ret);
};

const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  if (!id) {
    return res.status(200).json({ code: 400, data: "id is required" });
  }
  if (!status) {
    return res.status(200).json({ code: 400, data: "status is required" });
  }
  const ret = await transactionService.changeStatus(id, status);
  res.status(200).json(ret);
};
const getOne = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await transactionService.getOneTransaction(
      transactionId
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving transaction" });
  }
};

const deleteOne = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const result = await transactionService.deleteOneTransaction(transactionId);
    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting transaction" });
  }
};

module.exports = {
  deposit,
  withdraw,
  getList,
  updateStatus,
  getOne,
  deleteOne,
};
