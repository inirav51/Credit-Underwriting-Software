const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountsReceivalbleSchema = new Schema({
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


const accountsReceivalble = mongoose.model('accountsReceivalble', accountsReceivalbleSchema);
module.exports = accountsReceivalble;