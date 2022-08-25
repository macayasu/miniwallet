const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

// Init wallet
router.post("/init", walletController.init);
// Enable a wallet
router.post("/wallet", walletController.enable);
// Deposits a wallet
router.post("/wallet/deposits", walletController.deposit);
// Withdraw a wallet
router.post("/wallet/withdrawals", walletController.withdraw);
// Show all wallet
router.get("/wallet", walletController.myWallet);
// Update a wallet with token
router.patch("/wallet", walletController.disableWallet);

module.exports = router;
