const express = require('express')
const app =  express()
const multer  = require('multer');
const Router = express.Router()
const pool = require('../modals/database')
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory based on file type or any other condition
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, 'uploads/images');
      } else if (file.mimetype === 'application/pdf') {
        cb(null, 'uploads/pdfs');
      } else {
        cb(new Error('Unsupported file type'));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage ,dest:'../uploads/images'});


pool.getConnection((err,conn)=>{
    Router.get('/globalMessages',(req,res)=>{
        conn.query(`SELECT gl.* , gl.user SentBy,users.username usertag, users.name username FROM global_lounge gl INNER JOIN users ON gl.user=users.id ORDER BY gl.id DESC`,(err,rows)=>{
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
        console.log("api is called")
        if(req.body["lounge"]==="global"){
            conn.query(`INSERT INTO upVoted_posts (global,user) VALUES(?,?)`,[req.body["id"],req.body["user"]],(err)=>{
                if(err) throw err
            })
            conn.query(`UPDATE global_lounge SET upVoteCount=upVoteCount+1 WHERE  id=?`,[req.body["id"]],(err)=>{
                if(err) throw err
            })
            res.send("added Upvote")
        }
        else{
            res.send("failed to add upVote")
        }
      
       
    })

    Router.patch('/removeDownVote',(req,res)=>{

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
        if(req.body["lounge"]==="global"){
            conn.query(`INSERT INTO downVoted_posts (global,user) VALUES(?,?)`,[req.body["id"],req.body["user"]])
            conn.query(`UPDATE global_lounge SET downVoteCount=downVoteCount+1 WHERE  id=?`,req.body["id"])
            res.send("added Down Vote")
        }
        else{
            res.send("failed to addUpvote")
           }
       
    })
    Router.post('/postGlobalLounge',upload.single('image'),(req,res)=>{
        let payload= jwt.decode(req.body["cookie"])
        let img_path=''
        let message = req.body["message"]
        console.log(req.body["image"])
        if((req.body["image"]) !== "no image"){
            img_path = req.file.path
            console.log(img_path)
        }
        conn.query(`INSERT INTO global_lounge (user,message,image) VALUES(?,?,?)`,[payload["id"],message,img_path],(err)=>{
            if(err) throw err
            res.send("Successfully posted")
        })
      
    })
  Router.delete('/deletePost',(req,res)=>{
    let post = req.query["post"]
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