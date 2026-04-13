import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/content";
import { Prose } from "@/components/ui/Prose";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects("work").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getProject("work", slug);
  if (!result) return {};
  return { title: result.project.title, description: result.project.description };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const result = getProject("work", slug);
  if (!result) notFound();

  const { project, content } = result;

  return (
    <article className={styles.article}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link href="/work">Work</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag}>{tag}</li>
              ))}
            </ul>
          )}
        </header>

        {/* Hero placeholder */}
        {/* Hero placeholder */}
        <div className={styles.hero} aria-hidden="true" />

        <div className={styles.body}>
          <Prose content={content} />
        </div>
      </div>
    </article>
  );
}
