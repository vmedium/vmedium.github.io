import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Zone } from "@/components/ui/Zone";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on AI methods, design tools, process, and other things worth writing down.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className={styles.page}>
      <div className="container">
        <Zone index={1}>
          <SectionHeader
            label="Writing"
            title="Notes"
            description="AI methods, design tools, process, and other things worth writing down."
            count={posts.length}
          />
        </Zone>

        <Zone index={2}>
          <div className={styles.content}>
            <div className={styles.listWrap}>
              {posts.length === 0 ? (
                <div className={styles.empty}>
                  <span>No posts yet. Add markdown files to{" "}<code>content/blog/</code></span>
                </div>
              ) : (
                <ul className={styles.list}>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className={styles.post}>
                        <div className={styles.postMeta}>
                          <time className={styles.date} dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <div className={styles.postTags}>
                            {post.tags.map((tag) => (
                              <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.postDescription}>{post.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Zone>
      </div>
    </div>
  );
}
