"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NumberFlow from "@number-flow/react";
import { ArrowRight, UserCheck, Trophy, Lightbulb, Settings } from "lucide-react";

const stats = [
    {
        value: 100,
        suffix: "+",
        label: "INTERIOR PROJECTS",
    },
    {
        value: 10,
        suffix: "+",
        label: "YEARS EXPERIENCE",
    },
    {
        value: 100,
        suffix: "%",
        label: "CLIENT SATISFACTION",
    },
];

const philosophyPoints = [
    {
        title: "Form Follows Function",
        description: "Beautiful designs for your daily life"
    },
    {
        title: "Sustainable Choices",
        description: "Eco-friendly energy-efficient solutions"
    },
    {
        title: "Personal Expression",
        description: "Your personality reflected in every design"
    },
    {
        title: "Timeless Appeal",
        description: "Designs that remain beautiful for years to come"
    }
];

const setsUsApart = [
    {
        icon: UserCheck,
        title: "Personalized Approach",
        description: "Every design is tailored to your unique style, needs, and lifestyle. No cookie-cutter solutions here.",
        color: "blue"
    },
    {
        icon: Trophy,
        title: "Premium Quality",
        description: "We use only the finest materials and work with skilled craftsmen to ensure exceptional results.",
        color: "red"
    },
    {
        icon: Lightbulb,
        title: "Smart Solutions",
        description: "Innovative design solutions that maximize space utility while maintaining aesthetic appeal.",
        color: "blue"
    },
    {
        icon: Settings,
        title: "End-to-End Service",
        description: "From concept design to final installation, we handle everything so you can relax and enjoy the process.",
        color: "red"
    }
];

export function InteriorWhyChooseUs() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const fadeInUp: any = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const stagger: any = {
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="py-24 pb-48 bg-blue-50" ref={containerRef}>
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Side - Scrollable Content */}
                    <motion.div
                        className="w-full lg:w-1/2 space-y-24 pb-20"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={stagger}
                    >
                        {/* Section 1: Introduction */}
                        <div className="space-y-10">
                            {/* Heading */}
                            <motion.div variants={fadeInUp} className="space-y-6 text-center lg:text-left">
                                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                                    Why Choose <span className="text-[#ef4444]">eks</span> <span className="text-blue-600">construction</span> for Interior Design?
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Your home is more than just a space—it's a reflection of who you are. At eks Construction, we understand that great interior design goes beyond beautiful aesthetics. It's about creating spaces that enhance your daily life, boost your mood, and tell your unique story.
                                </p>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                variants={fadeInUp}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-100 hover:border-blue-300 transition-colors duration-300 flex flex-col items-center justify-center text-center group"
                                    >
                                        <div className="flex items-baseline text-4xl lg:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                            <NumberFlow
                                                value={stat.value}
                                                format={{ useGrouping: false }}
                                            />
                                            <span className="text-2xl lg:text-3xl ml-1">{stat.suffix}</span>
                                        </div>
                                        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Section 2: What Sets Us Apart (New Section) */}
                        <motion.div variants={fadeInUp} className="space-y-10">
                            <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
                                What Sets Us Apart
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {setsUsApart.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`bg-white rounded-xl p-8 shadow-lg border-t-4 hover:-translate-y-1 transition-transform duration-300 ${item.color === 'blue' ? 'border-blue-600' : 'border-[#ef4444]'
                                            }`}
                                    >
                                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-[#ef4444]'
                                            }`}>
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 text-center mb-4">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-center text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Section 3: Our Design Philosophy */}
                        <motion.div variants={fadeInUp} className="space-y-8">
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                Our Design Philosophy
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                At eks Construction, we believe that exceptional interior design is born from the perfect balance of beauty and functionality. We don't just follow trends—we create timeless spaces that evolve with you and your lifestyle.
                            </p>

                            <ul className="space-y-6 mt-8">
                                {philosophyPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-4 group">
                                        <ArrowRight className="w-5 h-5 text-blue-600 mt-1.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                        <div className="text-lg">
                                            <span className="font-bold text-blue-600">{point.title}:</span>
                                            <span className="text-gray-600 ml-2">{point.description}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </motion.div>

                    {/* Right Side - Sticky Video */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-fit">
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={fadeInUp}
                            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-square w-full"
                        >
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="/interior/video-placeholder.jpg"
                            >
                                <source src="/interior/design-philosophy-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
