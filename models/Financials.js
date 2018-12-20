const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  buyerName: String,
  statementQuality: String
});

const Financials = mongoose.model('financials', financialsSchema);
module.exports = Financials;