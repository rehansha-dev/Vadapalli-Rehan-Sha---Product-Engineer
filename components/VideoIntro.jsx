'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

const PROFILE_IMAGE = '/images/profile.jpg';

export default function VideoIntro({ scrollTargetId = 'next-section' }) {
  const rootRef = useRef(null);
  const fgWrapRef = useRef(null);
  const taglineRef = useRef(null);
  const nameLine1Ref = useRef(null);
  const nameLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(fgWrapRef.current, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .to(taglineRef.current, { opacity: 1, duration: 0.9 }, 0.5)
        .to(
          [nameLine1Ref.current, nameLine2Ref.current],
          {
            y: '0%',
            duration: 1.3,
            stagger: 0.12,
          },
          0.65
        )
        .to(subtitleRef.current, { opacity: 1, duration: 1 }, 1.3)
        .to(scrollRef.current, { opacity: 1, duration: 0.8 }, 1.7);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function handleScrollClick() {
    const target = document.getElementById(scrollTargetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className={styles.hero} ref={rootRef}>
      {/* Blurred ambient background layer */}
      <div className={styles.bgVideoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.bgVideo} src={PROFILE_IMAGE} alt="" aria-hidden="true" />
      </div>

      {/* Foreground portrait */}
      <div className={styles.fgVideoWrap} ref={fgWrapRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.fgVideo} src={PROFILE_IMAGE} alt="Vadapalli Rehan Sha" />
      </div>

      {/* Cinematic dark gradients for legibility */}
      <div className={styles.vignette} />
      <div className={styles.gradientBottom} />
      <div className={styles.grain} />

      {/* Three.js bokeh particle atmosphere */}
      <div className={styles.particleLayer}>
        <CinematicLayer />
      </div>

      {/* Content overlay */}
      <div className={styles.content}>
        <span className={styles.tagline} ref={taglineRef}>
          CSE Undergraduate &amp; Builder
        </span>

        <div className={styles.nameBlock}>
          <span className={styles.nameLine} ref={nameLine1Ref}>
            <span className={styles.nameLineInner}>Rehan</span>
          </span>
          <span className={styles.nameLine} ref={nameLine2Ref}>
            <span className={styles.nameLineInner}>Sha</span>
          </span>
        </div>

        <p className={styles.subtitle} ref={subtitleRef}>
          <strong>CSE — Product Engineering with AI student</strong> at SRM
          University AP, building full-stack products, AI-native tools, and
          RAG systems across hackathons and independent projects — one
          product at a time.
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className={styles.scrollIndicator}
        ref={scrollRef}
        onClick={handleScrollClick}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}
