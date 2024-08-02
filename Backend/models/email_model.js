const mongoose = require('mongoose');


// Making a Schema as real gmail and also given in task
const emailSchema = new mongoose.Schema({
  recipient:
  {
    type: String,
    required: true
  },
  subject:
  {
    type: String,
    required: true
  },
  body:
  {
    type: String,
    required: true
  },
  // I have not put required true in attachements as anyone may or may not have something to attach
  attachments:
    { type: String },
  scheduledtime:
  {
    type: Date,
    required: true
  },
  recurrance:
  {
    type: String,
    // Created enum to store different values together
    enum: ['none', 'daily', 'weekly', 'monthly', 'quarterly'], default: 'none'
  },
  recurringTime:
  { type: [String] }, 
  recurringDays:
  { type: [String] },
  recurringDates:
  { type: [Number] }
});


const Email = mongoose.model('Email', emailSchema);

module.exports = Email;




