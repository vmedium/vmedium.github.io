import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import styles from "./page.module.css";

export default function HomePage() {
  const projects = getProjects();

  return (
    <div className={styles.page}>
      <div className="container">
        <ProjectGrid projects={projects} layout="modular" />
      </div>
    </div>
  );
}
