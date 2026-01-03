"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
    Pen,
    PaintBucket,
    Home,
    Ruler,
    PenTool,
    Building2,
    Award,
    Users,
    Calendar,
    CheckCircle,
    Sparkles,
    Star,
    ArrowRight,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

export default function AboutUsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

    // Parallax effect for decorative elements
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    // Colors: Primary Blue: #082E6D, Primary Red: #C11336

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" as any },
        },
    }

    const services = [
        {
            icon: <Pen className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Interior",
            description:
                "Transform your living spaces with our expert interior design services. We blend functionality and aesthetics to create spaces that reflect your unique style and personality.",
            position: "left",
        },
        {
            icon: <Home className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Exterior",
            description:
                "Make a lasting impression with stunning exterior designs that enhance curb appeal and create harmonious connections between architecture and landscape.",
            position: "left",
        },
        {
            icon: <PenTool className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Design",
            description:
                "Our innovative design process combines creativity with practicality, resulting in spaces that are both beautiful and functional for everyday living.",
            position: "left",
        },
        {
            icon: <PaintBucket className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Decoration",
            description:
                "Elevate your space with our curated decoration services. From color schemes to textiles and accessories, we perfect every detail to bring your vision to life.",
            position: "right",
        },
        {
            icon: <Ruler className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Planning",
            description:
                "Our meticulous planning process ensures every project runs smoothly from concept to completion, with careful attention to timelines, budgets, and requirements.",
            position: "right",
        },
        {
            icon: <Building2 className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#082E6D]/40" />,
            title: "Execution",
            description:
                "Watch your dream space come to life through our flawless execution. Our skilled team handles every aspect of implementation with precision and care.",
            position: "right",
        },
    ]

    // Updated Stats based on user request and image
    const stats = [
        { icon: <Calendar />, value: 10, label: "Years Experience", suffix: "+" },
        { icon: <Users />, value: 150, label: "Happy Clients", suffix: "+" },
        { icon: <CheckCircle />, value: 150, label: "Projects Completed", suffix: "+" },
        { icon: <Award />, value: 10, label: "Awards & Recognition", suffix: "+" },
    ]

    return (
        <section
            id="about-section"
            ref={sectionRef}
            className="w-full py-24 px-4 bg-white text-[#202e44] overflow-hidden relative" // White background for clean look
        >
            {/* Decorative background elements - Modified colors to Blue/Red theme */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#C11336]/5 blur-3xl"
                style={{ y: y1, rotate: rotate1 }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#082E6D]/5 blur-3xl"
                style={{ y: y2, rotate: rotate2 }}
            />

            {/* Small floating circles */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#C11336]/30"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#082E6D]/30"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>


                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#082E6D]">About Us</h2>
                    <motion.div
                        className="w-24 h-1 bg-[#C11336]"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                </motion.div>

                <motion.p className="text-center max-w-2xl mx-auto mb-16 text-gray-600" variants={itemVariants}>
                    We are a passionate team of designers and architects dedicated to creating beautiful, functional spaces that
                    inspire and elevate everyday living. With attention to detail and commitment to excellence, we transform
                    visions into reality.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Left Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "left")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`left-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.2}
                                    direction="left"
                                />
                            ))}
                    </div>

                    {/* Center Image */}
                    <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
                        <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
                            <motion.div
                                className="rounded-md overflow-hidden shadow-2xl"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src="/about-us-genie.png"
                                    alt="EKS Genie Mascot"
                                    className="w-full h-auto object-contain"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-[#082E6D]/60 to-transparent flex items-end justify-center p-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    <motion.button
                                        className="bg-white text-[#082E6D] px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.location.href = '/projects'}
                                    >
                                        Our Portfolio <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            </motion.div>

                            {/* Border Outline */}
                            <motion.div
                                className="absolute inset-0 border-4 border-[#082E6D]/20 rounded-md -m-4 z-[-1]"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            ></motion.div>

                            {/* Floating accent elements */}
                            <motion.div
                                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#C11336]/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.9 }}
                                style={{ y: y1 }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#082E6D]/15"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.1 }}
                                style={{ y: y2 }}
                            ></motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-16">
                        {services
                            .filter((service) => service.position === "right")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`right-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.2}
                                    direction="right"
                                />
                            ))}
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div className="flex flex-col items-center mt-24 mb-12" variants={itemVariants}>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#082E6D]">Our Expertise</h3>
                </motion.div>

                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-20 bg-[#082E6D] text-white p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

                    <div className="flex-1 relative z-10">
                        <h3 className="text-3xl font-bold mb-3">Ready to transform your space?</h3>
                        <p className="text-white/80 text-lg">Let's create something beautiful together with EKS Construction.</p>
                    </div>
                    <motion.button
                        className="bg-[#C11336] hover:bg-[#a00f2d] text-white px-8 py-4 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/contact'}
                    >
                        Get Started <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    )
}

interface ServiceItemProps {
    icon: React.ReactNode
    secondaryIcon?: React.ReactNode
    title: string
    description: string
    variants: any // using any to bypass strict framer-motion variants typing issues
    delay: number
    direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
    return (
        <motion.div
            className="flex flex-col group"
            variants={variants}
            transition={{ delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
                <motion.div
                    className="text-[#C11336] bg-[#C11336]/10 p-3 rounded-xl transition-colors duration-300 group-hover:bg-[#C11336]/20 relative"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                >
                    {icon}
                    {secondaryIcon}
                </motion.div>
                <h3 className="text-xl font-bold text-[#082E6D] group-hover:text-[#C11336] transition-colors duration-300">
                    {title}
                </h3>
            </motion.div>
            <motion.p
                className="text-sm text-gray-600 leading-relaxed pl-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
                {description}
            </motion.p>
            <motion.div
                className="mt-3 pl-12 flex items-center text-[#C11336] text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
            >
                <span className="flex items-center gap-1 cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                </span>
            </motion.div>
        </motion.div>
    )
}

interface StatCounterProps {
    icon: React.ReactNode
    value: number
    label: string
    suffix: string
    delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: false })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 10,
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value)
            setHasAnimated(true)
        } else if (!isInView && hasAnimated) {
            springValue.set(0)
            setHasAnimated(false)
        }
    }, [isInView, value, springValue, hasAnimated])

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    return (
        <motion.div
            className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center group shadow-lg hover:shadow-2xl hover:shadow-[#082E6D]/10 transition-all duration-300 border border-gray-100 aspect-square"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay },
                },
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <motion.div
                className="w-10 h-10 rounded-full bg-[#082E6D]/5 flex items-center justify-center mb-2 text-[#C11336] group-hover:bg-[#C11336]/10 transition-colors duration-300"
                whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
            >
                <div className="scale-100">{icon}</div>
            </motion.div>
            <motion.div ref={countRef} className="text-2xl font-bold text-[#082E6D] flex items-center mb-1">
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide leading-tight">{label}</p>
        </motion.div>
    )
}
