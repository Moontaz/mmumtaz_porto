import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/projects/project-explorer";

export const metadata: Metadata = {
   title: "Work",
   description:
      "Selected frontend development, interaction, and digital product work by M Mumtaz.",
};

export default function WorkPage() {
   return <ProjectExplorer />;
}
