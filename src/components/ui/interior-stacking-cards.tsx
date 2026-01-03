"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DynamicHeader = () => {
    return (
        <div className="relative h-24 md:h-32 mb-8">
            <div className="absolute inset-0">
                <span className="block text-xs font-medium tracking-[0.1em] text-[#C11336] mb-4 uppercase">
                    HOW WE WORK
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-[#082E6D] leading-tight">
                    Bringing your vision to life <span className="text-[#082E6D]/70">step by step.</span>
                </h2>
            </div>
        </div>
    );
};





export function InteriorStackingCards() {
    const processSteps = [
        {
            id: '01',
            title: "Initial Consultation",
            description: "We start with a detailed discussion about your vision, requirements, budget, and timeline to understand your unique needs.",
            image: "/interior-image-1.webp",
            details: [
                "Vision & Requirement Analysis",
                "Budget Planning & Estimations",
                "Timeline Assessment"
            ]
        },
        {
            id: '02',
            title: "Site Visit & Measurement",
            description: "Our team visits your space to take precise measurements, assess the structure, and capture photos for accurate planning.",
            image: "/interior-image-2.webp",
            details: [
                "Precise Laser Measurements",
                "Structural Assessment",
                "Site Photography & Documentation"
            ]
        },
        {
            id: '03',
            title: "Design Development",
            description: "We create detailed 3D designs, mood boards, and material selections that bring your vision to life.",
            image: "/interior-image-3.webp",
            details: [
                "2D Layouts & Space Planning",
                "Photorealistic 3D Renderings",
                "Material & Finish Selection"
            ]
        },
        {
            id: '04',
            title: "Proposal & Agreement",
            description: "We present a comprehensive proposal with detailed quotations, timelines, and terms for your approval.",
            image: "/interior-image-4.webp",
            details: [
                "Detailed Cost Breakdown",
                "Scope of Work Definition",
                "Contract & Timeline Agreement"
            ]
        },
        {
            id: '05',
            title: "Project Execution",
            description: "Our skilled craftsmen begin the transformation process with regular quality checks and progress updates.",
            image: "/interior-image-5.webp",
            details: [
                "Material Procurement & Logistics",
                "On-site Supervision",
                "Quality Control Checks"
            ]
        },
        {
            id: '06',
            title: "Final Handover",
            description: "After thorough quality inspection, we hand over your beautifully transformed space ready to enjoy.",
            image: "/interior-image-6.webp",
            details: [
                "Deep Cleaning & Styling",
                "Final Walkthrough Inspection",
                "Key Handover & Support"
            ]
        },
    ];

    return (
        <section className="bg-white relative">
            {/* Scroll Animation using ScrollStack for all devices */}
            <div className="relative bg-white">
                {/* Header Container */}
                <div className="absolute top-4 left-6 md:left-10 z-10 pointer-events-none w-full max-w-4xl pr-4">
                    <DynamicHeader />
                </div>

                {/* ScrollStack Container */}
                <div className="pt-36 md:pt-10"> {/* Add padding top on mobile to clear header? Or header is absolute so it overlays. */}
                    <ScrollStack
                        itemDistance={50}
                        itemStackDistance={20}
                        stackPosition="20%"
                        scaleEndPosition="10%"
                        itemScale={0.05}
                        useWindowScroll
                    >
                        {processSteps.map((step, index) => (
                            <ScrollStackItem key={step.id} itemClassName="bg-gray-200/60 backdrop-blur-3xl border border-white/40 shadow-2xl p-6 md:p-12 relative overflow-hidden">
                                {/* Glass Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />

                                <div className="relative z-10 flex flex-col md:flex-row h-full gap-6 md:gap-8 items-start md:items-center">
                                    {/* Icon Only */}
                                    <div className="md:border-r border-[#082E6D]/10 md:pr-8 flex flex-col items-center justify-center gap-4 md:pt-4 w-full md:w-[30%] md:h-full">
                                        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 overflow-hidden rounded-full shadow-lg border-4 border-white/20">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center h-full py-2 md:py-4 w-full">
                                        <h3 className="text-2xl md:text-4xl font-semibold leading-tight text-[#082E6D] mb-2 md:mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#082E6D]/80 leading-relaxed font-light text-base md:text-xl mb-6 md:mb-8 max-w-full md:max-w-[90%]">
                                            {step.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            {step.details.map((detail, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="rounded-full bg-[#082E6D]/10 p-1.5 shrink-0">
                                                        <Check className="w-4 h-4 text-[#082E6D]" />
                                                    </div>
                                                    <span className="text-sm md:text-base text-[#082E6D]/90">
                                                        {detail}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </div>
        </section>
    );
}
