'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';
import styles from './StackingCardsSection.module.css';

export default function StackingCardsSection() {
    const cards = [
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
        <section className={styles.section}>
            <div className={styles.header}>
                <span className={styles.label}>HOW WE CAN HELP</span>
                <h2 className={styles.title}>Solutions for every challenge</h2>
            </div>

            <ScrollStack
                itemDistance={80}
                itemScale={0.02}
                itemStackDistance={25}
                stackPosition="25%"
                scaleEndPosition="15%"
                baseScale={0.92}
                blurAmount={1.5}
            >
                {cards.map((card, index) => (
                    <ScrollStackItem key={index}>
                        <div className="card-content">
                            <span className="card-question">{card.question}</span>
                            <p className="card-answer">{card.answer}</p>
                            <div className="card-image">
                                <span className="card-emoji">{card.image}</span>
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
}
