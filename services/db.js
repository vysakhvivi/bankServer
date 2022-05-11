const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/bankserver',{
    useNewUrlParser:true
})

const User=mongoose.model('User',{
    acno: Number,
    accntname: String,
    balance: Number, 
    pswd: Number, 
    transaction: []
})

module.exports={
    User
}