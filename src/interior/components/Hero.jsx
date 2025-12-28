'use client';

import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Label */}
                <span className={styles.label}>PRODUCT DESIGN AND DEVELOPMENT AGENCY</span>

                {/* Main Headline */}
                <h1 className={styles.headline}>
                    <em>Empowering</em> startups to launch,<br />
                    scale, and succeed faster
                </h1>

                {/* CTA Buttons */}
                <div className={styles.ctaGroup}>
                    <a href="#" className={styles.primaryBtn}>
                        LET'S TALK
                        <svg className={styles.arrow} width="12" height="12" viewBox="0 0 12 12">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </a>
                    <a href="#" className={styles.secondaryBtn}>
                        VIEW OUR CASES
                        <svg className={styles.arrow} width="12" height="12" viewBox="0 0 12 12">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </a>
                </div>

                {/* Tagline */}
                <p className={styles.tagline}>
                    From MVP to market domination – your reliable<br />
                    partner in UI/UX design and development
                </p>
            </div>
        </section>
    );
}
