const mongoose=require('mongoose')

const partnerschema = new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    

})

const partnermodel = mongoose.model("partner",partnerschema)
module.exports=partnermodel