const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: Number,
    require: true,
  },
  role: {
    type: [String],
    require: true,
    default: ['USER'],
  },
  isPremium: {
    type: Boolean,
    require: true,
    default: false,
  },
  premiumTill: {
    type: String,
    require: true,
  },
});

const User = model('User', userSchema);
module.exports = User;
