"use client";

import IndividualProject from "@/components/project/show/IndividualProject";

export default function Project({ params }) {
  return <IndividualProject projectId={params.ID} />;
}
