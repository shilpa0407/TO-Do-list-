import React, { useEffect, useState } from "react";
import "./List.css";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/todolist')
    .then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }, []);

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:3001/todolist/${itemId}`)
      .then(() => {
        // Filter out the deleted item from the data state
        const updatedData = data.filter((item) => item.id !== itemId);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="list">  
      <table className="table table-hover">
        <tbody>
         {data.map((item, index) =>{

          return(
            <tr key={index}>
              <td className="id">{index+1}</td>
              <td className="list-name">{item.title}</td>
              <td className="delete-icon"><AiOutlineDelete onClick={() => handleDelete(item.id)}/></td>
            </tr>
          )})}

        </tbody>
      </table>
    </div>
  );
}

export default List;
