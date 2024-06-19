const scoreUpdateService = require("../services/score_update.service");
const getScoreUpdateList = async (req, res) => {
  const { page, limit, score, name } = req.query;

  const ret = await scoreUpdateService.getScoreList(page, limit, score, name);
  res.status(200).json(ret);
};
const createScoreUpdate = async (req, res) => {
  try {
    const { score, name, eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const scoreUpdate = await scoreUpdateService.createScoreUpdate(
      score,
      name,
      eventId
    );
    if (scoreUpdate == "EVENT_ID_NOT_FOUND") {
      return res.status(404).json({ error: "Event id not found" });
    }
    return res.status(200).json(scoreUpdate);
  } catch (error) {
    console.error("Error creating score:", error);
    return res.status(500).json({ error: "Failed to create score" });
  }
};

const getOneScoreUpdate = async (req, res) => {
  try {
    const scoreUpdate = await scoreUpdateService.getOneScoreUpdate(
      req.params.id
    );
    if (!scoreUpdate) {
      return res.status(404).json({ error: "Score not found" });
    }
    return res.json(scoreUpdate);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get score" });
  }
};
const updateScoreUpdate = async (req, res) => {
  try {
    const updatedScore = await scoreUpdateService.updateScoreUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedScore);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update score" });
  }
};

const deleteScoreUpdate = async (req, res) => {
  try {
    const scoreUpdateId = req.params.id;

    const result = await scoreUpdateService.deleteScoreUpdate(scoreUpdateId);

    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error deleting score", error);

    return res.status(500).json({ error: "Failed to delete score" });
  }
};

module.exports = {
  getScoreUpdateList,
  createScoreUpdate,
  getOneScoreUpdate,
  updateScoreUpdate,
  deleteScoreUpdate,
};
