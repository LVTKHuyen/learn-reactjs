const userService = require("../services/user.service");

const getUserInfo = async (req, res) => {
  console.log(req.user);
  const ret = await userService.getInfo(req.user.id);
  res.status(200).json(ret);
};
const getUserList = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const userList = await userService.getUserList(page, limit);
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const result = await userService.deleteUser(userId);

  if (result.success) {
    return res.status(200).json({ success: true, message: result.message });
  } else {
    return res.status(400).json({ success: false, message: result.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    return res.status(200).json({ code: 400, data: "oldPassword is required" });
  }
  if (!newPassword) {
    return res.status(200).json({ code: 400, data: "newPassword is required" });
  }
  const ret = await userService.changePassword(
    req.user.id,
    oldPassword,
    newPassword
  );
  res.status(200).json(ret);
};

const changeExchangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    return res.status(200).json({ code: 400, data: "oldPassword is required" });
  }
  if (!newPassword) {
    return res.status(200).json({ code: 400, data: "newPassword is required" });
  }
  const ret = await userService.changeExchangePassword(
    req.user.id,
    oldPassword,
    newPassword
  );
  res.status(200).json(ret);
};

const changeBankInfo = async (req, res) => {
  const { bankId, accountHolder, accountNumber } = req.body;
  if (!bankId) {
    return res.status(200).json({ code: 400, data: "bankId is required" });
  }
  if (!accountHolder) {
    return res
      .status(200)
      .json({ code: 400, data: "accountHolder is required" });
  }
  if (!accountNumber) {
    return res
      .status(200)
      .json({ code: 400, data: "accountNumber is required" });
  }
  const ret = await userService.changeBankInfo(
    req.user.id,
    bankId,
    accountHolder,
    accountNumber
  );
  res.status(200).json(ret);
};
const updateUserAccount = async (req, res) => {
  const { nickname, phoneNumber } = req.body;
  if (!nickname) {
    return res.status(200).json({ code: 400, data: "nickname is required" });
  }
  if (!phoneNumber) {
    return res.status(200).json({ code: 400, data: "phoneNumber is required" });
  }
  const ret = await userService.updateUserAccount(
    req.user.id,
    nickname,
    phoneNumber
  );
  res.status(200).json(ret);
};

const updateUserStatus = async (req, res) => {
  const { id, status } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ code: 400, data: { status: false, message: "id is required" } });
  }
  if (!status) {
    return res
      .status(400)
      .json({
        code: 400,
        data: { status: false, message: "status is required" },
      });
  }

  try {
    const updatedUser = await userService.changeUserStatus(id, status);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserInfo,
  changePassword,
  changeExchangePassword,
  changeBankInfo,
  updateUserAccount,
  getUserList,
  deleteUser,
  updateUserStatus,
};
