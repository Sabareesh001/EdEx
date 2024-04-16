const express = require('express')
const app =  express()
const Router = express.Router()
const pool = require('../modals/database')
const jwt = require('./jwthelper')
pool.getConnection((err,conn)=>{
    if(err) throw err
    Router.post('/checkLogin',(req,res)=>{
      let data =req.body
      conn.query(`SELECT id, username , password FROM users WHERE username= ?`,[req.body["username"]],(err,rows,fields)=>{
        if(err) throw err
        if(rows[0]["username"]===data["username"] && rows[0]["password"]===data["password"]   ){
          console.log("logged in")
          res.send({userId:rows[0]["id"],status:"1",Auth_token : jwt.generateToken({id:rows[0]["id"],name:rows[0]["username"]})})
        }
        else{
          console.log("wrong password")
          res.send("0")
        }
      })
    
    })
    Router.post('/validateUser',(req,res)=>{
      try{
         jwt.verifyToken(req.body["Auth_token"])
        console.log("success")
        res.send(true)
    }
      catch(err){
        console.log("failure")
        res.send(false)
      }
    
    })
    conn.release()
})

module.exports=Router
