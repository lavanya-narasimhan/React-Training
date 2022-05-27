import React, { Fragment, useMemo, useState } from "react";
import { useTable } from "react-table";
import TableEdit from "./TableEdit";

export default function TableView({ items, editItem, deleteItem }) {
  const data = useMemo(() => items, [items]);

  const [editId, setEditId] = useState(0);

  const handleEditClick = (id) => {
    setEditId(id);
  };

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
              id="editButton"
              className="btn btn-primary"
              style={{ marginRight: "20px" }}
              onClick={() => {
                handleEditClick(original.id);
              }}
            >
              Edit
            </button>
            <button
              id="deleteButton"
              className="btn btn-primary"
              onClick={() => {
                deleteItem(original.id);
              }}
            >
              Delete
            </button>
          </Fragment>
        ),
      },
    ],
    [deleteItem]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table id="TableView" {...getTableProps()} className="table table-striped">
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
                  setEditId={setEditId}
                  editItem={editItem}
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
  );
}
