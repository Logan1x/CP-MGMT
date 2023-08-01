import { useQuery } from "@apollo/client";
import { Flex, Box } from "@chakra-ui/react";

import { GET_PROJECTS } from "../../../queries/projectQueries";
import Link from "next/link";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <>
      <Flex gap={2} my={2}>
        {!loading &&
          !error &&
          data &&
          data.projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={3}
              >
                <h1>{project.name}</h1>
                <h2>{project.description}</h2>
                <small>{project.status}</small>
                <h3>{project.client.name}</h3>
              </Box>
            </Link>
          ))}
      </Flex>
    </>
  );
}
