"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCheck, Trophy, Lightbulb, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function InteriorFlyingMask() {
    const sectionRef = useRef<HTMLElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Initial curved path
                const curvedPath = "M0,0 L0,85 Q25,100 50,85 L50,0 Z M50,0 L50,85 Q75,100 100,85 L100,0 Z";
                // Final flat path
                const flatPath = "M0,0 L0,0 Q25,0 50,0 L50,0 Z M50,0 L50,0 Q75,0 100,0 L100,0 Z";

                // Set initial path
                if (pathRef.current) gsap.set(pathRef.current, { attr: { d: curvedPath } });

                // Animate the path morphing
                if (pathRef.current) {
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
                }

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
            });

            // Mobile fallback cleanup if needed (optional since we scoped to min-width)
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: <UserCheck className="w-8 h-8" />,
            title: "Personalized Approach",
            description: "Every design is tailored to your unique style, needs, and lifestyle. No cookie-cutter solutions here.",
            highlight: "TAILORED",
            color: "text-blue-600",
            hoverGradient: "from-blue-600 to-blue-950"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Premium Quality",
            description: "We use only the finest materials and work with skilled craftsmen to ensure exceptional results.",
            highlight: "EXCELLENCE",
            color: "text-red-500",
            hoverGradient: "from-red-600 to-red-950"
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Smart Solutions",
            description: "Innovative design solutions that maximize space utility while maintaining aesthetic appeal.",
            highlight: "INNOVATION",
            color: "text-blue-600",
            hoverGradient: "from-blue-600 to-blue-950"
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: "End-to-End Service",
            description: "From concept design to final installation, we handle everything so you can relax and enjoy the process.",
            highlight: "SEAMLESS",
            color: "text-red-500",
            hoverGradient: "from-red-600 to-red-950"
        },
    ];

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden">
            {/* Black mask with SVG curved bottom which flies up - Desktop only */}
            <div ref={maskRef} className="absolute top-0 left-0 w-full h-[50vh] z-10 pointer-events-none will-change-transform hidden lg:block">
                <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        ref={pathRef}
                        fill="#284370" // matching previous section
                        d="M0,0 L0,85 Q25,100 50,85 L50,0 Z M50,0 L50,85 Q75,100 100,85 L100,0 Z"
                    />
                </svg>
            </div>

            {/* White section content (Sets Us Apart) */}
            <div className="pt-16 md:pt-24 lg:pt-48 pb-16 px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="mb-20 text-center lg:text-left">
                    <span className="block text-xs font-medium tracking-[0.1em] text-zinc-400 mb-4 uppercase">
                        Product Design and Construction Agency
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-normal text-zinc-900 italic leading-tight">
                        What Sets Us Apart
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="aspect-square rounded-2xl relative overflow-hidden cursor-pointer border border-zinc-200 group bg-zinc-50 shadow-sm hover:shadow-xl transition-all duration-300">
                            {/* Default State - Logo */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:-translate-y-4 p-6 text-center">
                                <span className={`mb-4 ${feature.color}`}>{feature.icon}</span>
                                <span className="text-xl font-semibold text-zinc-900">{feature.title}</span>
                            </div>

                            {/* Hover State - Details */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} p-6 flex flex-col items-start translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-y-0 text-left`}>
                                <span className="text-sm font-medium text-white mb-3">{feature.icon}</span>
                                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-sm text-white/80 leading-relaxed mb-auto">
                                    {feature.description}
                                </p>
                                <span className="px-3 py-1 bg-white/10 rounded text-[10px] font-semibold text-white tracking-wider self-start mt-4">
                                    {feature.highlight}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
