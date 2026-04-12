const express = require("express");

const app = express();

//order matters the most *-all the route matches to this use route and displays **(hahahah)**
//whether it si get,post,delete method it only displays hahahaha
app.use("/user", (req, res) => {
  res.send("hahahaha");
});
app.get("/user", (req, res) => {
  res.send({ firstname: "kamran", lastname: "Ahmed" });
});
app.post("/user", (req, res) => {
  res.send("Saved data to database");
});
app.delete("/user", (req, res) => {
  res.send("Deleted data sucessfully");
});

app.listen(7777);
