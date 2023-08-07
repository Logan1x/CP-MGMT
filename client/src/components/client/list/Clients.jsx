import { useQuery } from "@apollo/client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
} from "@chakra-ui/react";

import ClientRow from "../../table/ClientRow";
import { GET_CLIENTS } from "../../../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <>
      {!loading && !error && (
        <>
          <Box my="2" mb="4" fontSize={"2xl"} fontWeight={"semibold"}>
            Clients:{" "}
          </Box>
          <TableContainer borderWidth="1px" borderRadius="md" shadow="md">
            <Table variant="striped" bg="white">
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
        </>
      )}
    </>
  );
}
