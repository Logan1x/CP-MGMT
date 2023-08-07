"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../../mutations/clientMutations";
import { GET_CLIENTS } from "../../../queries/clientQueries";

export default function CreateClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ClientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [createClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: ClientInfo.name,
      email: ClientInfo.email,
      phone: ClientInfo.phone,
    },
    update(cache, { data: { createClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, ClientInfo] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", ClientInfo);
    createClient();
    setClientInfo({
      name: "",
      email: "",
      phone: "",
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Create New Client</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Client</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Flex flexDirection="column" gap={2}>
                <Text>Name</Text>
                <Input
                  placeholder="Khushal Sharma"
                  value={ClientInfo.name}
                  onChange={(e) =>
                    setClientInfo({
                      ...ClientInfo,
                      name: e.target.value,
                    })
                  }
                />
                <Text>Email</Text>
                <Input
                  type="email"
                  placeholder="Sharmakhushal78@gmail.com"
                  value={ClientInfo.email}
                  onChange={(e) =>
                    setClientInfo({
                      ...ClientInfo,
                      email: e.target.value,
                    })
                  }
                />
                <Text>Phone</Text>
                <Input
                  placeholder="895-519-2162"
                  value={ClientInfo.phone}
                  onChange={(e) =>
                    setClientInfo({
                      ...ClientInfo,
                      phone: e.target.value,
                    })
                  }
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="Submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
