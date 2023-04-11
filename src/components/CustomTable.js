import { Center, ScrollArea, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router";

function CustomTable({ data }) {
  const headers = Object.keys(JSON.parse(data[0]));

  console.log(headers);
  const navigate = useNavigate();
  const rows = data.map((element) => {
    element = JSON.parse(element);
    return (
      <tr key={element.name}>
        {headers.map((item) => {
          console.log(item);
          return <td>{element[item]}</td>;
        })}

        {/* <td>
        <IconEdit
          size={16}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/new-entry")}
        />
      </td> */}
      </tr>
    );
  });
  return (
    <Center>
      <ScrollArea w={window.innerWidth - window.innerWidth / 3.5}>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          id="report-generate-table"
        >
          <thead>
            <tr>
              {headers.map((element) => (
                <th>{element}</th>
              ))}

              {/* <th>Edit</th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default CustomTable;
