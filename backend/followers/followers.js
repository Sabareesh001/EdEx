const express = require('express')
const app =  express()
const Router = express.Router()
const pool = require('../modals/database')
const request = require('request')
pool.getConnection((err,conn)=>{
    Router.get('/no_of_followers',(req,res)=>{
        console.log(req.query)
       conn.query(`SELECT COUNT(id) count FROM followers WHERE following = ?`,[req.query.userId],(err,rows)=>{
        if(err) throw err
        console.log(rows)
        res.send(rows);
       })
    })
    Router.get('/no_of_following',(req,res)=>{
        conn.query(`SELECT COUNT(id) count FROM followers WHERE user = ?`,[req.query.userId],(err,rows)=>{
            if(err) throw err
            console.log(rows)
            res.send(rows);
           })
    })
    Router.post('/add_follow',(req,res)=>{
          let user = req.body.userId;
          let following = req.body.following;
                conn.query(`INSERT INTO followers (user,following) VALUES (?,?)`,[user,following],(err,rows)=>{
                    if(err) throw err
                    res.send("successfully added")
                  })
          })
         
    
    Router.get('/isFollowing',(req,res)=>{
        let user = req.query.userId;
        let sessionUser = req.query.sessionUserId;
        console.log("Im called")
        console.log(user,sessionUser)
        conn.query(`SELECT COUNT(id) count FROM followers WHERE user=? AND following=?`,[sessionUser,user],(err,rows)=>{
          if(err) throw err
          console.log("followers : "+rows[0].count)
          if(rows[0].count !== 0){
            console.log("followers  :"+rows)
            res.send(true)
          }
          else{
            res.send(false)
          }
        })
  })
    Router.delete('/remove_follow',(req,res)=>{
        let user = req.query.userId;
        let following = req.query.following;
        conn.query(`DELETE FROM followers WHERE user=? AND following=?`,[user,following],(err,rows)=>{
          if(err) throw err
          res.send("successfully removed")
        })
    })
    
})

module.exports = Router