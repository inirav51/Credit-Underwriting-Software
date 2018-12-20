const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineOfCreditSchema = new Schema({
  financial: {
    type: Schema.Types.ObjectId,
    ref: 'financials'
  },
  year1: String,
  year2: String,
  year3: String,
  year4: String,
  year5: String
});

const lineOfCredit = mongoose.model('lineOfCredit', lineOfCreditSchema);
module.exports = lineOfCredit;