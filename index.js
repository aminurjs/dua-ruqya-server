const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const PORT = process.env.PORT || 5000;

//MiddleWare
app.use(cors());

//Connect to db
const db = new sqlite3.Database("./dua_main.sqlite", (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("Connected to the SQLite DB");
  }
});

//DB root
app.get("/", (req, res) => {
  res.send("Welcome to the DuaRuqyah Serve");
});

//Get all categories
app.get("/categories", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

//Get subcategories filter by cat_id
app.get("/subcategories", (req, res) => {
  const cat_id = parseInt(req.query.cat_id);
  db.all(
    "SELECT * FROM sub_category WHERE cat_id = ?",
    [cat_id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

//Get Duas filter by subcat_id
app.get("/duas", (req, res) => {
  const subcat_id = parseInt(req.query.subcat_id);
  db.all("SELECT * FROM dua WHERE subcat_id = ?", [subcat_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Additional routes can be added as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
