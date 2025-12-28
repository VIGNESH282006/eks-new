"use client";

import { MessageCircle, Ruler, PenTool, FileText, Hammer, CheckCircle } from "lucide-react";
import { Timeline3D, TimelineEvent } from "./3d-interactive-timeline";

const processEvents: TimelineEvent[] = [
    {
        id: '1',
        date: '01',
        title: 'Initial Consultation',
        description: 'We start with a detailed discussion about your vision, requirements, budget, and timeline to understand your unique needs.',
        icon: <MessageCircle className="text-white w-5 h-5" />,
        // Using placeholder images or generic construction ones
        image: '/interior/consultation.jpg',
        category: 'Planning',
        color: 'blue-600'
    },
    {
        id: '2',
        date: '02',
        title: 'Site Visit & Measurement',
        description: 'Our team visits your space to take precise measurements, assess the structure, and capture photos for accurate planning.',
        icon: <Ruler className="text-white w-5 h-5" />,
        image: '/interior/site-visit.jpg',
        category: 'Analysis',
        color: 'red-500'
    },
    {
        id: '3',
        date: '03',
        title: 'Design Development',
        description: 'We create detailed 3D designs, mood boards, and material selections that bring your vision to life.',
        icon: <PenTool className="text-white w-5 h-5" />,
        image: '/interior/design.jpg',
        category: 'Design',
        color: 'blue-600'
    },
    {
        id: '4',
        date: '04',
        title: 'Proposal & Agreement',
        description: 'We present a comprehensive proposal with detailed quotations, timelines, and terms for your approval.',
        icon: <FileText className="text-white w-5 h-5" />,
        image: '/interior/proposal.jpg',
        category: 'Agreement',
        color: 'red-500'
    },
    {
        id: '5',
        date: '05',
        title: 'Project Execution',
        description: 'Our skilled craftsmen begin the transformation process with regular quality checks and progress updates.',
        icon: <Hammer className="text-white w-5 h-5" />,
        image: '/interior/execution.jpg',
        category: 'Construction',
        color: 'blue-600'
    },
    {
        id: '6',
        date: '06',
        title: 'Final Handover',
        description: 'After thorough quality inspection, we hand over your beautifully transformed space ready to enjoy.',
        icon: <CheckCircle className="text-white w-5 h-5" />,
        image: '/interior/handover.jpg',
        category: 'Completion',
        color: 'red-500'
    }
];

export function InteriorDesignProcess() {
    return (
        <section className="relative z-10">
            <Timeline3D
                events={processEvents}
                backgroundColor="bg-white"
                primaryColor="bg-blue-600"
                secondaryColor="bg-red-500"
                textColor="text-gray-900"
                accentColor="bg-blue-500"
                showImages={false} // Hiding images for cleaner look closer to the user's diagram if needed, but the code supports them. Let's keep false to match the diagram more closely which is text-heavy with icons.
                className="py-24"
            />
        </section>
    );
}
