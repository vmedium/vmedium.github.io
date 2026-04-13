import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/content";
import { Prose } from "@/components/ui/Prose";
import { Zone } from "@/components/ui/Zone";
import styles from "@/app/work/[slug]/page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects("experiments").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getProject("experiments", slug);
  if (!result) return {};
  return { title: result.project.title, description: result.project.description };
}

export default async function ExperimentDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = getProject("experiments", slug);
  if (!result) notFound();
  const { project, content } = result;

  return (
    <article className={styles.article}>
      <div className="container">
        <Zone index={1}>
          <nav className={styles.breadcrumb}>
            <Link href="/experiments">Experiments</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>
        </Zone>

        <Zone index={2}>
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
        </Zone>

        <Zone index={3}>
          <div className={styles.hero} aria-hidden="true" />
        </Zone>

        <Zone index={4}>
          <div className={styles.body}>
            <Prose content={content} />
          </div>
        </Zone>
      </div>
    </article>
  );
}
