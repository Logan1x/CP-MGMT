import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ClientInfo({ Client }) {
  return (
    <Container
      maxWidth={"lg"}
      centerContent
      borderWidth="1px"
      borderRadius="md"
      borderColor={"gray.300"}
      p={5}
    >
      <Box fontSize={"2xl"} fontWeight="semibold">
        Client Info
      </Box>
      <Flex direction={"column"} gap={1}>
        <Box display={"flex"} alignItems={"center"} gap={2} fontSize={"xl"}>
          <FaUser /> {Client.name}
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={2} fontSize={"xl"}>
          <FaEnvelope />
          {Client.email}
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={2} fontSize={"xl"}>
          <FaPhone />
          {Client.phone}
        </Box>
      </Flex>
    </Container>
  );
}
