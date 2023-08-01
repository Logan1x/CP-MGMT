import { useQuery } from "@apollo/client";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

import ClientRow from "../../table/ClientRow";
import { GET_CLIENTS } from "../../../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <>
      {!loading && !error && (
        <TableContainer border={2}>
          <Table
            variant="striped"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
          >
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
