"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, Heart, Users, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function InteriorSplitSticky() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

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
        { number: '100+', label: 'INTERIOR PROJECTS' },
        { number: '10+', label: 'YEARS EXPERIENCE' },
        { number: '100%', label: 'CLIENT SATISFACTION' },
        { number: '50+', label: 'DESIGN AWARDS' },
    ];

    const philosophyPoints = [
        {
            icon: <ArrowRight className="w-10 h-10 text-orange-500" />,
            title: "Form Follows Function",
            description: "Beautiful designs for your daily life. We ensure every aesthetic choice serves a practical purpose."
        },
        {
            icon: <Leaf className="w-10 h-10 text-orange-500" />,
            title: "Sustainable Choices",
            description: "Eco-friendly energy-efficient solutions. We prioritize materials and systems that are kind to the planet."
        },
        {
            icon: <Heart className="w-10 h-10 text-orange-500" />,
            title: "Personal Expression",
            description: "Your personality reflected in every design. We tailor every detail to tell your unique story."
        },
        {
            icon: <Clock className="w-10 h-10 text-orange-500" />,
            title: "Timeless Appeal",
            description: "Designs that remain beautiful for years to come. We avoid fleeting trends in favor of enduring style."
        }
    ];

    return (
        <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 min-h-[200vh] bg-[#284370] relative">
            {/* Left Column - Sticky */}
            <div ref={leftRef} className="lg:sticky top-0 h-screen flex items-center justify-center p-8 overflow-hidden">
                <div ref={imageRef} className="w-full max-w-[600px] aspect-square bg-[#1e3458] rounded-[2rem] overflow-hidden shadow-2xl origin-center will-change-transform border border-blue-400/20 relative group">
                    {/* Video Element */}
                    <video
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/interior/design-philosophy-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                </div>
            </div>

            {/* Right Column - Scrolling Content */}
            <div className="flex flex-col justify-start px-8 lg:px-16 pt-32 pb-48 text-white">
                <div className="mb-12">
                    <span className="block text-xs font-medium tracking-[0.15em] text-blue-300/70 mb-2">EKS CONSTRUCTION IN NUMBERS</span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-16 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <span className="text-4xl lg:text-5xl font-light leading-none text-white">{stat.number}</span>
                            <span className="text-xs text-blue-200 tracking-wider uppercase">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent my-20"></div>

                <div className="mb-12">
                    <span className="block text-xs font-medium tracking-[0.15em] text-blue-300/70 mb-2">OUR DESIGN PHILOSOPHY</span>
                    <h2 className="text-3xl font-light text-white mt-4 leading-normal">
                        At eks Construction, we believe that exceptional interior design is born from the perfect balance of beauty and functionality.
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 mb-8">
                    {philosophyPoints.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-2">
                                {item.icon}
                                <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                            </div>
                            <p className="text-sm text-blue-100/80 leading-relaxed pl-[3.5rem]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
