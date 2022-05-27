import { Link } from "react-router-dom";
import TableView from "./TableView";

export default function EditToDo({ items, editItem, deleteItem }) {
  return (
    <div className="container">
      <main
        className="border border-5"
        style={{
          borderBottom: "solid 3px red",
          background: "aliceblue",
          color: "black",
          fontWeight: "bold",
        }}
      >
        <h2>Edit/Delete Items</h2>
      </main>

      <TableView items={items} editItem={editItem} deleteItem={deleteItem} />
      <nav>
        <Link id="HomeButton" to="/" className="btn btn-primary">
          Home
        </Link>
      </nav>
    </div>
  );
}
