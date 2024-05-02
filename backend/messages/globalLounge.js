const express = require('express')
const app =  express()
const multer  = require('multer');
const Router = express.Router()
const pool = require('../modals/database')
const jwt = require('jsonwebtoken');
const fs =  require('fs');
app.use(express.static('backend'))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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
    Router.get('/no_of_posts',(req,res)=>{
      let userId = req.query.userId
      conn.query(`SELECT  COUNT(id) post_count  FROM global_lounge WHERE user = ?`,[userId],(err,rows,fields)=>{
        res.send(rows[0])
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
     Router.get('/globalComments',(req,res)=>{
      let post_id = req.query.post_id
      conn.query(`SELECT g.id,g.user, g.comment,g.datetime,g.like_count,users.name username,users.profile_photo profilePic
      FROM global_comments g
      INNER JOIN users ON users.id = g.user
      WHERE g.post = ? ORDER BY g.id;`,[post_id],(err,rows)=>{
        if(err) throw err
        res.send(rows)   
      })
     })
     Router.post('/addGlobalComment',(req,res)=>{
      let user = req.body.user
      let post = req.body.post
      let comment = req.body.comment
      conn.query(`INSERT INTO global_comments (comment,post,user) VALUES (?,?,?)`,[comment,post,user],(err)=>{
        if(err) throw err
      })
      res.send("successfully posted")
     })

     Router.patch('/addGlobalCommentLike',(req,res)=>{
      let comment =  req.body.id
      let user = req.body.userId
      conn.query(`UPDATE global_comments SET like_count =  like_count+1 WHERE id=?`,[comment],(err)=>{
        if(err) throw err
        res.send("successfully liked")
      })
      conn.query(`INSERT INTO liked_global_comments (comment,user) VALUES (?,?)`,[comment,user],(err)=>{
        if(err) throw err
      })
    
    })
     Router.get('/checkLikedGlobalComment',(req,res)=>{
      let comment =  req.query.id
      let user = req.query.userId
      conn.query(`SELECT COUNT(id) count FROM liked_global_comments WHERE user=? AND comment=?`,[user,comment],(err,rows)=>{
        if(err) throw err
        if(rows[0].count > 0){
          res.send(true)
        }
        else{
          res.send(false)
        }
      })
     })
     Router.get('/checkLikedGlobalCommentReplies',(req,res)=>{
      let reply =  req.query.id
      let user = req.query.userId
      conn.query(`SELECT COUNT(id) count FROM liked_global_comment_replies WHERE user=? AND reply=?`,[user,reply],(err,rows)=>{
        if(err) throw err
        if(rows[0].count > 0){
          res.send(true)
        }
        else{
          res.send(false)
        }
      })
     })
     Router.get('/globalCommentReplies',(req,res)=>{
      let comment = req.query.comment
      let reply = req.query.reply
      console.log(comment,reply)
      if(comment){
        conn.query(`SELECT g.* ,users.name username,users.id userId,users.profile_photo profilePic FROM global_comments_reply g  INNER JOIN users ON users.id=g.user WHERE g.to_comment = ? ORDER BY g.id DESC`,[comment],(err,rows)=>{
          if(err) throw err
          console.log(rows)
          res.send(rows)
        })
      }
      else{
        conn.query(`SELECT g.* ,u.name user,u.id userId,u.profile_photo profilePic FROM global_comments_reply g  INNER JOIN users u ON u.id = g.user WHERE g.to_reply = ?`,[reply],(err,rows)=>{
          if(err) throw err
          console.log(rows)
          res.send(rows)
        })
      }
     })
     Router.patch('/removeGlobalCommentLike',(req,res)=>{
      let comment =  req.body.id
      let user = req.body.userId
      conn.query(`UPDATE global_comments SET like_count =  like_count-1 WHERE id=?`,[comment],(err)=>{
        if(err) throw err
        res.send("successfully removed like")
      })
      conn.query(`DELETE FROM liked_global_comments WHERE comment=? AND user=?`,[comment,user],(err)=>{
        if(err) throw err
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
        if((req.body["image"]) !== "no image"){
            img_path = req.file.path
        }
        conn.query(`INSERT INTO global_lounge (user,message,image) VALUES(?,?,?)`,[payload["id"],message,img_path],(err)=>{
            if(err) throw err
            res.send("Successfully posted")
        })
      
    })
  Router.delete('/deletePost',(req,res)=>{
    let post = req.query["post"]
    let img_url
    conn.query(`SELECT image from global_lounge WHERE id = ?`, [post], (err, rows) => {
          if (err) throw err;
          console.log(rows)
        //   img_url = rows[0].image;
          console.log(`/uploads`)
        //   fs.unlink(`${img_url}`,(err)=>{
        //       if(err) throw err
        //   })
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

  Router.post('/addGlobalReply',(req,res)=>{
     let user = req.body.user
     let reply = req.body.reply
     let comment_id = req.body.comment_id
     let reply_id = req.body.reply_id
     conn.query(`INSERT INTO global_comments_reply (user,reply,to_reply,to_comment) VALUES (?,?,?,?)`,[user,reply,reply_id,comment_id],(err)=>{
      if(err) throw err
      res.send("successfully replied")
     })
  })
  Router.patch('/addLikeGlobalCommentReply',(req,res)=>{
    let reply = req.body.id
    let user = req.body.userId
    console.log("THE reply id is "+reply)
    conn.query(`UPDATE global_comments_reply SET like_count=like_count+1 WHERE id=?`,[reply],(err)=>{
      if(err) throw err
      res.send("Successfully added like")
    })
    conn.query(`INSERT INTO liked_global_comment_replies (user,reply) VALUES(?,?)`,[user,reply],(err)=>{
      if(err) throw err
    })
  })
  Router.patch('/removeLikeGlobalCommentReply',(req,res)=>{
    let reply = req.body.id
    let user = req.body.userId
    conn.query(`UPDATE global_comments_reply SET like_count=like_count-1 WHERE id=?`,[reply],(err)=>{
      if(err) throw err
      res.send("Successfully removed like")
    })
    conn.query(`DELETE FROM liked_global_comment_replies WHERE reply=? AND user=?`,[reply,user],(err)=>{
      if(err) throw err
    })
  })
})

module.exports = Router