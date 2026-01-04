"use client"

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
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { useCarousel } from "../../hooks/use-carousel"

const SUCCESS_FACTORS = [
    {
        id: "factor-1",
        index: "1",
        title: "120+ Standard Quality Checks",
        description: "We verify 120+ quality checkpoints at every stage to ensure highest industry standards.",
        icon: <ClipboardCheck className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img1.jpg"
    },
    {
        id: "factor-2",
        index: "2",
        title: "Construction on Your Budget",
        description: "Transparent pricing and tailored solutions to keep your project strictly within budget.",
        icon: <Wallet className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img2.jpg"
    },
    {
        id: "factor-3",
        index: "3",
        title: "No Hidden Charges",
        description: "Comprehensive quotes with zero surprise costs. What we agree on is exactly what you pay.",
        icon: <Ban className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img3.jpg"
    },
    {
        id: "factor-4",
        index: "4",
        title: "Stress Free Construction",
        description: "We handle all permits, procurement, and management so you can enjoy the journey.",
        icon: <Smile className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img9.jpg"
    },
    {
        id: "factor-5",
        index: "5",
        title: "Creative Design",
        description: "Innovative architects designing unique, functional, and aesthetically stunning spaces.",
        icon: <Palette className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img5.jpg"
    },
    {
        id: "factor-6",
        index: "6",
        title: "On time Delivery",
        description: "Efficient management ensures we stick to schedule and hand over keys on time.",
        icon: <Clock className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img6.jpg"
    },
    {
        id: "factor-7",
        index: "7",
        title: "Daily Progress Update",
        description: "Detailed daily updates and photos to track your dream project's progress in real-time.",
        icon: <TrendingUp className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img7.jpg"
    },
    {
        id: "factor-8",
        index: "8",
        title: "No Subcontracts",
        description: "In-house team handles execution, ensuring consistent quality control and accountability.",
        icon: <Users className="w-8 h-8 text-white" />,
        bg: "#C11336", // Red
        image: "/success/success-card-img8.jpg"
    },
    {
        id: "factor-9",
        index: "9",
        title: "End to End Construction",
        description: "Complete turnkey solution managing everything from first sketch to final coat of paint.",
        icon: <Building className="w-8 h-8 text-white" />,
        bg: "#082E6D", // Blue
        image: "/success/success-card-img4.jpg"
    }
]

const SuccessCard = ({ factor }: { factor: typeof SUCCESS_FACTORS[0] }) => (
    <div className="h-full w-full p-4">
        <div className="h-full w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2 h-52 md:h-auto relative">
                <img
                    src={factor.image}
                    alt={factor.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>
            {/* Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: factor.bg }}>
                        {factor.icon}
                    </div>
                    <span className="text-4xl font-bold text-gray-100 absolute right-4 top-4 md:right-8 md:top-8 pointer-events-none select-none opacity-20">
                        {factor.index}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-[#082E6D] mb-3">{factor.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center">{factor.description}</p>
            </div>
        </div>
    </div>
);

export default function StoryBehindSection() {
    // 3000ms = 3 seconds interval
    const [active, setActive, handlers, style, next, prev] = useCarousel(SUCCESS_FACTORS.length, 3000);

    return (
        <section className="w-full bg-[#f8fafc] py-16 md:py-24 px-4 overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-[#082E6D] leading-tight">
                        Reason Behind <br />
                        <span className="text-[#C11336]">Our Success</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto text-center">
                        Excellence in every aspect of construction. We believe in transparency, quality, and delivering exactly what we promise.
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center gap-4">

                    {/* Previous Button - Left Side */}
                    <button
                        onClick={() => prev()}
                        className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-100 text-[#082E6D] hover:bg-[#082E6D] hover:text-white transition-all z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <div className="relative w-full overflow-hidden rounded-2xl max-w-5xl">
                        <div
                            className="flex h-[500px] w-full relative"
                            {...handlers}
                            style={style as any}
                        >
                            {/* Duplicate Last Item */}
                            <div
                                className="h-full flex-shrink-0 flex-grow-0"
                                style={{ width: `${100 / (SUCCESS_FACTORS.length + 2)}%` }}
                            >
                                <SuccessCard factor={SUCCESS_FACTORS[SUCCESS_FACTORS.length - 1]} />
                            </div>

                            {/* Items */}
                            {SUCCESS_FACTORS.map((factor, index) => (
                                <div
                                    key={index}
                                    className="h-full flex-shrink-0 flex-grow-0"
                                    style={{ width: `${100 / (SUCCESS_FACTORS.length + 2)}%` }}
                                >
                                    <SuccessCard factor={factor} />
                                </div>
                            ))}

                            {/* Duplicate First Item */}
                            <div
                                className="h-full flex-shrink-0 flex-grow-0"
                                style={{ width: `${100 / (SUCCESS_FACTORS.length + 2)}%` }}
                            >
                                <SuccessCard factor={SUCCESS_FACTORS[0]} />
                            </div>
                        </div>
                    </div>

                    {/* Next Button - Right Side */}
                    <button
                        onClick={() => next()}
                        className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-100 text-[#082E6D] hover:bg-[#082E6D] hover:text-white transition-all z-10"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                </div>

                {/* Mobile Navigation & Indicators */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    {/* Mobile Arrows (Visible only on small screens) */}
                    <div className="flex justify-between w-full max-w-xs md:hidden">
                        <button
                            onClick={() => prev()}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 text-[#082E6D] hover:bg-gray-50 transition-all"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => next()}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 text-[#082E6D] hover:bg-gray-50 transition-all"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        {SUCCESS_FACTORS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActive(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-[#C11336]" : "w-3 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
