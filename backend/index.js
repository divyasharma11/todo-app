const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;

const cors = require("cors");
app.use(cors({ origin: "*" }));

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.set("strictQuery", false);
const con = mongoose.connection;
con.on("open", function () {
  console.log("Connected.. ");
});

app.use(bodyParser.json());

/*const todoData = [
  {
    id: 123,
    item: "eat food",
  },
  {
    id: 124,
    item: "sleep",
  },
  {
    id: 125,
    item: "code",
  },
  {
    id: 126,
    item: "cricket",
  },
  {
    id: 127,
    item: "basketball",
  },
];*/
app.use(express.json());
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

// app.get("/todo", (req, res) => {
//   // console.log()
//   res.send(todoData);
// });

// app.post("/create", (req, res) => {
//   console.log("create request", req.body);
//   const { id, item } = req.body;
//   if (!item) {
//     return res.status(400).json({ error: "Title text is required." });
//   }
//   return res.status(201).json({
//     msg: "todo created successfully",
//     id: id,
//     item: item,
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
