"use strict";
const e = require("express");
var dbConn = require("../../config/db.config");
//wallet object create
var wallet = function (wallet) {
  this.name = wallet.name;
  this.active = wallet.active ? wallet.active : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

wallet.init = function (data, result) {
  dbConn.query("INSERT INTO users set ?", data, function (err, res) {
    console.log(res)
    if (err) {
      // console.log("error: ", err);
      result(err, null);
    } else {
      // console.log(data.token);
      result(null, data.token);
    }
  });
};


wallet.findWalletById = function (id, result) {
  dbConn.query(
    "Select * from wallet where customer_xid = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};


wallet.findById = function (id, result) {
  dbConn.query(
    "Select * from users where customer_xid = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

wallet.findToken = function (token, result) {
  dbConn.query(
    "Select * from users where token = ? ",
    token,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

wallet.updateUser = function (id, wallet, result) {
  dbConn.query(
    "UPDATE users SET token=? WHERE customer_xid = ?",
    [wallet, id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, wallet);
      }
    }
  );
};

wallet.updateWallet = function (id, result) {

  dbConn.query(
    "UPDATE wallet SET enabled='True',enabled_at=? WHERE customer_xid = ?",
    [new Date(),id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

wallet.disableWallet = function (id, result) {

  dbConn.query(
    "UPDATE wallet SET enabled='False',disabled_at=? WHERE customer_xid = ?",
    [new Date(),id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

wallet.depositWallet = function (data,id, result) {
  console.log(data)
    dbConn.query("INSERT INTO deposit set ?", data, function (err, res) {
      if(err) {
        result(err,err)
      }
      else {
        if(res) {
          dbConn.query(
            "UPDATE wallet SET balance= balance + ? WHERE customer_xid = ?",
            [data.amount,id],
            function (err, res) {
              if (err) {
                result(null, err);
              } else {
                result(null, res);
              }
            }
          );
        }
      }
    })
};

wallet.withdrawWallet = function (data,id, result) {
    dbConn.query("INSERT INTO withdraw set ?", data, function (err, res) {
      if(err) {
        result(err,err)
      }
      else {
        if(res) {
          dbConn.query(
            "UPDATE wallet SET balance= balance - ? WHERE customer_xid = ?",
            [data.amount,id],
            function (err, res) {
              if (err) {
                result(null, err);
              } else {
                result(null, res);
              }
            }
          );
        }
      }
    })
};

wallet.checkWallet = function (id, result) {
  dbConn.query(
    "Select * from wallet where customer_xid = ? ",
    id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = wallet;
