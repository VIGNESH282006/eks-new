"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DynamicHeader = () => {
    return (
        <div className="relative h-24 md:h-32 mb-8">
            <div className="absolute inset-0">
                <span className="block text-xs font-medium tracking-[0.1em] text-indigo-300 mb-4 uppercase">
                    HOW WE WORK
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                    Bringing your vision to life <span className="text-indigo-400">step by step.</span>
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
            image: "💬",
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
            image: "📏",
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
            image: "🎨",
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
            image: "📝",
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
            image: "🔨",
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
            image: "✨",
            details: [
                "Deep Cleaning & Styling",
                "Final Walkthrough Inspection",
                "Key Handover & Support"
            ]
        },
    ];

    return (
        <section className="bg-zinc-950 relative">
            {/* Scroll Animation using ScrollStack for all devices */}
            <div className="relative bg-[#284370]">
                {/* Header Container */}
                <div className="absolute top-10 left-6 md:left-10 z-10 pointer-events-none w-full max-w-4xl pr-4">
                    <DynamicHeader />
                </div>

                {/* ScrollStack Container */}
                <div className="pt-20 md:pt-0"> {/* Add padding top on mobile to clear header? Or header is absolute so it overlays. */}
                    <ScrollStack
                        itemDistance={50}
                        itemStackDistance={20}
                        stackPosition="35%"
                        scaleEndPosition="10%"
                        itemScale={0.05}
                        useWindowScroll
                    >
                        {processSteps.map((step, index) => (
                            <ScrollStackItem key={step.id} itemClassName="bg-[#284370] border border-white/20 shadow-2xl p-6 md:p-12">
                                <div className="flex flex-col md:flex-row h-full gap-6 md:gap-8 items-start md:items-center">
                                    {/* Number & Icon */}
                                    <div className="md:border-r border-slate-700/50 md:pr-8 flex flex-row md:flex-col items-center md:justify-center gap-4 md:pt-4 w-full md:w-[20%] md:h-full">
                                        <div className="rounded-full size-12 md:size-16 bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 text-lg md:text-xl font-bold flex justify-center items-center md:mb-6 shrink-0">
                                            {step.id}
                                        </div>
                                        <div className="text-4xl md:text-6xl opacity-80 filter grayscale hover:grayscale-0 transition-all duration-300">
                                            {step.image}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center h-full py-2 md:py-4 w-full">
                                        <h3 className="text-2xl md:text-4xl font-semibold leading-tight text-white mb-2 md:mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed font-light text-base md:text-xl mb-6 md:mb-8 max-w-full md:max-w-[90%]">
                                            {step.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            {step.details.map((detail, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="rounded-full bg-indigo-500/10 p-1.5 shrink-0">
                                                        <Check className="w-4 h-4 text-indigo-300" />
                                                    </div>
                                                    <span className="text-sm md:text-base text-slate-200">
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
