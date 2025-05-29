const mongoose = require('mongoose');

  
const mySchema = new mongoose.Schema({
  image:String,
  modelno:{type: String, unique:true},
  type: String,
  status: String,
  roomno: String,
  dateAdded: { type: Date, default: Date.now },
  
});

const MyModel = mongoose.model('MyModel', mySchema);




module.exports = MyModel;
