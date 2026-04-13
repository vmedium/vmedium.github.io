import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { Zone } from "@/components/ui/Zone";
import styles from "./page.module.css";

export default function HomePage() {
  const projects = getProjects();

  return (
    <div className={styles.page}>
      <div className="container">
        <Zone index={1}>
          <ProjectGrid projects={projects} layout="modular" />
        </Zone>
      </div>
    </div>
  );
}
