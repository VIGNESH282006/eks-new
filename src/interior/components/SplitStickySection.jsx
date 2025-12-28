'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SplitStickySection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function SplitStickySection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the left side and animate scale on scroll end
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: leftRef.current,
                pinSpacing: false,
                onUpdate: (self) => {
                    // Scale down and fade the image as we near the end
                    const progress = self.progress;
                    if (progress > 0.85) {
                        const fadeProgress = (progress - 0.85) / 0.15;
                        gsap.to(imageRef.current, {
                            scale: 1 - (fadeProgress * 0.1),
                            opacity: 1 - (fadeProgress * 0.3),
                            duration: 0.1,
                            overwrite: true
                        });
                    } else {
                        gsap.to(imageRef.current, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.1,
                            overwrite: true
                        });
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { number: '98%', label: 'customer satisfaction rate' },
        { number: '35%+', label: 'boost in conversions after redesign' },
        { number: '60+', label: 'top-tier designers and developers on board' },
        { number: '500M+', label: 'investments raised by our clients' },
    ];

    const additionalStats = [
        { number: '150+', label: 'successful projects delivered globally' },
        { number: '12+', label: 'years of combined industry experience' },
        { number: '24/7', label: 'dedicated support for all clients' },
        { number: '99.9%', label: 'uptime guarantee on all deployments' },
    ];

    const achievements = [
        { icon: '🏆', title: 'Award Winning', description: 'Recognized by industry leaders for innovation in design and development.' },
        { icon: '🚀', title: 'Fast Delivery', description: 'MVP to market in as little as 6 weeks with our agile methodology.' },
        { icon: '🔐', title: 'Enterprise Security', description: 'SOC2 compliant processes ensuring your data stays protected.' },
        { icon: '🌍', title: 'Global Reach', description: 'Serving clients across North America, Europe, and Asia Pacific.' },
    ];

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Left Column - Sticky */}
            <div ref={leftRef} className={styles.leftColumn}>
                <div ref={imageRef} className={styles.imageContainer}>
                    {/* Placeholder for video/image - using a mock dashboard */}
                    <div className={styles.mockDashboard}>
                        <div className={styles.dashboardHeader}>
                            <span className={styles.time}>9:41</span>
                            <div className={styles.headerIcons}>
                                <span className={styles.signal}>●●●●</span>
                                <span className={styles.wifi}>📶</span>
                                <span className={styles.battery}>🔋</span>
                            </div>
                        </div>
                        <div className={styles.dashboardContent}>
                            <h3 className={styles.dashboardTitle}>Dashboard</h3>
                            <div className={styles.dashboardCard}>
                                <div className={styles.cardItem}>
                                    <span className={styles.cardIcon} style={{ background: '#4CAF50' }}>✓</span>
                                    <div>
                                        <div className={styles.cardLabel}>Active Policies</div>
                                        <div className={styles.cardNumber}>420</div>
                                        <div className={styles.cardSub}>Don't need attention</div>
                                    </div>
                                </div>
                                <div className={styles.cardItem}>
                                    <span className={styles.cardIcon} style={{ background: '#FF5722' }}>!</span>
                                    <div>
                                        <div className={styles.cardLabel}>Expiring Soon</div>
                                        <div className={styles.cardNumber}>15</div>
                                        <div className={styles.cardSub}>Pre-request required</div>
                                    </div>
                                </div>
                                <div className={styles.cardItem}>
                                    <span className={styles.cardIcon} style={{ background: '#FFC107' }}>?</span>
                                    <div>
                                        <div className={styles.cardLabel}>Need Validation</div>
                                        <div className={styles.cardNumber}>30</div>
                                        <div className={styles.cardSub}>Validation required</div>
                                    </div>
                                </div>
                                <div className={styles.cardItem}>
                                    <span className={styles.cardIcon} style={{ background: '#9E9E9E' }}>⏱</span>
                                    <div>
                                        <div className={styles.cardLabel}>Recently Expired</div>
                                        <div className={styles.cardNumber}>7</div>
                                        <div className={styles.cardSub}>Renew requests file</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Scrolls naturally with MORE content */}
            <div className={styles.rightColumn}>
                <div className={styles.statsHeader}>
                    <span className={styles.statsLabel}>PHENOMENON STUDIO IN NUMBERS</span>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statNumber}>{stat.number}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Additional Stats Section */}
                <div className={styles.divider}></div>

                <div className={styles.statsHeader}>
                    <span className={styles.statsLabel}>WHY CHOOSE US</span>
                </div>

                <div className={styles.statsGrid}>
                    {additionalStats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statNumber}>{stat.number}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Achievements Section */}
                <div className={styles.divider}></div>

                <div className={styles.statsHeader}>
                    <span className={styles.statsLabel}>OUR ACHIEVEMENTS</span>
                </div>

                <div className={styles.achievementsGrid}>
                    {achievements.map((item, index) => (
                        <div key={index} className={styles.achievementItem}>
                            <span className={styles.achievementIcon}>{item.icon}</span>
                            <h4 className={styles.achievementTitle}>{item.title}</h4>
                            <p className={styles.achievementDesc}>{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Extra spacer for more scroll */}
                <div className={styles.extraContent}>
                    <p className={styles.quoteText}>
                        "Working with Phenomenon has been transformative for our business.
                        Their attention to detail and commitment to excellence is unmatched."
                    </p>
                    <span className={styles.quoteAuthor}>— Sarah Chen, CEO at TechFlow</span>
                </div>
            </div>
        </section>
    );
}
