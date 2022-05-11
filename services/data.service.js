const jwt= require('jsonwebtoken')

const db=require('./db')

database = {
    1000: { acno: 1000, accntname: "achu", balance: 4000, pswd: 1000, transaction: [] },
    1001: { acno: 1001, accntname: "kichu", balance: 5000, pswd: 1001, transaction: [] },
    1002: { acno: 1002, accntname: "sachu", balance: 6000, pswd: 1002, transaction: [] }

  }

  const register=(acno, pswd, accntname) => {

    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return {
          statuscode:401,
          status:false,
          message:"Account number already Exists.."
        }
      }
      else
      {
        const newUser=new db.User({
          acno,
          accntname,
          balance: 0,
          pswd,
          transaction: [] 
        })
        newUser.save()
        return {
          statuscode:200,
          status:true,
          message:" Successfully registered.. Log in Please !!"
        }
      }
    })
  }

const login=(acno, pswd) => {

return db.User.findOne({acno,pswd})
.then(user=>{
  if(user)
  {
    console.log(user);
  currentuser = user.accntname
  currentacno = acno
const token= jwt.sign({
  currentacno:acno
},'hellowmeow123456789')
        return {
          statuscode:200,
          status:true,
          message:" Successfully Logged in",
          token,
          currentacno,
          currentuser
        }
      }
      else
      {
        return {
          statuscode:401,
          status:false,
          message:"Incorrect Credentials"
        }
      }
})

}

  const deposit=(acno, pswd, amnt) =>{
    var amount = parseInt(amnt)

    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        user.balance += amount
        user.transaction.push({
          type: "CREDIT",
          amount: amount
        })
        user.save()
        return {
          statuscode:200,
          status:true,
          message:amount + " has been deposited.. The new balance is " + user.balance
        } 
        
      }
      else
      {
        return {
          statuscode:401,
          status:false,
          message:"Incorrect Credentials"
        }
      }

    })
  
  }

  //Withdraw API

  const withdraw=(req,acno,pswd,amnt)=> {
    var amount = parseInt(amnt)

  return db.User.findOne({acno,pswd})
  .then(user=>{
    if(req.currentacno!=acno){
      return {
        statuscode:401,
        status:false,
        message:"invalid Operation"
      }
    }
    if(user){
      if (user.balance > amount) {
        user.balance -= amount
        user.transaction.push({
          type: "DEBIT",
          amount: amount
        })
        user.save()
        return {
          statuscode:200,
          status:true,
          message:amount + " has been withdrawn.. The new balance is " + user.balance

      }
    }
    else
    {
      return {
        statuscode:401,
        status:false,
        message:"Insufficient balance"
      }
    }
  }
    else
      {
        return {
          statuscode:401,
          status:false,
          message:"Incorrect Credentials"
        }
      }
  })
}

  //Transaction API

  const transaction=(acno)=>{

    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return {
          statuscode:200,
          status:true,
          transaction:user.transaction
      }
      }
      else
      {
        return {
          statuscode:401,
          status:false,
          message:"User doesnot Exists..Please Register..!!! "
      }
      }
    })
  }

const deleteacc=(acno)=>{
return db.User.deleteOne({acno})
.then(user=>{
  if(!user){
    return {
      statuscode:401,
      status:false,
      message:"Operation Failed !! "
  }
}
  else
  {
    return {
      statuscode:200,
      status:true,
     message:"Account number"+acno+ "deleted Successfully.."
  }
  }
})
  }

  //export

  module.exports={
      register, login , deposit, withdraw,transaction,deleteacc
    }
  

