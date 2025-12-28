"use client";

import { Timeline } from "@/components/ui/timeline";

const STEPS_DATA = [
    {
        title: "Step 1: Consultation",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Contact our Expert's team for Construction Enquiry
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-1.png"
                        alt="Consultation Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 2: Site Visit",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Our Expert's team will visit and know your Requirements
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-2.png"
                        alt="Site Visit Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 3: Proposal",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Our Team will work on your Requirements and Send proposal
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-3.png"
                        alt="Proposal Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 4: Confirmation",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Construction Package Confirmed by clients
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-4.png"
                        alt="Confirmation Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 5: 2D Planning",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Our Professional team visit site and works on 2D plan drawing
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-5.png"
                        alt="2D Planning Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 6: Plan Approval",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    2D Plan Drawing Approval Process
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-6.png"
                        alt="Plan Approval Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 7: 3D Design",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    3D Architectural Drawing Discussion and Finalize
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-7.png"
                        alt="3D Design Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Step 8: Agreement",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Construction Agreement Signing
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/timeline/step-8.png"
                        alt="Agreement Step"
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
];

// Generate placeholder cards for steps 9-21 as requested
for (let i = 9; i <= 21; i++) {
    STEPS_DATA.push({
        title: `Step ${i}: Upcoming Phase`,
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Detailed description for construction phase {i} will be added here.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        Image for Step {i}
                    </div>
                </div>
            </div>
        ),
    });
}


export default function TimelineSection() {
    return (
        <div className="w-full">
            <Timeline data={STEPS_DATA} />
        </div>
    );
}
