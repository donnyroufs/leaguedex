import React from "react";
import { useTable, useFilters } from "react-table";

const Dashboard = ({ status, data, isLoading }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "username",
        accessor: "username",
        filterable: true,
      },
      {
        Header: "email",
        accessor: "email",
        filterable: true,
      },
      {
        Header: "summoner name",
        accessor: "summonerName",
        filterable: true,
      },
      {
        Header: "region",
        accessor: "region",
        filterable: true,
      },
      {
        Header: "games played",
        accessor: "gamesPlayed",
      },
      {
        Header: "member since",
        accessor: "createdAt",
      },
    ],
    []
  );

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.filterable ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Dashboard;
