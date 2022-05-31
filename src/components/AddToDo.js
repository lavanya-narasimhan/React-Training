import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddToDo({ addItem }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(
    (data) => {
      addItem(data);
      document.getElementById("inputField").value = "";
      document.getElementById("button").innerText = "Add another!";
    },
    [addItem]
  );
  return (
    <>
      <main>
        <h2 className="border border-4">Add a ToDo Item!</h2>
      </main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter a To-Do Item"
          className="col-form-label"
          id="inputField"
          {...register("inputField", { required: true })}
        />
        {errors.inputField && <span>This field is required</span>}
        <button type="submit" id="button" className="btn btn-primary">
          Add
        </button>
      </form>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </>
  );
}
