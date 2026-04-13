import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Zone } from "@/components/ui/Zone";
import styles from "../section.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Client projects — product design, UX, brand, and research.",
};

export default function WorkPage() {
  const projects = getProjects("work");

  return (
    <div className={styles.section}>
      <div className="container">
        <Zone index={1}>
          <SectionHeader
            label="Work"
            title="Client Projects"
            description="Product design, UX research, brand identity, and design systems for companies across fintech, climate, and consumer software."
            count={projects.length}
          />
        </Zone>
        <Zone index={2}>
          <div className={styles.grid}>
            <ProjectGrid projects={projects} layout="modular" />
          </div>
        </Zone>
      </div>
    </div>
  );
}
