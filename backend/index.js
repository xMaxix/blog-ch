const express = require("express")
const cors = require("cors")
const sqlite3 = require('sqlite3').verbose();



const port = 3001
const app = express()

app.use(express.json())
app.use(cors())


const insert = `INSERT INTO users(username, password) VALUES(?,?)`
const comment = `INSERT INTO comments(username, time, text) VALUES(?,?,?)`
// connect a db
const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return err.message
})

// create a table
// sql = `CREATE TABLE comments(id INTEGER PRIMARY KEY, username, time, text)`
// db.run(sql)

// drop table
// db.run("DROP TABLE users")

// insert into db
// sql = `INSERT INTO users(username, password) VALUES(?,?)`
// db.run(sql,["admin","6c1895a03a84b2ad2c8b6a39bee626c7106bb19c9a9f2e8108a13520d7a36e1e"],(err)=>{if(err) return err.message})
// query
function data(u,p){
    const GETDB = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    db.all(GETDB, [], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        let found = false;
        rows.forEach((row) => {
          if (row.username == u && row.password == p) {
            found = true;
          }
        });

        resolve(found);
      }
    });
  });
}
function exists(u){
    const GETDB = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    db.all(GETDB, [], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        let found = false;
        rows.forEach((row) => {
          console.log(row);
          if (row.username == u) {
            console.log(true);
            found = true;
          }
        });

        console.log(found);
        resolve(found);
      }
    });
  });
}
app.post("/login", async (req,res)=>{
    const content = req.body.content;
    try {
      const result = await data(content.username, content.password);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred.');
    }
  
})
app.post("/signup", async(req,res)=>{
    const content = req.body.content;
    try {
      const result = await exists(content.username);
      console.log(result);
      if(result == false){
        db.run(insert,[content.username,content.password],(err)=>{if(err) return err.message})

      }
      res.send(!result);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred.');
    }
})
app.post("/post", async(req,res)=>{
  const content = req.body.content;
  try {
    const result = await data(content.username, content.password);
    if(result==true){
      if((content.comment).length!=0){
        db.run(comment,[content.username,content.time, content.comment],(err)=>{if(err) return err.message})
        res.send(true)
      }else res.send(false)
    }else res.send(false)
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
})



app.listen(port, ()=> console.log("Server is running on port 3001"))