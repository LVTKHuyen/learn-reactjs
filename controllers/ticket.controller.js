const ticketService = require("../services/ticket.service");
const getTicketList = async (req, res) => {
  const { page, limit } = req.query;
  const ret = await ticketService.getList(page, limit);
  res.status(200).json(ret);
};

const createTicket = async (req, res) => {
  const { username, accountNumber, question } = req.body;
  if (!username) {
    return res.status(200).json({ code: 400, data: "Username is required" });
  }
  if (!accountNumber) {
    return res
      .status(200)
      .json({ code: 400, data: "AccountNumber is required" });
  }
  if (!question) {
    return res.status(200).json({ code: 400, data: "Question is required" });
  }
  const ret = await ticketService.createRequestTicket(req.body);
  res.status(200).json(ret);
};

const requestShowAnswer = async (req, res) => {
  const { username, accountNumber } = req.body;
  if (!username) {
    return res.status(200).json({ code: 400, data: "Username is required" });
  }
  if (!accountNumber) {
    return res
      .status(200)
      .json({ code: 400, data: "AccountNumber is required" });
  }
  const ret = await ticketService.requestShowAnswerTicket({
    username,
    accountNumber,
  });
  res.status(200).json(ret);
};

const answerRequestTicketUser = async (req, res) => {
  const { id, answer, status } = req.body;
  if (!id) {
    return res.status(200).json({ code: 400, data: "id is required" });
  }
  if (!answer) {
    return res.status(200).json({ code: 400, data: "Answer is required" });
  }
  if (!status) {
    return res.status(200).json({ code: 400, data: "Status is required" });
  }
  const ret = await ticketService.answerRequestTicketUser({
    id,
    answer,
    status,
  });

  res.status(200).json(ret);
};

module.exports = {
  getTicketList,
  createTicket,
  requestShowAnswer,
  answerRequestTicketUser
};
