const express = require('express')
const app = express()
const Router = express.Router()
const pool = require('../modals/database')

pool.getConnection((err,conn)=>{
      if(err) throw err
      Router.get('/getRolesOptions',(req,res)=>{
        conn.query(`SELECT name value,name label FROM role`,(err,rows)=>{
            res.send(rows)
        })
      })
      Router.get('/getCollegeOptions',(req,res)=>{
        conn.query(`SELECT acronym value,acronym label FROM college`,(err,rows)=>{
            res.send(rows)
        })
      })
      Router.get('/getCountryOptions',(req,res)=>{
        conn.query(`SELECT  code value,CONCAT(name,' ',code) AS label FROM country`,(err,rows)=>{
            res.send(rows)
        })
      })
      Router.post('/registerUser', async(req,res)=>{
        let data = req.body
        let college  
        let role
        conn.query(`SELECT id FROM college WHERE name = ?`,[data["college"]],(err,rows)=>{
            college = rows[0]["id"]
            console.log(college)
            conn.query(`SELECT id FROM role WHERE name = ?`,[data["role"]],(err,rows)=>{
                role = rows[0]["id"]
                console.log(role)
                conn.query(`INSERT INTO users (username,name,password,college,age,phone,role) VALUES (?,?,?,?,?,?,?)`,
                [data["username"],data["name"],data["password"],college,data["age"],data["country"]+data["phone"],role],(err)=>{
                    if(err)throw err
                    res.send("1")
                })
            })
          
        })
        
      })
})

module.exports = Router