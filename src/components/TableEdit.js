import { useForm } from "react-hook-form";

export default function TableEdit({ row, data, editId, setEditId }) {
  const { register } = useForm();
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
          placeholder="Enter a To-Do Item"
          name="editedText"
          {...register("editedText", { required: true })}
        ></input>
      </td>
      <td>
        <button
          className="btn btn-primary"
          style={{ marginRight: "20px" }}
          type="submit"
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
