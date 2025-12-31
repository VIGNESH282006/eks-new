"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, PaintBucket, Fan } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
    {
        id: "civil",
        label: "Civil Construction",
        title: "Civil Construction",
        subtitle: "Foundation & Structure",
        description: "Delivering integrated, technology-driven construction services. We specialize in foundation engineering, structural development, and comprehensive building solutions.",
        image: "/civil-construction-bg.png",
        icon: Building2,
    },
    {
        id: "renovation",
        label: "Renovation",
        title: "Renovation",
        subtitle: "Revive & Redefine",
        description: "Transforming existing structures with modern design and innovative techniques. Bringing new life, function, and style to every space.",
        image: "/renovation-bg.png",
        icon: PaintBucket,
    },
    {
        id: "interior",
        label: "Interior",
        title: "Interior Design",
        subtitle: "HVAC & Infrastructure",
        description: "Advanced mechanical systems and beautiful interiors. Complete HVAC solutions and mechanical infrastructure for optimal performance.",
        image: "/interior-hvac-bg.png",
        icon: Fan,
    },
];

export default function WhatWeOfferSection() {
    const [activeId, setActiveId] = useState<string | null>("civil");

    return (
        <section className="bg-gradient-to-br from-stone-50 to-[#e5e5e5] py-12 px-4 overflow-hidden"> {/* Light Stone Background */}
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        What We <span className="text-[#dc2626]">Offer</span>
                    </h2>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto font-medium">
                        Excellence in every detail. Explore our core construction and design services.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] gap-4">
                    {SERVICES.map((service) => {
                        const isActive = activeId === service.id;
                        return (
                            <motion.div
                                key={service.id}
                                layout
                                onClick={() => setActiveId(service.id)}
                                onMouseEnter={() => setActiveId(service.id)}
                                className={cn(
                                    "relative h-[250px] lg:h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-xl border border-white/20",
                                    isActive ? "flex-[3]" : "flex-[1]"
                                )}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                                    style={{
                                        backgroundImage: `url(${service.image})`,
                                        transform: isActive ? 'scale(1.0)' : 'scale(1.15)',
                                        filter: isActive ? 'brightness(1)' : 'brightness(0.7) grayscale(100%)'
                                    }}
                                />

                                {/* Overlay Gradient - Darker at bottom for text readability even in light theme */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                                    isActive ? "opacity-90" : "opacity-60"
                                )} />

                                {/* Content Container */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    {/* Icon */}
                                    <div className={cn(
                                        "mb-4 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500",
                                        isActive
                                            ? "bg-[#dc2626] border-[#dc2626] text-white"
                                            : "bg-black/30 backdrop-blur-sm border-white/50 text-white"
                                    )}>
                                        <service.icon className="w-6 h-6" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative overflow-hidden w-full">
                                        <motion.h3
                                            layout="position"
                                            className={cn(
                                                "text-xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide whitespace-nowrap lg:whitespace-normal drop-shadow-md",
                                                !isActive && "lg:-rotate-90 lg:origin-bottom-left lg:absolute lg:bottom-0 lg:left-0 lg:w-[400px] lg:mb-12 lg:text-3xl"
                                            )}
                                        >
                                            {service.title}
                                        </motion.h3>

                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-red-400 font-semibold text-lg mb-3">
                                                        {service.subtitle}
                                                    </p>
                                                    <p className="text-stone-200 leading-relaxed mb-6 max-w-lg hidden md:block drop-shadow-sm">
                                                        {service.description}
                                                    </p>
                                                    <p className="text-stone-200 leading-relaxed mb-4 md:hidden text-sm line-clamp-2 drop-shadow-sm">
                                                        {service.description}
                                                    </p>


                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
