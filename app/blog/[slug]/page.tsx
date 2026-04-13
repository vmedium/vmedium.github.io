import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/blog";
import { Prose } from "@/components/ui/Prose";
import { Zone } from "@/components/ui/Zone";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getPost(slug);
  if (!result) return {};
  return { title: result.post.title, description: result.post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = getPost(slug);
  if (!result) notFound();
  const { post, content } = result;

  return (
    <article className={styles.article}>
      <div className="container">
        <Zone index={1}>
          <nav className={styles.breadcrumb}>
            <Link href="/blog">Writing</Link>
            <span aria-hidden="true">/</span>
            <span>{post.title}</span>
          </nav>
        </Zone>

        <Zone index={2}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <time className={styles.date} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>
          </header>
        </Zone>

        <Zone index={3}>
          <div className={styles.body}>
            <Prose content={content} />
          </div>
        </Zone>
      </div>
    </article>
  );
}
