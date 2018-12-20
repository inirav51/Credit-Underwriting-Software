var Financials = require('../models/Financials');
var Cash = require('../models/Cash');
var AccountsPayable = require('../models/AccountsPayable');
var AccountsReceivable = require('../models/AccountsReceivable');
var CurrentPeriodPrincipal = require('../models/CurrentPeriodPrincipal');
var FixedAssets = require('../models/FixedAssets');
var Intangibles = require('../models/Intangibles');
var Inventory = require('../models/Inventory');
var LineOfCredit = require('../models/LineOfCredit');
var LongTermLiabilities = require('../models/LongTermLiabilities');
var OtherCurrentAssets = require('../models/OtherCurrentAssets');
var OtherCurrentLiabilities = require('../models/OtherCurrentLiabilities');
var OtherNonCurrentAssets = require('../models/OtherNonCurrentAssets');
var TotalAssets = require('../models/TotalAssets');
var TotalCurrentLiabilities = require('../models/TotalCurrentLiabilities');
var TotalCurrentAssets = require('../models/TotalCurrentAssets');

module.exports = (app) => {
  app.get('/api/financials', (req, res) => {

    Financials.find({
      user: req.user
    }, function (err, financials) {
      if (err) throw err;
      res.send(financials);
    });

  });

  // http://localhost:3000/api/financial?id=5c14e50a0f05787369f84b7e
  app.get('/api/financial', (req, res) => {
    Financials.find({
      _id: req.query.id,
      user: req.user
    }, async (err, financial) => {
      if (err) throw err;

      let cash = await Cash.find({
        financial: financial
      });
      let accountsPayable = await AccountsPayable.find({
        financial: financial
      });
      let accountsReceivable = await AccountsReceivable.find({
        financial: financial
      });
      let currentPeriodPrincipal = await CurrentPeriodPrincipal.find({
        financial: financial
      });
      let fixedAssets = await FixedAssets.find({
        financial: financial
      });
      let intangibles = await Intangibles.find({
        financial: financial
      });
      let inventory = await Inventory.find({
        financial: financial
      });
      let lineOfCredit = await LineOfCredit.find({
        financial: financial
      });
      let longTermLiabilities = await LongTermLiabilities.find({
        financial: financial
      });
      let otherCurrentAssets = await OtherCurrentAssets.find({
        financial: financial
      });
      let otherCurrentLiabilities = await OtherCurrentLiabilities.find({
        financial: financial
      });
      let otherNonCurrentAssets = await OtherNonCurrentAssets.find({
        financial: financial
      });
      let totalAssets = await TotalAssets.find({
        financial: financial
      });
      let totalCurrentLiabilities = await TotalCurrentLiabilities.find({
        financial: financial
      });
      let totalCurrentAssets = await TotalCurrentAssets.find({
        financial: financial
      });


      let result = {
        "Cash": formatRow(cash),
        "AccountsPayable": formatRow(accountsPayable),
        "AccountsReceivable": formatRow(accountsReceivable),
        "CurrentPeriodPrincipal": formatRow(currentPeriodPrincipal),
        "FixedAssets": formatRow(fixedAssets),
        "Intangibles": formatRow(intangibles),
        "Inventory": formatRow(inventory),
        "LineOfCredit": formatRow(lineOfCredit),
        "LongTermLiabilities": formatRow(longTermLiabilities),
        "OtherCurrentAssets": formatRow(otherCurrentAssets),
        "OtherCurrentLiabilities": formatRow(otherCurrentLiabilities),
        "OtherNonCurrentAssets": formatRow(otherNonCurrentAssets),
        "TotalAssets": formatRow(totalAssets),
        "TotalCurrentLiabilities": formatRow(totalCurrentLiabilities),
        "TotalCurrentAssets": formatRow(totalCurrentAssets)
      }
      res.send(result);
    });

  });

  app.post('/api/financial', (req, res) => {

    Financials.find({
      _id: req.query.id,
      user: req.user
    }, async (err, financial) => {
      if (err) throw err;
      
      await Financials.findOneAndUpdate(
        {_id: req.query.id},
        {
          buyerName:req.body.buyerName,
          statementQuality: req.body.statementQuality
        },
        {
          new: true
        }
      );

      let cash = await Cash.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.Cash),
        {
          new: true
        }
      );

      let accountsPayable = await AccountsPayable.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.AccountsPayable),
        {
          new: true
        }
      );
      let accountsReceivable = await AccountsReceivable.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.AccountsReceivable),
        {
          new: true
        }
      );
      let currentPeriodPrincipal = await CurrentPeriodPrincipal.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.CurrentPeriodPrincipal),
        {
          new: true
        }
      );
      let fixedAssets = await FixedAssets.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.FixedAssets),
        {
          new: true
        }
      );
      let intangibles = await Intangibles.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.Intangibles),
        {
          new: true
        }
      );
      let inventory = await Inventory.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.Inventory),
        {
          new: true
        }
      );
      let lineOfCredit = await LineOfCredit.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.LineOfCredit),
        {
          new: true
        }
      );
      let longTermLiabilities = await LongTermLiabilities.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.LongTermLiabilities),
        {
          new: true
        }
      );
      let otherCurrentAssets = await OtherCurrentAssets.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.OtherCurrentAssets),
        {
          new: true
        }
      );
      let otherCurrentLiabilities = await OtherCurrentLiabilities.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.OtherCurrentLiabilities),
        {
          new: true
        }
      );
      let otherNonCurrentAssets = await OtherNonCurrentAssets.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.OtherNonCurrentAssets),
        {
          new: true
        }
      );
      let totalAssets = await TotalAssets.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.TotalAssets),
        {
          new: true
        }
      );
      let totalCurrentLiabilities = await TotalCurrentLiabilities.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.TotalCurrentLiabilities),
        {
          new: true
        }
      );
      let totalCurrentAssets = await TotalCurrentAssets.findOneAndUpdate(
        {financial: financial},
        formatResponse(req.body.TotalCurrentAssets),
        {
          new: true
        }
      );

      let result = {
        "Cash": formatRow(cash),
        "AccountsPayable": formatRow(accountsPayable),
        "AccountsReceivable": formatRow(accountsReceivable),
        "CurrentPeriodPrincipal": formatRow(currentPeriodPrincipal),
        "FixedAssets": formatRow(fixedAssets),
        "Intangibles": formatRow(intangibles),
        "Inventory": formatRow(inventory),
        "LineOfCredit": formatRow(lineOfCredit),
        "LongTermLiabilities": formatRow(longTermLiabilities),
        "OtherCurrentAssets": formatRow(otherCurrentAssets),
        "OtherCurrentLiabilities": formatRow(otherCurrentLiabilities),
        "OtherNonCurrentAssets": formatRow(otherNonCurrentAssets),
        "TotalAssets": formatRow(totalAssets),
        "TotalCurrentLiabilities": formatRow(totalCurrentLiabilities),
        "TotalCurrentAssets": formatRow(totalCurrentAssets)
      }
      res.send(result);
    });

  });

  app.post('/api/financials', (req, res) => {

    let newFinancials = new Financials({
      user: req.user,
      buyerName: req.body.buyerName,
      statementQuality: req.body.statementQuality
    });

    newFinancials.save()
      .then((financial) => {
        let cash = new Cash(formatResponse(req.body.Cash, financial));
        cash.save();
        let accountsPayable = new AccountsPayable(formatResponse(req.body.AccountsPayable, financial));
        accountsPayable.save();
        let accountsReceivable = new AccountsReceivable(formatResponse(req.body.AccountsReceivable, financial));
        accountsReceivable.save();
        let currentPeriodPrincipal = new CurrentPeriodPrincipal(formatResponse(req.body.CurrentPeriodPrincipal, financial));
        currentPeriodPrincipal.save();
        let fixedAssets = new FixedAssets(formatResponse(req.body.FixedAssets, financial));
        fixedAssets.save();
        let intangibles = new Intangibles(formatResponse(req.body.Intangibles, financial));
        intangibles.save();
        let inventory = new Inventory(formatResponse(req.body.Inventory, financial));
        inventory.save();
        let lineOfCredit = new LineOfCredit(formatResponse(req.body.LineOfCredit, financial));
        lineOfCredit.save();
        let longTermLiabilities = new LongTermLiabilities(formatResponse(req.body.LongTermLiabilities, financial));
        longTermLiabilities.save();
        let otherCurrentAssets = new OtherCurrentAssets(formatResponse(req.body.OtherCurrentAssets, financial));
        otherCurrentAssets.save();
        let otherCurrentLiabilities = new OtherCurrentLiabilities(formatResponse(req.body.OtherCurrentLiabilities, financial));
        otherCurrentLiabilities.save();
        let otherNonCurrentAssets = new OtherNonCurrentAssets(formatResponse(req.body.OtherNonCurrentAssets, financial));
        otherNonCurrentAssets.save();
        let totalAssets = new TotalAssets(formatResponse(req.body.TotalAssets, financial));
        totalAssets.save();
        let totalCurrentLiabilities = new TotalCurrentLiabilities(formatResponse(req.body.TotalCurrentLiabilities, financial));
        totalCurrentLiabilities.save();
        let totalCurrentAssets = new TotalCurrentAssets(formatResponse(req.body.TotalCurrentAssets, financial));
        totalCurrentAssets.save();
      })
      .catch((err) => {
        console.log(err);
      })
    res.send('Ok')
  });

};

function formatRow(row) {
  if (row[0] == undefined && row[0] == null) {
    return []
  }
  return [
    {
      "year1": row[0].year1
    },
    {
      "year2": row[0].year2
    },
    {
      "year3": row[0].year3
    },
    {
      "year4": row[0].year4
    },
    {
      "year5": row[0].year5
    },
  ];
}

function formatResponse(response, financial = null) {
  if (response == undefined || response == null) {
    return {};
  }
  let h = {};
  response.map(v => Object.assign(h, v));
  if(financial === null) {
    delete h['_id']
  } else {
    h.financial = financial
  }
  return h;
}
