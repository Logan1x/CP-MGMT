import { useQuery } from "@apollo/client";
import { Flex, Box, Badge } from "@chakra-ui/react";

import { GET_PROJECTS } from "../../../queries/projectQueries";
import Link from "next/link";
import { wrap } from "framer-motion";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const colorScheme = {
    "In Progress": "teal",
    Completed: "green",
    "Not Started": "red",
  };

  return (
    <>
      <Box my="2" fontSize={"2xl"} fontWeight={"semibold"}>
        Projects:{" "}
      </Box>
      <Flex gap={2} my={4} wrap={"wrap"}>
        {!loading &&
          !error &&
          data &&
          data.projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                display="flex"
                flexDirection="column"
                alignItems="start"
                flexGrow={1}
                cursor="pointer"
                minW="200px"
                h={"full"}
              >
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={colorScheme[project.status]}
                >
                  {project.status}
                </Badge>
                <Box
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="lg"
                  textTransform="uppercase"
                  mt="2"
                >
                  {project.name}
                </Box>
                <Box as="h4" lineHeight="tight" noOfLines={1} color="gray.500">
                  {project.client.name}
                </Box>
              </Box>
            </Link>
          ))}
      </Flex>
    </>
  );
}
