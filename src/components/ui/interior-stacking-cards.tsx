"use client";

import {
    ContainerScroll,
    ContainerSticky,
    ProcessCard,
    ProcessCardBody,
    ProcessCardTitle
} from "@/components/ui/process-timeline";

export function InteriorStackingCards() {
    const processSteps = [
        {
            id: '01',
            title: "Initial Consultation",
            description: "We start with a detailed discussion about your vision, requirements, budget, and timeline to understand your unique needs.",
            image: "💬"
        },
        {
            id: '02',
            title: "Site Visit & Measurement",
            description: "Our team visits your space to take precise measurements, assess the structure, and capture photos for accurate planning.",
            image: "📏"
        },
        {
            id: '03',
            title: "Design Development",
            description: "We create detailed 3D designs, mood boards, and material selections that bring your vision to life.",
            image: "🎨"
        },
        {
            id: '04',
            title: "Proposal & Agreement",
            description: "We present a comprehensive proposal with detailed quotations, timelines, and terms for your approval.",
            image: "📝"
        },
        {
            id: '05',
            title: "Project Execution",
            description: "Our skilled craftsmen begin the transformation process with regular quality checks and progress updates.",
            image: "🔨"
        },
        {
            id: '06',
            title: "Final Handover",
            description: "After thorough quality inspection, we hand over your beautifully transformed space ready to enjoy.",
            image: "✨"
        },
    ];

    return (
        <section className="bg-zinc-950 relative">
            <ContainerScroll
                className="container px-6 py-12 h-[300vh]"
                style={{
                    background: "#284370",
                }}
            >
                <ContainerSticky className="top-20 flex flex-col items-start gap-8 z-20">
                    <div className="space-y-4 max-w-4xl">
                        <span className="block text-xs font-medium tracking-[0.1em] text-indigo-300 mb-4 uppercase">
                            HOW WE WORK
                        </span>
                        <h2 className="bg-gradient-to-r from-indigo-200/60 via-indigo-50 to-indigo-200/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                            Our Design Process
                        </h2>
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
                                className="min-w-[90%] md:min-w-[60%] max-w-[90%] md:max-w-[60%]"
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
                                <ProcessCardBody className="flex flex-col gap-6 justify-center h-full">
                                    <h3 className="text-2xl font-semibold leading-tight text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base">
                                        {step.description}
                                    </p>
                                </ProcessCardBody>
                            </ProcessCard>
                        ))}
                    </div>
                </ContainerSticky>
            </ContainerScroll>
        </section>
    );
}
