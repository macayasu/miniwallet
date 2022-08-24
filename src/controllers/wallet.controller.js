"use strict";

const e = require('express');
const jwt = require('jsonwebtoken');
const wallet = require("../models/wallet.model");

exports.init = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0 || Object.values(req.body) == "") {
    res.status(400).send({ data: {
      error: {
        customer_xid: [
          "Missing data for required field."
        ]
      },
      status:"fail"
    } });
  } else {
    wallet.findById(req.body.customer_xid, function (err, id) {
      let token = "6b3f7dc70abe8aed3e56658b86fa508b472bf238"
      let users = {
        "customer_xid" : req.body.customer_xid,
        "token" : token
      }

      if(id.length < 1) {
        wallet.init(users,function (err, result) {
            res.json({
              data: {
                  token:result
                },
                status:"success"
            });
        });
      }
      else {
        wallet.updateUser(
          req.body.customer_xid,
          token,
          function (err, result) {
            res.json({
              data: {
                  token:result
                },
                status:"success"
            });
          }
        );
      }
    });
  }
    
};

exports.enable = function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  wallet.findToken(token, function (err, result) {
    result = Object.values(JSON.parse(JSON.stringify(result)))[0]
    if(result) {

    wallet.checkWallet(result.customer_xid, function (err, cw) {
      cw = Object.values(JSON.parse(JSON.stringify(cw)))[0]

      if(cw.enabled == 'False') {
         wallet.updateWallet(result.customer_xid,
          function (err, uw) {
            wallet.findWalletById(result.customer_xid, function (err, fw) {
              fw = Object.values(JSON.parse(JSON.stringify(fw)))[0]
                res.json({
                  status:"success",
                  data: {
                    wallet: {
                      id: fw.id_wallet,
                      owned_by: fw.owned_by,
                      status: fw.enabled == "True" ? "Enabled" : "",
                      enabled_at: fw.enabled_at,
                      balance: fw.balance
                    }
                    }
                });
            });
          }
        );
      }
      else {
        res.json({
          status:"fail",
          data: {
            error: "Already enabled"
            }
        });
      }
    });
    }
    
  });

  
};

exports.disableWallet = function (req, res) {
  if(req.body.is_disabled == 'true')
  {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  wallet.findToken(token, function (err, result) {
    result = Object.values(JSON.parse(JSON.stringify(result)))[0]
    if(result) {

    wallet.checkWallet(result.customer_xid, function (err, cw) {
      cw = Object.values(JSON.parse(JSON.stringify(cw)))[0]

      if(cw.enabled == 'True') {
         wallet.disableWallet(result.customer_xid,
          function (err, uw) {
            wallet.findWalletById(result.customer_xid, function (err, fw) {
              fw = Object.values(JSON.parse(JSON.stringify(fw)))[0]
                res.json({
                  status:"success",
                  data: {
                    wallet: {
                      id: fw.id_wallet,
                      owned_by: fw.owned_by,
                      status: fw.enabled == "True" ? "Enabled" : "Disabled",
                      disabled_at: fw.disabled_at,
                      balance: fw.balance
                    }
                    }
                });
            });
          }
        );
      }
      else {
        res.json({
          status:"fail",
          data: {
            error: "Already disabled"
            }
        });
      }
    });
    }
    
  });
  }
  
};

exports.myWallet = function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  wallet.findToken(token, function (err, result) {
  
    result = Object.values(JSON.parse(JSON.stringify(result)))[0]
    if(result) {
      wallet.findWalletById(result.customer_xid, function (err, wallet) {
        wallet = Object.values(JSON.parse(JSON.stringify(wallet)))[0]
        if(wallet.enabled != "False") {
          res.json({
            status:"success",
            data: {
              wallet: {
                id: wallet.id_wallet,
                owned_by: wallet.owned_by,
                status: wallet.enabled == "True" ? "Enabled" : "Disabled",
                enabled_at: wallet.enabled_at,
                balance: wallet.balance
              }
              }
          });
        }
        else {
          res.json({
            status:"fail",
            data: {
              error: "Wallet not activated."
              }
          });
        }
      });
    }
    });
};

exports.deposit = function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let amount = req.body.amount
  let reference_id = req.body.reference_id

  wallet.findToken(token, function (err, result) {
    result = Object.values(JSON.parse(JSON.stringify(result)))[0]
    if(result) {
      wallet.checkWallet(result.customer_xid, function (err, cw) {
        cw = Object.values(JSON.parse(JSON.stringify(cw)))[0]    
       if(cw.enabled != 'False') {
          let deposits = {
            "deposit_id" : 'ea0212d3-abd6-406f-8c67-868e814a2433',
            "amount" : amount,
            "reference_id" : reference_id,
            "deposit_by" : '526ea8b2-428e-403b-b9fd-f10972e0d6fe',
            "deposit_at" : new Date(),
            "wallet_id" : cw.id_wallet
          }       
          wallet.depositWallet(deposits,cw.customer_xid,
            function (err, uw) {
              if(err) {
                res.json({
                  status:"fail",
                  data: {
                    error: "Reference ID passed must be unique for every deposit."
                    }
                });
              }
              else {
                  res.json({
                    status:"success",
                    data: {
                      wallet: {
                        id: deposits.deposit_id,
                        deposited_by: deposits.deposit_by,
                        status: "success",
                        deposited_at: deposits.deposit_at,
                        amount: amount,
                        reference_id: reference_id
                      }
                      }
                  });
              }
              });
        }
        else {
          res.json({
            status:"fail",
            data: {
              error: "Wallet not activated."
              }
          });
        }
          }
        );
      
    }
    
  });

  
};

exports.withdraw = function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let amount = req.body.amount
  let reference_id = req.body.reference_id

  wallet.findToken(token, function (err, result) {
    result = Object.values(JSON.parse(JSON.stringify(result)))[0]
    if(result) {
      wallet.checkWallet(result.customer_xid, function (err, cw) {
        cw = Object.values(JSON.parse(JSON.stringify(cw)))[0] 
         
        if(cw.enabled != 'False') {
          let withdrawal = {
            "withdraw_id" : 'ea0212d3-abd6-406f-8c67-868e814a2433',
            "amount" : amount,
            "reference_id" : reference_id,
            "withdrawn_by" : '526ea8b2-428e-403b-b9fd-f10972e0d6fe',
            "withdrawn_at" : new Date(),
            "wallet_id" : cw.id_wallet
          }
          
          wallet.withdrawWallet(withdrawal,cw.customer_xid,
            function (err, uw) {
              console.log(err)
              if(err) {
                res.json({
                  status:"fail",
                  data: {
                    error: "Reference ID passed must be unique for every withdrawal."
                    }
                });
              }
              else {
                  res.json({
                    status:"success",
                    data: {
                      wallet: {
                        id: withdrawal.withdraw_id,
                        withdrawn_by: withdrawal.withdrawn_by,
                        status: "success",
                        withdrawn_at: withdrawal.withdrawn_at,
                        amount: amount,
                        reference_id: reference_id
                      }
                      }
                  });
              }
              });
        }
        else {
          res.json({
            status:"fail",
            data: {
              error: "Wallet not activated."
              }
          });
        }
        }
        );
      
    }
    
  });

  
};


