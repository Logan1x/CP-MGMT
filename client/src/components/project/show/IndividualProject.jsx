import { useQuery } from "@apollo/client";

import { GET_PROJECT } from "../../../queries/projectQueries";
import { Box } from "@chakra-ui/react";

export default function IndividualProject({ projectId }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <>
      {!loading && !error && (
        <Box>
          <h1>{data.project.name}</h1>
          <h2>{data.project.description}</h2>
          <small>{data.project.status}</small>
          <h3>{data.project.client.name}</h3>
          <h3>{data.project.client.email}</h3>
          <h3>{data.project.client.phone}</h3>
        </Box>
      )}
    </>
  );
}
