const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose')


const app = express()
const port=process.env.PORT

// app.use((req,res,next)=>{
//    console.log(req.method,req.path)
//    next()
// })

// app.use((req,res,next)=>{
//     res.status(503).send('The server is under maintenance. Please try again later')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// email.sendWelcomeEmail('testmailid876@gmail.com','swathi')
// email.sendDeleteEmail('testmailid876@gmail.com','Swetha')

app.listen(port, () => {
    console.log('Server started successfully on port '+port)
})

// myFunction()