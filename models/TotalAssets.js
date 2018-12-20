const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalAssetsSchema = new Schema({
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

const totalAssets = mongoose.model('totalAssets', totalAssetsSchema);
module.exports = totalAssets;