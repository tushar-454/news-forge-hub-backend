const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

const User = model('User', userSchema);
module.exports = User;
