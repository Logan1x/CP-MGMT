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

import { useMutation } from "@apollo/client";

import { UPDATE_PROJECT } from "../../../mutations/projectMutations";

import { GET_PROJECTS } from "../../../queries/projectQueries";

export default function EditProjectButton({ project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ProjectInfo, setProjectInfo] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: ProjectInfo.name,
      description: ProjectInfo.description,
      status: ProjectInfo.status,
    },
    update(cache, { data: { updateProject } }) {
      const { data } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: data.projects.concat([updateProject]) },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", ProjectInfo);
    updateProject();
    setProjectInfo({
      name: "",
      description: "",
      status: "",
    });
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>Edit Project</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Project</ModalHeader>
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
