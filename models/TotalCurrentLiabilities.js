const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalCurrentLiabilitiesSchema = new Schema({
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

const totalCurrentLiabilities = mongoose.model('totalCurrentLiabilities', totalCurrentLiabilitiesSchema);
module.exports = totalCurrentLiabilities;