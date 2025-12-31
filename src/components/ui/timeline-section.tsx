"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// All 21 construction process steps
const STEPS_DATA = [
    { step: 1, title: "Consultation", subtitle: "First Contact", description: "Contact our Expert's team for Construction Enquiry", image: "/timeline/timeline1.jpg" },
    { step: 2, title: "Site Visit", subtitle: "On-Ground Assessment", description: "Our Expert's team will visit and know your Requirements", image: "/timeline/timeline2.jpg" },
    { step: 3, title: "Proposal", subtitle: "Custom Package", description: "Our Team will work on your Requirements and Send proposal", image: "/timeline/timeline3.jpg" },
    { step: 4, title: "Confirmation", subtitle: "Deal Finalized", description: "Construction Package Confirmed by clients", image: "/timeline/timeline4.jpg" },
    { step: 5, title: "2D Planning", subtitle: "Blueprint Creation", description: "Our Professional team visit site and works on 2D plan drawing", image: "/timeline/timeline5.jpg" },
    { step: 6, title: "Plan Approval", subtitle: "Client Sign-off", description: "2D Plan Drawing Approval Process", image: "/timeline/timeline6.jpg" },
    { step: 7, title: "3D Design", subtitle: "Visual Preview", description: "3D Architectural Drawing Discussion and Finalize", image: "/timeline/timeline7.jpg" },
    { step: 8, title: "Agreement", subtitle: "Contract Signing", description: "Construction Agreement Signing", image: "/timeline/timeline8.jpg" },
    { step: 9, title: "Foundation", subtitle: "Ground Work", description: "Foundation work begins with quality materials", image: "/timeline/timeline9.jpg" },
    { step: 10, title: "Structure", subtitle: "Framework Rising", description: "Structural framework and column construction", image: "/timeline/timeline10.jpg" },
    { step: 11, title: "Roof Work", subtitle: "Top Coverage", description: "Roofing and waterproofing installation", image: "/timeline/timeline11.jpg" },
    { step: 12, title: "Masonry", subtitle: "Wall Building", description: "Brick work and wall construction phase", image: "/timeline/timeline12.jpg" },
    { step: 13, title: "Electrical", subtitle: "Power Setup", description: "Electrical wiring and connection setup", image: "/timeline/timeline13.jpg" },
    { step: 14, title: "Plumbing", subtitle: "Water Systems", description: "Plumbing and sanitary installation work", image: "/timeline/timeline14.jpg" },
    { step: 15, title: "Plastering", subtitle: "Surface Finish", description: "Interior and exterior plastering work", image: "/timeline/timeline15.jpg" },
    { step: 16, title: "Flooring", subtitle: "Ground Design", description: "Floor tile and vitrified installation", image: "/timeline/timeline16.jpg" },
    { step: 17, title: "Painting", subtitle: "Color Magic", description: "Interior and exterior painting work", image: "/timeline/timeline17.jpg" },
    { step: 18, title: "Woodwork", subtitle: "Carpentry Art", description: "Door frames, windows and carpentry work", image: "/timeline/timeline18.jpg" },
    { step: 19, title: "Finishing", subtitle: "Final Touches", description: "Final touches and quality inspection", image: "/timeline/timeline19.jpg" },
    { step: 20, title: "Cleaning", subtitle: "Site Prep", description: "Post-construction cleaning and preparation", image: "/timeline/timeline20.jpg" },
    { step: 21, title: "Handover", subtitle: "Keys to You", description: "Key handover and project completion", image: "/timeline/timeline21.jpg" },
];

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const cards = cardsRef.current.filter(Boolean);
        const progress = progressRef.current;

        if (!section || !track || cards.length === 0) return;

        // Create the main horizontal scroll animation
        const scrollTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                end: () => `+=${track.scrollWidth}`,
                // snap: {
                //     snapTo: 1 / (cards.length - 1),
                //     duration: { min: 0.2, max: 0.5 },
                //     ease: "power1.inOut",
                // },
                invalidateOnRefresh: true,
            },
        });

        // Progress bar animation
        if (progress) {
            gsap.to(progress, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${track.scrollWidth}`,
                    scrub: true,
                },
            });
        }

        // Kinetic typography - animate each card's content as it enters
        cards.forEach((card) => {
            const textItems = card.querySelectorAll('.text-item');
            const image = card.querySelector('.card-image');
            const stepBadge = card.querySelector('.step-badge');
            const floatingPill = card.querySelector('.floating-pill');

            // Card reveal animation
            gsap.fromTo(card,
                {
                    opacity: 0.3,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "left 80%",
                        end: "left 30%",
                        scrub: true,
                    },
                }
            );

            // Text choreography - staggered reveal
            if (textItems.length > 0) {
                gsap.fromTo(textItems,
                    {
                        y: 60,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "left 70%",
                            end: "left 40%",
                            scrub: true,
                        },
                    }
                );
            }

            // Image parallax effect
            if (image) {
                gsap.fromTo(image,
                    { scale: 1.3, x: 50 },
                    {
                        scale: 1,
                        x: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "left right",
                            end: "right left",
                            scrub: true,
                        },
                    }
                );
            }

            // Step badge pop animation
            if (stepBadge) {
                gsap.fromTo(stepBadge,
                    { scale: 0, rotation: -180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "left 60%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Floating pill parallax
            if (floatingPill) {
                gsap.to(floatingPill, {
                    y: -30,
                    x: 20,
                    rotation: 10,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "left right",
                        end: "right left",
                        scrub: 2, // Slower scrub for parallax feel
                    },
                });
            }
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-gradient-to-br from-slate-900 via-[#082E6D] to-slate-900 overflow-hidden"
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C11336]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

                {/* SVG Path Background */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#C11336" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#082E6D" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,50% Q25%,30% 50%,50% T100%,50%"
                        stroke="url(#pathGradient)"
                        strokeWidth="2"
                        fill="none"
                        className="opacity-30"
                    />
                </svg>
            </div>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-[#C11336] via-white to-[#082E6D] origin-left"
                    style={{ transform: 'scaleX(0)' }}
                />
            </div>

            {/* Header - Compact */}
            <div className="relative z-10 pt-6 pb-4 px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    From Planning to{" "}
                    <span className="bg-gradient-to-r from-[#C11336] to-orange-400 bg-clip-text text-transparent">
                        Handover
                    </span>
                </h2>
                <p className="text-white/60 text-base max-w-2xl mx-auto">
                    Scroll to explore our 21-step construction journey
                </p>
            </div>

            {/* Horizontal Track */}
            <div className="relative h-[80vh] flex items-center">
                <div
                    ref={trackRef}
                    className="flex gap-8 px-[10vw]"
                    style={{ width: 'max-content' }}
                >
                    {STEPS_DATA.map((step, index) => (
                        <div
                            key={step.step}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="card relative flex-shrink-0 w-[350px] md:w-[400px] h-[500px] group"
                        >
                            {/* Card Container */}
                            <div className="relative h-full bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10">

                                {/* Floating Pill Label */}
                                <div className="floating-pill absolute -top-3 -right-3 z-20 px-4 py-1.5 bg-gradient-to-r from-[#C11336] to-orange-500 rounded-full text-white text-xs font-bold shadow-lg">
                                    {step.subtitle}
                                </div>

                                {/* Step Badge */}
                                <div className="step-badge absolute top-6 left-6 z-20 w-14 h-14 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center text-[#082E6D] font-black text-xl shadow-xl">
                                    {String(step.step).padStart(2, '0')}
                                </div>

                                {/* Image Section */}
                                <div className="relative h-[55%] overflow-hidden">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="card-image w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                                </div>

                                {/* Content Section */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-item text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#C11336] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-item text-white/60 text-sm leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Progress indicator */}
                                    <div className="text-item mt-4 flex items-center gap-3">
                                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#C11336] to-orange-400 rounded-full"
                                                style={{ width: `${(step.step / 21) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-white/40 text-xs font-mono">
                                            {step.step}/21
                                        </span>
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#C11336]/20 via-white/10 to-[#082E6D]/20 blur-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
