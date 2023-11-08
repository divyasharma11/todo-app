import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EditIcon from "@mui/icons-material/Edit";
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
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState(0);
  const [inputText, setInputText] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
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

  const deleteAll = () => {
    const apiUrl = "http://localhost:3005/todos";
    console.log("delete");
    axios
      .delete(apiUrl)
      .then(() => {
        console.log("All Todos deleted successfully");
        setGetData(getData + 1);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };
  const handleEdit = (item,id) => {
    setInputText(item);
    setEdit(true);
    setEditId(id)
    // const apiUrl = `http://localhost:3005/todos/${id}`;
    // axios
    //   .patch(apiUrl)
    //   .then(() => {
    //      setGetData(getData+1);
    //   })
    //   .catch((error) => {
    //     console.error("Error updating todo:", error);
    //   });
  };
  const editTodo=()=>{
    const apiUrl = `http://localhost:3005/todos`;
    const data = {
      id: editId,
      item: inputText,
    };
    axios
      .patch(apiUrl,data)
      .then(() => {
         setGetData(getData+1);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
      setEdit(false);
      setInputText("");
  }
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
            {!edit ? (
              <Button variant="outlined" onClick={handleClick} title="add todo">
                Add todo
              </Button>
            ) : (
              <Button variant="outlined" onClick={editTodo} title="edit todo">
                Save
              </Button>
            )}
          </div>
          <div className="btn">
            <button onClick={deleteAll} title="Delete All">
              Delete All
            </button>
          </div>
          <div className="items">
            {data &&
              data.map((todo) => (
                <div className="item-list" key={todo._id}>
                  <h2>{todo.item}</h2>
                  <EditIcon onClick={() => handleEdit(todo.item,todo.id)} />
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
