'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import VideoIntro from '../components/VideoIntro';
import styles from './page.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    name: 'NOVA XI',
    stack: 'Product Engineering · Web',
    desc: 'A centralized event discovery and scheduling platform solving fragmented university event info — search, save, conflict detection, and personal scheduling.',
  },
  {
    name: 'Roommate Finder',
    stack: 'Flask · PostgreSQL · HTML/CSS',
    desc: 'A hostel roommate and room-capacity matching platform for university communities, built end-to-end and deployed on Render.',
  },
  {
    name: 'AquaWatch',
    stack: 'Flask · SQLite · JavaScript · Leaflet · Chart.js',
    desc: 'A community health platform for early detection of water-borne illness clusters, with geo-reporting and an area-level outbreak dashboard.',
  },
  {
    name: 'SpendWise',
    stack: 'Web · CSS · JavaScript',
    desc: 'A student expense analysis app that helps users understand spending patterns and identify unnecessary expenses.',
  },
  {
    name: 'Resume Matcher',
    stack: 'Python · AI/ML',
    desc: 'An AI-oriented matcher that scores candidate resumes against job requirements using text processing and relevance logic.',
  },
  {
    name: 'Voice RAG — Hacker House Goa',
    stack: 'RAG · Voice · LLM Integration',
    desc: 'A voice-enabled Retrieval-Augmented Generation system built during Hacker House Goa, exploring AI architectures beyond chatbots.',
  },
];

const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['Python', 'C', 'Embedded C', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'SQLite'],
  },
  {
    label: 'AI & ML',
    items: ['Machine Learning', 'RAG', 'Voice RAG', 'SLMs', 'AI-native Apps'],
  },
  {
    label: 'Tooling',
    items: ['Git', 'GitHub', 'VS Code', 'Deployment & Debugging'],
  },
];

const ACHIEVEMENTS = [
  'Solved 200+ problems on CodeChef, reaching a global rank of 9,877 in the first week',
  'Diploma graduate in Robotics and Embedded Systems',
  '2nd Place Runner-Up — IEEE Genesis Hackathon, SRM University-AP',
];

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.reveal}`).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.main} ref={mainRef}>
      <VideoIntro scrollTargetId="about" />

      {/* ABOUT */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>About</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Building scalable, user-focused software — one product at a time.
          </h2>
          <div className={styles.aboutGrid}>
            <p className={`${styles.aboutText} ${styles.reveal}`}>
              I&apos;m <strong>Vadapalli Rehan Sha</strong>, a Computer Science
              and Engineering student specializing in{' '}
              <strong>Product Engineering with Artificial Intelligence</strong> at
              SRM University-AP. I like taking projects from idea to
              implementation — full-stack development, AI/ML, RAG systems, and
              cybersecurity — and building products around real problems.
              Alongside development, I&apos;m active in hackathons, Model UN,
              and technical communities.
            </p>
            <div className={`${styles.statList} ${styles.reveal}`}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1st Yr</div>
                <div className={styles.statLabel}>CSE · SRM University-AP</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10+</div>
                <div className={styles.statLabel}>Projects Shipped</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>200+</div>
                <div className={styles.statLabel}>Problems Solved · CodeChef</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>Selected Work</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Projects</h2>
          <div className={`${styles.projectGrid} ${styles.reveal}`}>
            {PROJECTS.map((p, i) => (
              <div className={styles.projectCard} key={p.name}>
                <span className={styles.projectIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.projectName}>{p.name}</h3>
                <span className={styles.projectStack}>{p.stack}</span>
                <p className={styles.projectDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>Toolkit</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Skills</h2>
          <div className={`${styles.skillGroups} ${styles.reveal}`}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <span className={styles.skillGroupLabel}>{group.label}</span>
                <div className={styles.pillRow}>
                  {group.items.map((item) => (
                    <span className={styles.pill} key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>Track Record</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Achievements</h2>
          <div className={`${styles.achieveList} ${styles.reveal}`}>
            {ACHIEVEMENTS.map((a) => (
              <div className={styles.achieveItem} key={a}>
                <span className={styles.achieveMark}>&#9670;</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.contact}`}>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>Get in touch</span>
          <h2 className={`${styles.contactTitle} ${styles.reveal}`}>
            Let&apos;s build something worth shipping.
          </h2>
          <div className={`${styles.contactLinks} ${styles.reveal}`}>
            <a
              className={styles.contactLink}
              href="mailto:Rehansha.v@gmail.com"
            >
              Rehansha.v@gmail.com
            </a>
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/rehan-sha-a69081359/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className={styles.contactLink}
              href="https://github.com/rehansha-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className={styles.contactLink}
              href="https://www.codechef.com/users/rehanshadev"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeChef
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        © 2026 Vadapalli Rehan Sha · Andhra Pradesh, India
      </footer>
    </main>
  );
}
