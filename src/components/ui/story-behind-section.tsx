"use client"

import CardSwap, { Card } from "@/components/ui/card-swap"
import { motion } from "framer-motion"
import {
    ClipboardCheck,
    Wallet,
    Ban,
    Smile,
    Palette,
    Clock,
    TrendingUp,
    Users,
    Building,
} from "lucide-react"

const BRANDS = [
    "/brands/ARS.jpg",
    "/brands/ashirvad-pipes.jpg",
    "/brands/asian-paints.jpg",
    "/brands/coromandel.jpg",
    "/brands/finolex-pipes.jpg",
    "/brands/gbr-tmt.jpg",
    "/brands/jaquar.jpg",
    "/brands/johnson-tiles.jpg",
    "/brands/jsw-steel.jpg",
    "/brands/kag-tiles.jpg",
    "/brands/kajaria-tiles.jpg",
    "/brands/kamachi-tmt-bars.jpg",
    "/brands/orbit-cables.jpg",
    "/brands/orientbell-tiles.jpg",
    "/brands/ramco-cement.jpg",
    "/brands/tirumala-steel.jpg",
    "/brands/ultratech.jpg",
    "/brands/zuari-cement-logo.jpg"
];

const SUCCESS_FACTORS = [
    {
        id: "factor-1",
        index: "1",
        title: "120+ Standard Quality Checks",
        description: "We don't compromise on quality. Our rigorous 120+ point inspection process ensures every material and construction stage meets the highest industry standards.",
        icon: <ClipboardCheck className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img1.jpg"
    },
    {
        id: "factor-2",
        index: "2",
        title: "Construction on Your Budget",
        description: "Your dream home shouldn't break the bank. We offer transparent pricing and tailored solutions to ensure your project stays strictly within your financial comfort zone.",
        icon: <Wallet className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img2.jpg"
    },
    {
        id: "factor-3",
        index: "3",
        title: "No Hidden Charges",
        description: "Honesty is our policy. Our quotes are comprehensive, with absolutely no surprise costs or hidden fees down the line. What we agree on is what you pay.",
        icon: <Ban className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img3.jpg"
    },
    {
        id: "factor-4",
        index: "4",
        title: "Stress Free Construction",
        description: "Building a home should be exciting, not exhausting. We handle all the permits, procurement, and management so you can enjoy the journey.",
        icon: <Smile className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img9.jpg" // Using 9 based on assumption/user pref, or sequentially
    },
    {
        id: "factor-5",
        index: "5",
        title: "Creative Design",
        description: "Our diverse team of architects and designers bring fresh, innovative ideas to the table, ensuring your space is unique, functional, and aesthetically stunning.",
        icon: <Palette className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img5.jpg"
    },
    {
        id: "factor-6",
        index: "6",
        title: "On time Delivery",
        description: "We respect your time. Our efficient project management ensures that we stick to the schedule and hand over your keys exactly when promised.",
        icon: <Clock className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img6.jpg"
    },
    {
        id: "factor-7",
        index: "7",
        title: "Daily Progress Update",
        description: "Stay in the loop, wherever you are. We provide detailed daily updates and photos so you can track the progress of your dream project in real-time.",
        icon: <TrendingUp className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img7.jpg"
    },
    {
        id: "factor-8",
        index: "8",
        title: "No Subcontracts",
        description: "We take full responsibility. Our in-house team of skilled professionals handles execution, ensuring consistent quality control and accountability.",
        icon: <Users className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img8.jpg"
    },
    {
        id: "factor-9",
        index: "9",
        title: "End to End Construction",
        description: "From the first sketch to the final coat of paint, we manage everything. A complete turnkey solution for a hassle-free experience.",
        icon: <Building className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img4.jpg" // Swapped or matched
    }
]

export default function StoryBehindSection() {
    return (
        <section className="w-full bg-[#f8fafc] py-24 px-4 overflow-hidden">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-[45%_55%] gap-4 lg:gap-0 items-center">

                    {/* Left Side - Sticky Content */}
                    <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col justify-center mb-12 lg:mb-0 pl-4 lg:pr-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#082E6D] leading-tight">
                                Reason Behind <br />
                                <span className="text-[#C11336]">Our Success</span>
                            </h2>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
                                Excellence in every aspect of construction. We believe in transparency, quality, and delivering exactly what we promise.
                            </p>

                            <div className="mt-12">
                                <h3 className="text-[#C11336] font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-sm">
                                    <Building className="w-4 h-4" />
                                    Our Retail Partners
                                </h3>

                                <div className="relative w-full max-w-md overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f8fafc] to-transparent z-10"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f8fafc] to-transparent z-10"></div>

                                    <motion.div
                                        className="flex gap-4 w-max"
                                        animate={{ x: ["0%", "-50%"] }}
                                        transition={{
                                            repeat: Infinity,
                                            ease: "linear",
                                            duration: 20
                                        }}
                                    >
                                        {[...BRANDS, ...BRANDS].map((brand, i) => (
                                            <div key={i} className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 p-2 transition-all duration-300 hover:scale-110">
                                                <img
                                                    src={brand}
                                                    alt="Brand Logo"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative h-[600px] w-full mt-12 lg:mt-0 lg:-ml-8">
                        <CardSwap delay={3000} cardDistance={25} pauseOnHover={true}>
                            {SUCCESS_FACTORS.map((factor) => (
                                <Card
                                    key={factor.id}
                                    className="w-full aspect-square rounded-3xl border-4 border-white/50 shadow-2xl overflow-hidden bg-white max-w-[450px] mx-auto"
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Card Header with Image */}
                                        <div className="relative h-[60%] overflow-hidden bg-white">
                                            <img
                                                src={factor.image}
                                                alt={factor.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                                <div
                                                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 shadow-lg backdrop-blur-sm"
                                                    style={{ backgroundColor: factor.bg }}
                                                >
                                                    {factor.icon}
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                                    {factor.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6 sm:p-8 flex-1 flex flex-col bg-white">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-5xl font-black text-gray-100 absolute right-6 top-64 -z-0">
                                                    {factor.index}
                                                </span>
                                                <span
                                                    className="inline-block w-8 h-8 rounded-full text-sm font-bold text-white shadow-sm relative z-10 flex items-center justify-center"
                                                    style={{ backgroundColor: factor.bg }}
                                                >
                                                    {factor.index}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed text-base relative z-10">
                                                {factor.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>
        </section>
    )
}
