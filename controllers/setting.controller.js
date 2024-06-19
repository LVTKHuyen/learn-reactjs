const settingService = require("../services/setting.service");
const changePasswordUser = async (req, res) => {
  const { username, accountNumber, newPassword } = req.body;
  if (!username) {
    return res.status(200).json({ code: 400, data: "Username is required" });
  }
  if (!accountNumber) {
    return res
      .status(200)
      .json({ code: 400, data: "AccountNumber is required" });
  }
  if (!newPassword) {
    return res.status(200).json({ code: 400, data: "newPassword is required" });
  }
  const ret = await settingService.changePasswordUser(
    username,
    accountNumber,
    newPassword
  );
  res.status(200).json(ret);
};
const getNotificationList = async (req, res) => {
  const { page, limit } = req.query;
  const ret = await settingService.getNotificationList(page, limit);
  res.status(200).json(ret);
};

const markAsRead = async (req, res) => {
  const { notifyId, userId } = req.params;
  if (!userId || !notifyId) {
    return res
      .status(200)
      .json({ code: 400, data: "userId or notifyId is required" });
  }
  const ret = await settingService.markAsRead(userId, notifyId);
  res.status(200).json(ret);
};

const createNotify = async (req, res) => {
  const { userIds, title, content, type } = req.body;
  if (!title) {
    return res.status(200).json({ code: 400, data: "title is required" });
  }
  if (!content) {
    return res.status(200).json({ code: 400, data: "content is required" });
  }
  if (type === "group") {
    if (!userIds) {
      return res.status(200).json({ code: 400, data: "userId is required" });
    }
  }
  let dataValue = type === "group" ? JSON.parse(userIds) : null;
  const ret = await settingService.createNotify(
    dataValue,
    title,
    content,
    type
  );
  res.status(200).json(ret);
};
const getNotifyUserList = async (req, res) => {
  const { page, limit } = req.query;
  const { userId } = req.params;
  if (!userId) {
    return res.status(200).json({ code: 400, data: "userId is required" });
  }
  const ret = await settingService.getNotifyUserList(userId, page, limit);
  res.status(200).json(ret);
};

module.exports = {
  changePasswordUser,
  getNotificationList,
  markAsRead,
  createNotify,
  getNotifyUserList,
};
