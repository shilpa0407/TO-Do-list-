import React, { useState } from 'react';
import "../src/Home.css";
import List from './List';
import axios from "axios";

function Home() {
  const [title, setTitle] = useState(""); // Separate state for the title
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Please enter somehting in the field ."); // Set error message if title is empty
    } else {
      axios.post("http://localhost:3001/todolist", {
        title: title, // Send only the title in the request body
      }).then(res => {
        setTodoList([...todoList, res.data]);
        setTitle(""); // Clear the input field after submitting
        setError(""); // Clear the error message
      }).catch((err) => console.log(err));
    }
  };

  return (
    <div id="body">
      <div className="main-heading">Action agenda</div>
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control-sm"
            id="add-note"
            placeholder="Add your note"
            name="title"
            value={title} // Bind the input value to the 'title' state
            onChange={e => {
              setTitle(e.target.value);
              setError(""); // Clear the error message on input change
            }}
          />
          {error && <div className="error-message">{error}</div>} {/* Render error message if it exists */}
          <button type="submit" className="btn btn-primary btn-lg">
            + Add
          </button>
        </form>
        <List todoList={todoList} />
      </div>
    </div>
  );
}

export default Home;
