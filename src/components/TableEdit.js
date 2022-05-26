import { useState } from "react";

export default function TableEdit({ row, data, setEditId, editItem }) {
  const [editedText] = useState("");
  const handleCancelClick = () => {
    setEditId(0);
  };

  return (
    <tr>
      <td id="rowId">{row.original.id}</td>
      <td>
        <input
          type="text"
          required="required"
          defaultValue={row.original.value.inputField}
          name="editedText"
          id="editedText"
        />
      </td>
      <td>
        <button
          className="btn btn-primary"
          style={{ marginRight: "20px" }}
          onClick={() => {
            setEditId(0);
            editItem(row.original, editedText);
          }}
        >
          Save
        </button>
        <button className="btn btn-primary" onClick={() => handleCancelClick()}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
