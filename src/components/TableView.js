import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTable } from "react-table";
import TableEdit from "./TableEdit";

export default function TableView({ items, editItem }) {
  const data = useMemo(() => items, [items]);
  const [editId, setEditId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditClick = (original) => {
    setEditId(original.id);
  };
  const handleDeleteClick = (original) => {
    setEditId(original.id);
  };
  const onSubmit = (data) => {};
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        id: "id",
      },
      {
        Header: "Items",
        accessor: "value.inputField",
        id: "value.inputField",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row: { original } }) => (
          <Fragment>
            <button
              className="btn btn-primary"
              style={{ marginRight: "20px" }}
              onClick={() => {
                handleEditClick(original);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleDeleteClick(original);
              }}
            >
              Delete
            </button>
          </Fragment>
        ),
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [editRowText, setEditRowText] = useState(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.id}>
                {editId === row.original.id ? (
                  <TableEdit
                    row={row}
                    data={data}
                    editId={editId}
                    setEditId={setEditId}
                  />
                ) : (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </form>
  );
}
