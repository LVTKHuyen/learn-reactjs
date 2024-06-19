const sportService = require("../services/sport.service")

const getList = async (req, res) => {
    const { group, page, limit } = req.query;
    const ret = await sportService.getList(page,limit,group);
    res.status(200).json(ret);
}

module.exports = {
    getList
}