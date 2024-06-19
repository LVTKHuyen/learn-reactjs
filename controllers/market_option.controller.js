const marketOptionService = require("../services/market_option.service");
const getMarketOptionList = async (req, res) => {
  const { page, limit, isLive, marketName, marketOptionName, source } =
    req.query;

  const ret = await marketOptionService.getOptionList(
    page,
    limit,
    isLive,
    marketName,
    marketOptionName,
    source
  );
  res.status(200).json(ret);
};

const createMarketOption = async (req, res) => {
  try {
    const { name, odds, marketId } = req.body;
    if (!marketId) {
      return res.status(400).json({ error: "MarketId is required" });
    }
    const market = await marketOptionService.createMarketOption(
      name,
      odds,
      marketId
    );
    if (market == "MARKET_ID_NOT_FOUND") {
      return res.status(404).json({ error: "Market id not found" });
    }
    return res.status(200).json(market);
  } catch (error) {
    console.error("Error creating market option:", error);
    return res.status(500).json({ error: "Failed to create market option" });
  }
};

const getOneMarketOption = async (req, res) => {
  try {
    const market = await marketOptionService.getOneMarketOption(req.params.id);
    if (!market) {
      return res.status(404).json({ error: "Market option not found" });
    }
    return res.json(market);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get market option" });
  }
};

const updateMarketOption = async (req, res) => {
  try {
    const updatedMarketOption = await marketOptionService.updateMarketOption(
      req.params.id,
      req.body
    );
    return res.json(updatedMarketOption);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update market option" });
  }
};

const deleteMarketOption = async (req, res) => {
  try {
    const marketId = req.params.id;

    const result = await marketOptionService.deleteMarketOption(marketId);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error deleting market option", error);

    return res.status(500).json({ error: "Failed to delete market option" });
  }
};

module.exports = {
  getMarketOptionList,
  createMarketOption,
  getOneMarketOption,
  updateMarketOption,
  deleteMarketOption,
};
