"use client";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Clients from "../components/client/list/Clients";
import Projects from "../components/project/list/Projects";
import CreateClient from "../components/client/show/CreateClient";
import CreateProject from "@/components/project/show/CreateProject";

export default function Home() {
  return (
    <>
      <Flex>
        <Box w="70%" margin="auto" p={4} mt={6}>
          <Flex gap={2} mb={4} wrap={"wrap"}>
            <CreateClient />
            <CreateProject />
          </Flex>

          <Projects />

          <Clients />
        </Box>
      </Flex>
    </>
  );
}
