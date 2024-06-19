const walletService = require("../services/wallet.service");

const getWalletList =async(req,res)=>{
    const {page,limit} = req.query;

    const ret = await walletService.getList( page, limit );
    res.status(200).json(ret);   
}

module.exports = {
    getWalletList
}