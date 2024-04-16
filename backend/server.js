const express = require('express')
const app =  express()
const http = require('http')
const request = require('request')
const server = http.createServer(app)
const pool = require('./modals/database')
const login = require('./authentication/login')
const register = require('./authentication/register')
const global_lounge = require('./messages/globalLounge')
const BodyParser = require('body-parser')
const {Server} = require('socket.io')
const io = new Server(server,{cors:{
  origin:"*"
}})
const cors = require('cors');
const session = require('express-session')
const jwt = require('jsonwebtoken')
const path = require('path')
const { hostname } = require('os')

app.use(cors());
app.use(BodyParser.json())
app.use('/',login)
app.use('/',global_lounge)
app.use(register)
app.get('/sessionUserID', (req, res) => {
  try {
    const cookie = req.query.cookie;
    const userId = jwt.decode(cookie)["id"];
    console.log(cookie);
    console.log(userId);
    res.send("" + userId);
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(500).send('Error decoding token');
  }
});

io.on('connection',(socket)=>{
  console.log('a user connected')
  socket.on("globalMessages",(data)=>{
        request("http://localhost:3000/globalMessages",(err,res)=>{
        if(err) throw err
        console.log(res.body)
        socket.broadcast.emit("responseGlobalMessages",JSON.parse(res.body))
        socket.emit("responseGlobalMessages",JSON.parse(res.body))
      })
      
  })
 

})



pool.getConnection((err,conn)=>{
    if(err) throw err
    console.log("database is connected")
    app.get('/userInfo',(req,res)=>{
          conn.query(`SELECT u.*, c.name collegeName,
         r.name roleName FROM users u  
          INNER JOIN college c ON c.id = u.college
          INNER JOIN role r  ON r.id = u.role
          WHERE u.id = ?`
          ,[req.query.userId],(err,rows,fields)=>{
            if(err)throw err
            
            res.send(rows)
          })
    })
    conn.release()
})

server.listen(3000,()=>{
    console.log("port is listening to 3000")
})