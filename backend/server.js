const express = require('express')
const app =  express()
const http = require('http')
const request = require('request')
const server = http.createServer(app)
const pool = require('./modals/database')
const login = require('./authentication/login')
const register = require('./authentication/register')
const global_lounge = require('./messages/globalLounge')
const followers = require("./followers/followers")
const BodyParser = require('body-parser')
const multer = require('multer')
const {Server} = require('socket.io')
const fs = require('fs')
const io = new Server(server,{cors:{
  origin:"*"
}})
const cors = require('cors');
const session = require('express-session')
const jwt = require('jsonwebtoken')
const path = require('path')
const os = require('os')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, './uploads/images/profilePics');

  }
},
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage ,dest:'./uploads/images/profilePics'});
app.use(cors());
app.use(express.json())
app.use('/',login)
app.use('/',global_lounge)
app.use(register)
app.use(followers)
app.use('/uploads', express.static(__dirname + '/uploads'));
app.get('/sessionUserID', (req, res) => {
  try {
    const cookie = req.query.cookie;
    const userId = jwt.decode(cookie)["id"];
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
        socket.emit("responseGlobalMessages",JSON.parse(res.body))
        socket.broadcast.emit("responseGlobalMessages",JSON.parse(res.body))
        
      })
      
  })
  socket.on("follow",(data)=>{
    console.log("follow trigerred")
    socket.emit("followResponse",data)
  })
  socket.on("unfollow",(data)=>{
    console.log("unfollow trigerred")
    socket.emit("unFollowResponse",data)
  })
 

})



pool.getConnection((err,conn)=>{
    if(err) throw err
    console.log("database is connected")
    let userId
    app.get('/userInfo',(req,res)=>{
      if(req.query.cookie){
        const cookie = req.query.cookie;
        userId = jwt.decode(cookie)["id"];
      }
      else{
        userId = req.query.userId
      }   
      conn.query(`SELECT u.*, c.name collegeName,
      r.name roleName FROM users u  
       INNER JOIN college c ON c.id = u.college
       INNER JOIN role r  ON r.id = u.role
       WHERE u.id = ?`
       ,[userId],(err,rows,fields)=>{
         if(err)throw err
         
         res.send(rows)
       })
    })

    app.patch('/uploadProfilePhoto',upload.single('profilePhoto'),(req,res)=>{
      const { id }=req.body
      console.log("The id is : "+id)
      console.log(req.body)
      conn.query(`UPDATE users SET profile_photo = ? WHERE id = ?`,[req.file.path,id],(err)=>{
        if(err) throw err
        res.send("successfully added profilePhoto")
      })
    })
    
    app.put('/changeUserDetails',(req,res)=>{
      console.log("yes reached")
      console.log(req.body.username)
      conn.query(`UPDATE users SET username = ?,name = ?,college=?,age=?,role = ? WHERE id=?`,[req.body.username,req.body.name,1,req.body.age,req.body.role,req.body.id],(err)=>{
        if(err){
          throw  err
          res.send("failed to update the Changes")
        }
        else{
          res.send("Successfully updated Changes")
        }
            })
    })

    conn.release()
})

server.listen(3000,()=>{
    console.log("port is listening to 3000")
})