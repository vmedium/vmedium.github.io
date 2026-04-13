import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Zone } from "@/components/ui/Zone";
import styles from "../section.module.css";

export const metadata: Metadata = {
  title: "Experiments",
  description: "Browser experiments, generative tools, and quick builds.",
};

export default function ExperimentsPage() {
  const projects = getProjects("experiments");

  return (
    <div className={styles.section}>
      <div className="container">
        <Zone index={1}>
          <SectionHeader
            label="Experiments"
            title="Experiments"
            description="Quick builds, browser toys, and generative tools. These are live — click to open."
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
