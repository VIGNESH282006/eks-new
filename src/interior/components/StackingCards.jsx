'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StackingCards.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function StackingCards() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);

            cards.forEach((card, index) => {
                // Each card starts from below and stacks
                const isLast = index === cards.length - 1;

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 0.5,
                    onUpdate: (self) => {
                        // Card rises and sticks
                        if (!isLast) {
                            gsap.to(card, {
                                y: -20 * (1 - self.progress),
                                scale: 1 - (0.03 * (cards.length - 1 - index) * self.progress),
                                duration: 0.1,
                                overwrite: true
                            });
                        }
                    }
                });

                // Pin each card except the last
                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 20%',
                        end: `+=${100 * (cards.length - index)}%`,
                        pin: true,
                        pinSpacing: false,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cardData = [
        {
            question: "Need to meet tight deadlines but don't have enough hands on deck?",
            answer: "Hiring in-house takes time—posting jobs, sorting resumes, and onboarding. We can get you a dedicated designer or developer ready to start tomorrow, helping you hit your deadlines without the wait.",
            image: "👩‍💻"
        },
        {
            question: "Your product needs to scale, but your user experience is holding you back?",
            answer: "As a digital product design agency, we know seamless scaling starts with consistency. We implement design systems and optimize your UX to keep users engaged—ensuring rapid growth doesn't compromise quality.",
            image: "👨‍💼"
        },
        {
            question: "Struggling to turn your vision into a working product?",
            answer: "We bridge the gap between idea and execution. Our team transforms your concepts into functional, beautiful products that users love—from initial wireframes to polished final releases.",
            image: "🎨"
        },
        {
            question: "Looking for a partner who truly understands your industry?",
            answer: "With experience across fintech, healthcare, e-commerce, and SaaS, we bring domain expertise that accelerates development. We speak your language and understand your unique challenges.",
            image: "🚀"
        },
    ];

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>HOW WE CAN HELP</span>
                    <h2 className={styles.title}>Solutions for every challenge</h2>
                </div>

                <div className={styles.cardsContainer}>
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className={styles.card}
                            style={{ zIndex: cardData.length - index }}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.cardContent}>
                                    <span className={styles.cardQuestion}>{card.question}</span>
                                    <p className={styles.cardAnswer}>{card.answer}</p>
                                </div>
                                <div className={styles.cardImage}>
                                    <span className={styles.imageEmoji}>{card.image}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
