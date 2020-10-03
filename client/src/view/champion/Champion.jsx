import React from "react";
import Toggle from "../../components/toggle/Toggle";
import { Form, Group, Input, Label } from "../../components/styles/Form";
import { useTable, useFilters } from "react-table";
import { Container, Image, ToggleContainer, Title } from "./Champion.styles";

const Champion = ({
  championA: me,
  columns,
  matchups: data = [],
  onSearch,
  setValue,
  value,
}) => {
  const tableInstance = useTable({ columns, data });

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
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Container.Body>
    </Container>
  );
};

export default Champion;
