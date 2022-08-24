const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

// Init wallet
router.post("/init", walletController.init);
// Enable a wallet
router.post("/", walletController.enable);
// Deposits a wallet
router.post("/deposits", walletController.deposit);
// Withdraw a wallet
router.post("/withdrawals", walletController.withdraw);
// Show all wallet
router.get("/", walletController.myWallet);
// Update a wallet with token
router.patch("/", walletController.disableWallet);

module.exports = router;
