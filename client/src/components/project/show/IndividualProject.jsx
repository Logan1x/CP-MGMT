import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Box, Flex, Badge, Container, Button } from "@chakra-ui/react";

import { GET_PROJECT } from "../../../queries/projectQueries";
import ClientInfo from "../../client/show/ClientInfo";
import EditProjectButton from "./EditProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";

export default function IndividualProject({ projectId }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const colorScheme = {
    "In Progress": "teal",
    Completed: "green",
    "Not Started": "red",
  };

  return (
    <>
      {!loading && !error && (
        <Container maxW="4xl">
          <Flex alignItems={"center"} justify={"center"} my={6}>
            <Box
              px="12"
              py="8"
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              display="flex"
              flexDirection="column"
              alignItems="start"
              flexGrow={1}
              cursor="pointer"
              h={"full"}
            >
              <Box alignSelf={"flex-end"}>
                <Link href={"/"}>
                  <Button>Back</Button>
                </Link>
              </Box>
              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="4xl"
                textTransform="uppercase"
                mt="2"
              >
                {data.project.name}
              </Box>

              <Box
                as="h2"
                lineHeight="tight"
                noOfLines={1}
                color="gray.500"
                fontSize="lg"
              >
                {data.project.description}
              </Box>
              <Badge
                borderRadius="sm"
                px="2"
                py="1"
                my="4"
                colorScheme={colorScheme[data.project.status]}
              >
                {data.project.status}
              </Badge>

              <ClientInfo Client={data.project.client} />

              <Flex justify={"flex-end"} gap={2} w="100%" my="8">
                <EditProjectButton project={data.project} />
                <DeleteProjectButton projectId={data.project.id} />
              </Flex>
            </Box>
          </Flex>
        </Container>
      )}
    </>
  );
}
