import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Zone } from "@/components/ui/Zone";
import styles from "../section.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Self-initiated design, music, and visual art projects.",
};

export default function ProjectsPage() {
  const projects = getProjects("projects");

  return (
    <div className={styles.section}>
      <div className="container">
        <Zone index={1}>
          <SectionHeader
            label="Projects"
            title="Personal Work"
            description="Self-initiated projects across visual art, typography, music, and design research — made for curiosity, not clients."
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
