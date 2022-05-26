import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

export default function Home({ items }) {
  const data = useMemo(() => items, [items]);
  const columns = useMemo(
    () => [
      {
        accessor: "id",
        width: 20,
        Cell: ({ row: { original } }) => (
          <input
            type="checkbox"
            className="form-check-input"
            id="original.id"
          />
        ),
      },
      {
        Header: "To-Do List",
        width: 300,
        accessor: "value.inputField",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
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
          <h2>Welcome to the To-Do List Page!</h2>
        </main>
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      width: column.width,
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <div style={{ float: "left" }}>
            <Link to="/add" className="btn btn-primary">
              Add To Do Item
            </Link>
          </div>
          <div style={{ float: "right" }}>
            <Link to="/edit" className="btn btn-primary">
              Edit To Do Items
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
