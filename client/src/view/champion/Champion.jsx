import React from "react";
import Toggle from "../../components/toggle/Toggle";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { Form, Group, Input, Label } from "../../components/styles/Form";
import { useTable, useSortBy } from "react-table";
import { Container, Image, ToggleContainer, Title } from "./Champion.styles";

const Champion = ({
  championA: me,
  columns,
  matchups: data = [],
  onSearch,
  setValue,
  value,
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

  return (
    <Container>
      <Container.Header>
        <Container.Header.Left>
          <Image src={me.icon} alt="champion image of yourself." />
          <Title>All matchups privacy</Title>
          <ToggleContainer>
            <Toggle privacy={true} />
          </ToggleContainer>
        </Container.Header.Left>
        <Form champion onSubmit={onSearch}>
          <Group champion>
            <Label>Find Opponent</Label>
            <Input
              champion
              type="text"
              placeholder="Enter Champion Name"
              name="championB"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              autoComplete="off"
            />
          </Group>
        </Form>
      </Container.Header>
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

export default Champion;
