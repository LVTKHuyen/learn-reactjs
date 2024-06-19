const betService = require("../services/bet.service");
const getList = async (req, res) => {
  let { page, limit } = req.query;

  if (!page) {
    page = 1;
  }

  const ret = await betService.getBetList(page, limit);
  res.status(200).json(ret);
};

module.exports = {
  getList,
};
