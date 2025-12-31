"use client";

import {
    ContainerScroll,
    ContainerSticky,
    ProcessCard,
    ProcessCardBody,
    ProcessCardTitle,
    useContainerScrollContext
} from "@/components/ui/process-timeline";
import { useTransform, motion } from "framer-motion";
import { Check } from "lucide-react";

const DynamicHeader = () => {
    const { scrollYProgress } = useContainerScrollContext();

    // Fade out "Our Design Process" quickly
    const opacityTitle = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    // Fade in "Bringing Vision to Life"
    const opacityNewTitle = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
    const yNewTitle = useTransform(scrollYProgress, [0.05, 0.1], [20, 0]);

    return (
        <div className="relative h-24 md:h-32 mb-8">
            <motion.div
                style={{ opacity: opacityTitle }}
                className="absolute inset-0"
            >
                <span className="block text-xs font-medium tracking-[0.1em] text-indigo-300 mb-4 uppercase">
                    HOW WE WORK
                </span>
                <h2 className="bg-gradient-to-r from-indigo-200/60 via-indigo-50 to-indigo-200/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                    Our Design Process
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: opacityNewTitle, y: yNewTitle }}
                className="absolute inset-0 flex items-center"
            >
                <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                    Bringing your vision to life <span className="text-indigo-400">step by step.</span>
                </h2>
            </motion.div>
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
            <ContainerScroll
                className="container px-6 py-12 h-[350vh]"
                style={{
                    background: "#284370",
                }}
            >
                <ContainerSticky className="top-20 flex flex-col items-start gap-8 z-20">
                    <div className="space-y-4 max-w-4xl w-full">
                        <DynamicHeader />
                        <p className="max-w-[52ch] text-sm text-slate-300">
                            From concept to completion, we follow a structured approach to bring your dream space to reality.
                        </p>
                    </div>

                    <div className="flex flex-nowrap items-start w-full">
                        {processSteps.map((step, index) => (
                            <ProcessCard
                                key={step.id}
                                itemsLength={processSteps.length}
                                index={index}
                                className="min-w-[90%] md:min-w-[70%] max-w-[90%] md:max-w-[70%] h-[400px] md:h-[500px]"
                                variant="indigo"
                            >
                                <ProcessCardTitle className="border-r border-slate-700/50">
                                    <div className="rounded-full size-12 bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 text-lg font-bold flex justify-center items-center">
                                        {step.id}
                                    </div>
                                    <div className="mt-8 text-4xl opacity-50 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                                        {step.image}
                                    </div>
                                </ProcessCardTitle>
                                <ProcessCardBody className="flex flex-col gap-6 justify-center h-full flex-1">
                                    <div>
                                        <h3 className="text-2xl font-semibold leading-tight text-white/90 mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed font-light text-sm md:text-lg mb-6">
                                            {step.description}
                                        </p>

                                        <div className="space-y-3">
                                            {step.details.map((detail, i) => (
                                                <div key={i} className="flex items-center gap-3 group/item">
                                                    <div className="rounded-full bg-indigo-500/10 p-1 group-hover/item:bg-indigo-500/20 transition-colors">
                                                        <Check className="w-3 h-3 text-indigo-300" />
                                                    </div>
                                                    <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">
                                                        {detail}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ProcessCardBody>
                            </ProcessCard>
                        ))}
                    </div>
                </ContainerSticky>
            </ContainerScroll>
        </section>
    );
}
