const express = require('express')
const app =  express()

const Router = express.Router()
const pool = require('../modals/database')
const jwt = require('jsonwebtoken');

pool.getConnection((err,conn)=>{
    Router.get('/globalMessages',(req,res)=>{
        conn.query(`SELECT gl.* , gl.user SentBy, users.name username FROM global_lounge gl INNER JOIN users ON gl.user=users.id ORDER BY gl.id DESC`,(err,rows)=>{
            if(err) throw err
            res.send(rows)
        })
    })

    Router.get('/upVotedGlobalPosts',(req,res)=>{
        conn.query(`SELECT user, global from upVoted_posts`,(err,rows)=>{
        res.send(rows)
        })
    })

    Router.get('/downVotedGlobalPosts',(req,res)=>{
        conn.query(`SELECT user ,global from downVoted_posts`,(err,rows)=>{
        res.send(rows)
        })
    })

    Router.patch('/removeUpVote',(req,res)=>{
        console.log(req.body)
        if(req.body["lounge"]==="global"){
            conn.query(`DELETE FROM upVoted_posts  WHERE  global=? AND user=?`,[req.body["id"],req.body["user"]])
            conn.query(`UPDATE global_lounge SET upVoteCount=upVoteCount-1 WHERE  id=?`,[req.body["id"]])
         res.send("removed upVote")
        }
       
   else{
    res.send("failed to remove downVote")
   }    
    })
    Router.patch('/addUpVote',(req,res)=>{
        if(req.body["lounge"]==="global"){
            conn.query(`INSERT INTO upVoted_posts (global,user) VALUES(?,?)`,[req.body["id"],req.body["user"]])
            conn.query(`UPDATE global_lounge SET upVoteCount=upVoteCount+1 WHERE  id=?`,[req.body["id"]])
            res.send("added Upvote")
        }
        else{
            res.send("failed to add upVote")
        }
      
       
    })

    Router.patch('/removeDownVote',(req,res)=>{

        console.log(req.body)
        if(req.body["lounge"]==="global"){
            conn.query(`DELETE FROM downVoted_posts  WHERE  global=? AND user=?`,[req.body["id"],req.body["user"]])
            conn.query(`UPDATE global_lounge SET downVoteCount=downVoteCount-1 WHERE  id=?`,[req.body["id"]])
            res.send("removed Down vote")
        }
        
       else{
        res.send("failed to remove downVote")
       }
    })
    Router.patch('/addDownVote',(req,res)=>{
        console.log(req.body)
        if(req.body["lounge"]==="global"){
            conn.query(`INSERT INTO downVoted_posts (global,user) VALUES(?,?)`,[req.body["id"],req.body["user"]])
            conn.query(`UPDATE global_lounge SET downVoteCount=downVoteCount+1 WHERE  id=?`,req.body["id"])
            res.send("added Down Vote")
        }
        else{
            res.send("failed to addUpvote")
           }
       
    })
    Router.post('/postGlobalLounge',(req,res)=>{
        let payload= jwt.decode(req.body["cookie"])
        let message = req.body["message"]
        conn.query(`INSERT INTO global_lounge (user,message) VALUES(?,?)`,[payload["id"],message],(err)=>{
            if(err) throw err
            res.send("Successfully posted")
        })
      
    })
  Router.delete('/deletePost',(req,res)=>{
    let post = req.query["post"]
    console.log(req.query)
    conn.query(`DELETE FROM global_lounge WHERE id=?`,[post],(err)=>{
        if(err) {
            console.log(err)
            res.send("Unsucessfull on deletion")
            throw(err)
        }
        else  res.send("successfully Deleted")
    })
    
  })
})

module.exports = Router