"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../../../mutations/projectMutations";

import { GET_PROJECTS } from "../../../queries/projectQueries";

import { GET_CLIENTS } from "../../../queries/clientQueries";

export default function CreateProject() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ProjectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
    status: "",
    clientId: "",
  });

  const [createProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: ProjectInfo.name,
      description: ProjectInfo.description,
      status: ProjectInfo.status,
      clientID: ProjectInfo.clientId,
    },
    update(cache, { data: { createProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, ProjectInfo] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", ProjectInfo);
    createProject();
    setProjectInfo({
      name: "",
      description: "",
      status: "",
      clientId: "",
    });
    onClose();
  };

  return (
    !loading &&
    !error && (
      <>
        <Button onClick={onOpen}>Create New Project</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Project</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Flex flexDirection="column" gap={1}>
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    placeholder="Client Project Management System"
                    value={ProjectInfo.name}
                    onChange={(e) =>
                      setProjectInfo({
                        ...ProjectInfo,
                        name: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="This is a project management system for clients"
                    value={ProjectInfo.description}
                    onChange={(e) =>
                      setProjectInfo({
                        ...ProjectInfo,
                        description: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={ProjectInfo.status}
                    onChange={(e) =>
                      setProjectInfo({
                        ...ProjectInfo,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="new">Not Started</option>
                    <option value="started">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>

                  <FormLabel>Client</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={ProjectInfo.clientId}
                    onChange={(e) =>
                      setProjectInfo({
                        ...ProjectInfo,
                        clientId: e.target.value,
                      })
                    }
                  >
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Select>
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
    )
  );
}
