'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FlyingMaskTransition.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function FlyingMaskTransition() {
    const sectionRef = useRef(null);
    const maskRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial curved path (U-shape at bottom) - this is the starting state
            const curvedPath = "M0,0 L0,85 Q25,100 50,85 L50,0 Z M50,0 L50,85 Q75,100 100,85 L100,0 Z";
            // Final flat path (pulled up) - this is the end state
            const flatPath = "M0,0 L0,0 Q25,0 50,0 L50,0 Z M50,0 L50,0 Q75,0 100,0 L100,0 Z";

            // Set initial path
            gsap.set(pathRef.current, { attr: { d: curvedPath } });

            // Animate the path morphing
            gsap.to(pathRef.current, {
                attr: { d: flatPath },
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1,
                }
            });

            // Also animate the mask container position
            gsap.to(maskRef.current, {
                yPercent: -100,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    end: 'top -20%',
                    scrub: 1.5,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const clients = [
        {
            logo: '⬡ airportr',
            name: 'Airportr',
            description: 'Revolutionizing airport luggage delivery across Europe with seamless logistics.',
            amount: '€12.5M',
            tags: ['LOGISTICS', '🇬🇧 UK']
        },
        {
            logo: 'nomupay.',
            name: 'Nomupay',
            description: 'Nomupay raises €35.9 million to expand unified payments access in Asia market.',
            amount: '€35.9M',
            tags: ['FINTECH', '🇮🇪 IRELAND']
        },
        {
            logo: 'OneText',
            name: 'OneText',
            description: 'SMS commerce platform helping brands drive revenue through conversational AI.',
            amount: '$8.2M',
            tags: ['COMMERCE', '🇺🇸 USA']
        },
        {
            logo: '👑 SHAGA',
            name: 'Shaga',
            description: 'An emerging leader in cloud gaming, successfully raised $1M in Pre-Seed funding round.',
            amount: '$1M',
            tags: ['GAMING', '🇸🇬 SINGAPORE']
        },
    ];

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Black mask with SVG curved bottom */}
            <div ref={maskRef} className={styles.mask}>
                <svg
                    className={styles.svgMask}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        ref={pathRef}
                        fill="#0a0a0a"
                        d="M0,0 L0,85 Q25,100 50,85 L50,0 Z M50,0 L50,85 Q75,100 100,85 L100,0 Z"
                    />
                </svg>
            </div>

            {/* White section content (Client Wins) */}
            <div className={styles.content}>
                <div className={styles.headerSection}>
                    <span className={styles.sectionLabel}>PRODUCT DESIGN AND DEVELOPMENT AGENCY</span>
                    <h2 className={styles.sectionTitle}>Our featured client wins</h2>
                </div>

                <div className={styles.clientGrid}>
                    {clients.map((client, index) => (
                        <div key={index} className={styles.clientCard}>
                            {/* Default State - Logo */}
                            <div className={styles.cardDefault}>
                                <span className={styles.logoText}>{client.logo}</span>
                            </div>

                            {/* Hover State - Details */}
                            <div className={styles.cardHover}>
                                <div className={styles.hoverContent}>
                                    <span className={styles.hoverLogo}>{client.logo}</span>
                                    <p className={styles.hoverDescription}>{client.description}</p>
                                    <span className={styles.hoverAmount}>{client.amount}</span>
                                    <div className={styles.hoverTags}>
                                        {client.tags.map((tag, i) => (
                                            <span key={i} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
