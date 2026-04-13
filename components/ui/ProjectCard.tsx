'use client';
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { itemVariants } from "./ProjectGrid";
import { ease, duration } from "@/lib/motion";
import styles from "./ProjectCard.module.css";

export type ProjectSpan = 3 | 4 | 6 | 8 | 12;

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  section: "work" | "projects" | "experiments";
  span?: ProjectSpan;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  span?: ProjectSpan;
  priority?: boolean;
}

const MotionLink = motion.create(Link);

export function ProjectCard({ project, span = 4, priority }: ProjectCardProps) {
  const href = `/${project.section}/${project.slug}`;
  const reduced = useReducedMotion();

  return (
    <MotionLink
      href={href}
      className={styles.card}
      data-span={span}
      style={{ "--card-span": span } as React.CSSProperties}
      variants={itemVariants}
    >
      {/* Image — scales on hover within the clipped card boundary */}
      <motion.div
        className={styles.image}
        aria-hidden="true"
        whileHover={reduced ? {} : { scale: 1.04 }}
        whileTap={reduced ? {} : { scale: 0.98 }}
        transition={{ duration: duration.fade, ease: ease.move }}
      >
        <span className={styles.imagePlaceholder} />
      </motion.div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
        {project.tags && (
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Grid reveal columns — visible on hover */}
      {/* Explicit gutter tracks so hairlines land at gutter centers, not column edges */}
      <div
        className={styles.gridOverlay}
        style={{ gridTemplateColumns: span > 1 ? `repeat(${span - 1}, 1fr var(--grid-gutter)) 1fr` : "1fr" }}
        aria-hidden="true"
      >
        {Array.from({ length: span * 2 - 1 }).map((_, i) => (
          <div key={i} className={i % 2 === 0 ? styles.gridCol : styles.gridGutter} />
        ))}
      </div>
    </MotionLink>
  );
}
