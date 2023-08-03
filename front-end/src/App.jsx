import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  const [data, setData] = useState(null);
  const [getData, setGetData] = useState(0);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    fetchData();
  }, [getData]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3005/todos");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    const apiUrl = "http://localhost:3005/todos";

    const data = {
      id: getData,
      item: inputText,
    };
    if (!inputText) {
      alert("please add something!!");
      return;
    }

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("Post request successful:", response.data);
        //  setData((prevData) => [ data, ...prevData]);
        setInputText("");
      })
      .catch((error) => {
        console.error("Error making post request:", error);
      });
    setGetData(getData + 1);
  };

  const handleDelete = (id) => {
    const apiUrl = `http://localhost:3005/todos/${id}`;

    axios
      .delete(apiUrl)
      .then(() => {
        console.log("Todo deleted successfully");
        // setData((prevData) => prevData.filter((todo) => todo.id !== id));
        setGetData(getData + 1);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div className="container">
      <nav>
        <Box sx={{ flexGrow: 1 }} className="navbar">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Todo-List
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        </Box>
      </nav>
      <main>
        <div className="content">
          <div className="add-items">
            <TextField
              id="outlined-basic"
              label="add todo"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="add todo here.."
            />
            <Button variant="outlined" onClick={handleClick}>
              Add todo
            </Button>
          </div>
          <div className="items">
            {data &&
              data.map((todo) => (
                <div className="item-list" key={todo._id}>
                  <h2>{todo.item}</h2>
                  <DeleteIcon
                    style={{ color: " rgb(198, 118, 147)" }}
                    onClick={() => handleDelete(todo.id)}
                  />
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
