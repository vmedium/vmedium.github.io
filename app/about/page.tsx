import type { Metadata } from "next";
import { Zone } from "@/components/ui/Zone";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "JT DiMartile — product designer, musician, and visual artist.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.grid}>

          {/* Bio column */}
          <Zone index={1} className={styles.bio}>
            <header className={styles.header}>
              <span className={styles.label}>About</span>
              <h1 className={styles.name}>JT DiMartile</h1>
            </header>

            <div className={styles.body}>
              <p>
                Product designer working at the intersection of systems thinking,
                typography, and interaction. I design software used by hundreds of
                thousands of people, and make music and visual art when I&apos;m not.
              </p>
              <p>
                I care about the grid, the gap, and what happens in between.
                My work tends toward the systematic — I believe good design is
                mostly invisible and only occasionally beautiful.
              </p>
              <p>
                Currently available for select projects. Particularly interested in
                early-stage product work, design systems, and things that don&apos;t
                exist yet.
              </p>
            </div>

            <div className={styles.contact}>
              <a
                href="mailto:hello@vmedium.xyz"
                className={styles.contactLink}
              >
                hello@vmedium.xyz
              </a>
            </div>
          </Zone>

          {/* Info columns */}
          <Zone index={2} className={styles.aside}>
            <dl className={styles.info}>
              <div className={styles.infoGroup}>
                <dt className={styles.infoLabel}>Discipline</dt>
                <dd>Product Design</dd>
                <dd>Design Systems</dd>
                <dd>UX Research</dd>
                <dd>Visual Art</dd>
                <dd>Music</dd>
              </div>

              <div className={styles.infoGroup}>
                <dt className={styles.infoLabel}>Currently</dt>
                <dd>New York, NY</dd>
              </div>

              <div className={styles.infoGroup}>
                <dt className={styles.infoLabel}>Links</dt>
                <dd>
                  <a href="https://instagram.com/vmedium" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </dd>
                <dd>
                  <a href="https://twitter.com/vmedium" target="_blank" rel="noopener noreferrer">
                    Twitter / X
                  </a>
                </dd>
                <dd>
                  <a href="https://github.com/vmedium" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </dd>
                <dd>
                  <a href="https://linkedin.com/in/vmedium" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </Zone>

        </div>
      </div>
    </div>
  );
}
