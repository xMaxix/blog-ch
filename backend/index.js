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
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, username, password)`
// db.run(sql)

// drop table
// db.run("DROP TABLE comments")

// delete
// const query = `DELETE FROM comments WHERE id = ?`;

// db.run(query, [1], function (err) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(`Row(s) deleted: ${this.changes}`);
//   }})

// insert into db
// sql = `INSERT INTO comments(username, time, text) VALUES(?,?,?)`

// sql = `INSERT INTO users(username, password) VALUES(?,?)`
// db.run(sql,["admin","2023-05-26T18:35:20.576Z","i actually can't remember any of this lmao"],(err)=>{if(err) return err.message})
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

async function getComments(sp) {
  const GETDB = 'SELECT * FROM comments';
  return new Promise((resolve, reject) => {
    db.all(GETDB, [], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows.reverse());
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
app.get("/comments", async (req, res) => {
  try {
    const comments = await getComments();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, ()=> console.log("Server is running on port 3001"))