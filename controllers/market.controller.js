const marketService = require("../services/market.service");
const getMarketList = async (req, res) => {
  const { page, limit, name, isLive } = req.query;

  const ret = await marketService.getOneMarketList(page, limit, name, isLive);
  res.status(200).json(ret);
};

const createMarket = async (req, res) => {
  try {
    const { name, source, isLive, eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const market = await marketService.createMarket(
      name,
      source,
      isLive,
      eventId
    );
    if (market == "EVENT_ID_NOT_FOUND") {
      return res.status(404).json({ error: "Event id not found" });
    }
    return res.status(200).json(market);
  } catch (error) {
    console.error("Error creating market:", error);
    return res.status(500).json({ error: "Failed to create market" });
  }
};

const getOneMarket = async (req, res) => {
  try {
    const market = await marketService.getOneMarket(req.params.id);
    if (!market) {
      return res.status(404).json({ error: "Market not found" });
    }
    return res.json(market);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get market" });
  }
};

const updateMarket = async (req, res) => {
  try {
    const updatedMarket = await marketService.updateMarket(
      req.params.id,
      req.body
    );
    return res.json(updatedMarket);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update market" });
  }
};

const deleteMarket = async (req, res) => {
  try {
    const marketId = req.params.id;

    const result = await marketService.deleteMarket(marketId);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error deleting market", error);

    return res.status(500).json({ error: "Failed to delete market" });
  }
};

module.exports = {
  getMarketList,
  createMarket,
  getOneMarket,
  updateMarket,
  deleteMarket,
};
