const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalCurrentAssetsSchema = new Schema({
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

const totalCurrentAssets = mongoose.model('totalCurrentAssets', totalCurrentAssetsSchema);
module.exports = totalCurrentAssets;