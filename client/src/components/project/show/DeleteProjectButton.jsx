"use client";

import { Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../../mutations/projectMutations";
import { GET_PROJECTS } from "../../../queries/projectQueries";
import { useRouter } from "next/navigation";

export default function DeleteProjectButton({ projectId }) {
  const router = useRouter();

  console.log(projectId);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => router.push("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <>
      <Button onClick={deleteProject}>Delete Project</Button>
    </>
  );
}
