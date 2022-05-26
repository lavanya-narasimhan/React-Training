import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddToDo from "./components/AddToDo";
import EditToDo from "./components/EditToDo";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (data) => {
    const newItemObj = {
      id: items.length + 1,
      value: data,
    };
    setItems([...items, newItemObj]);
  };

  const editItem = (obj) => {
    console.log(obj);
    const editItemObj = {
      id: obj.id,
      value: obj.value,
    };
    setItems([...items, editItemObj]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home items={items} />} />
        <Route path="add" element={<AddToDo addItem={addItem} />} />
        <Route
          path="edit"
          element={<EditToDo items={items} editItem={editItem} />}
        />
      </Routes>
    </div>
  );
}

export default App;
