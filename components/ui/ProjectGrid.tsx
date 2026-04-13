'use client';
import { motion } from 'motion/react';
import { ProjectCard, type Project, type ProjectSpan } from "./ProjectCard";
import { ease, duration } from '@/lib/motion';
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
  layout?: "modular" | "uniform";
}

/* Brockmann-inspired span sequence — creates rhythm without symmetry */
const SPAN_SEQUENCE: ProjectSpan[] = [6, 3, 3, 4, 8, 6, 6, 4, 4, 4, 12, 3, 3, 6];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.14 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.pageEnter, ease: ease.move },
  },
};

export function ProjectGrid({ projects, layout = "modular" }: ProjectGridProps) {
  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, i) => {
        const span =
          layout === "modular"
            ? project.span ?? SPAN_SEQUENCE[i % SPAN_SEQUENCE.length]
            : 4;
        return (
          <ProjectCard
            key={project.slug}
            project={project}
            span={span}
            priority={i < 2}
          />
        );
      })}
    </motion.div>
  );
}
