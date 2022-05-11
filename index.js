const express= require('express')

const app=express()

//get to read data
app.get('/',(req,res)=>{
    res.send("Get Request")
})

//Import Middleware

const jwt=require('jsonwebtoken')

const cors=require('cors')

//using cors protocol

app.use(cors({
    origin:'http://localhost:4200'
}))

//parsing JSON
app.use(express.json())

//bank server register request
const dataservice= require('./services/data.service')

// used to create data(post)
app.post('/',(req,res)=>{
    res.send("Post Request")
})
//(used to completly update data)
app.put('/',(req,res)=>{
    res.send("Put Request")
})

//patch (used to partially update data)
app.patch('/',(req,res)=>{
    res.send("Patch Request")
})

//delete request

app.delete('/',(req,res)=>{
    res.send("Delete Request")
})

//Middleware API

const jwtmiddleware=(req,res,next)=>{
    try 
    {
        const token=req.headers["h-token"]
    const data=jwt.verify(token,'hellowmeow123456789')
    req.currentacno=data.currentacno
    next()
    }
    catch{
        res.status(401).json({
            status:false,
            message:"please Log in"
        })
    }
}

//register api
app.post('/register',(req,res)=>{
dataservice.register(req.body.acno,req.body.pswd,req.body.accntname)
.then(result=>{
    res.status(result.statuscode).json(result)
})

})

//Login API

app.post('/login',(req,res)=>{
    dataservice.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    })

//Deposit API

app.post('/deposit',jwtmiddleware,(req,res)=>{
   dataservice.deposit(req.body.acno,req.body.pswd,req.body.amnt)
   .then(result=>{
    res.status(result.statuscode).json(result)
})
     })

//Withdraw API

app.post('/withdraw',jwtmiddleware,(req,res)=>{
    dataservice.withdraw(req,req.body.acno,req.body.pswd,req.body.amnt)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    })

//Transaction API

app.post('/transaction',jwtmiddleware,(req,res)=>{
    dataservice.transaction(req.body.acno)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    })
    
//setting port number
app.listen(3000,()=>{
    console.log("The server is working at port 3000");
})

//ondelete

app.delete('/ondelete/:acno',jwtmiddleware,(req,res)=>{
    dataservice.deleteacc(req.params.acno)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
}
)
