const eventService = require("../services/event.service");

const getEventList = async (req, res) => {
  const { page, limit, isLive, sportGroup } = req.query;
  const ret = await eventService.getList(page, limit, isLive, sportGroup);
  res.status(200).json(ret);
};

module.exports = {
  getEventList,
};
