import React from "react";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";
import { Container } from "./Profile.styles";
import { Title } from "../champion/Champion.styles";

const Profile = ({
  matchups: data,
  loading,
  columns,
  username,
  handleNavigate,
}) => {
  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // !todo
  if (loading) {
    return "Loading...";
  }

  return (
    <Container>
      <Title>{username}'s profile</Title>
      <Container.Body>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort style={{ paddingTop: ".2rem" }} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length <= 0 && "No matchups found."}
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleNavigate(row.original.id)}
                >
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
      </Container.Body>
    </Container>
  );
};

export default Profile;
