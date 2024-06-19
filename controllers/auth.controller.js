const auth = require("../services/auth.service");


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ code: 400, data: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ code: 400, data: 'Password is required' });
    }
    const loginResult = await auth.loginAdmin(email, password);
    res.status(loginResult.code).json(loginResult);
};
const getUserProfile = async (req, res) => {
    const getMeResult = await auth.getProfile(req.user.id);
    res.status(getMeResult.code).json(getMeResult);
}

module.exports = {
    login,
    getUserProfile,
}


