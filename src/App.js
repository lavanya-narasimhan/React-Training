import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddToDo from "./components/AddToDo";
import EditToDo from "./components/EditToDo";
import { useCallback, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (data) => {
    const newItemObj = {
      id: items.length + 1,
      value: data,
      completed: false,
    };
    setItems([...items, newItemObj]);
  };

  const editItem = useCallback(
    (obj, editedText) => {
      const updatedItems = [...items].map((item) => {
        if (item.id === obj.id) {
          item.value.inputField = document.getElementById("editedText").value;
        }
        return item;
      });
      setItems(updatedItems);
    },
    [items]
  );

  const deleteItem = (id) => {
    const updatedItems = [...items].filter((item) => item.id !== id);
    const updatedItemsIndex = [...updatedItems].map((item, i) => {
      item.id = i + 1;
      return item;
    });

    setItems(updatedItemsIndex);
  };

  const toggleComplete = (id) => {
    const updatedItems = [...items].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItems(updatedItems);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home items={items} toggleComplete={toggleComplete} />}
        />
        <Route path="add" element={<AddToDo addItem={addItem} />} />
        <Route
          path="edit"
          element={
            <EditToDo
              items={items}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
