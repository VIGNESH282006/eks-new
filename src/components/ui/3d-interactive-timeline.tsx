import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils'; // Assuming this utility exists, typical in shadcn

export interface TimelineEvent {
    id: string;
    date: string; // We'll use this for the "Step 01" label
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
    category?: string;
    color?: string;
    link?: {
        url: string;
        text: string;
    };
}

interface Timeline3DProps {
    events: TimelineEvent[];
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    accentColor?: string;
    showImages?: boolean;
    className?: string;
}

const defaultColors = {
    background: 'bg-slate-900',
    primary: 'bg-indigo-600',
    secondary: 'bg-violet-500',
    text: 'text-white',
    accent: 'bg-emerald-500',
};

export const Timeline3D: React.FC<Timeline3DProps> = ({
    events,
    backgroundColor = defaultColors.background,
    primaryColor = defaultColors.primary,
    secondaryColor = defaultColors.secondary,
    textColor = defaultColors.text,
    accentColor = defaultColors.accent,
    showImages = true,
    className = '',
}) => {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            setLastScrollTop(st <= 0 ? 0 : st);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
                y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            className={cn(`w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden`, backgroundColor, textColor, className)}
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto relative">
                {/* Decorative elements - 3D floating spheres */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(`absolute rounded-full opacity-20`, i % 2 === 0 ? primaryColor : secondaryColor)}
                            animate={{
                                x: [
                                    `${20 + i * 10}%`,
                                    `${30 + i * 8}%`,
                                    `${15 + i * 12}%`,
                                    `${20 + i * 10}%`,
                                ],
                                y: [
                                    `${10 + i * 12}%`,
                                    `${20 + i * 10}%`,
                                    `${30 + i * 8}%`,
                                    `${10 + i * 12}%`,
                                ],
                                scale: [1, 1.2, 1.1, 1],
                            }}
                            transition={{
                                duration: 20 + i * 2,
                                ease: 'easeInOut',
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                            style={{
                                width: `${50 + i * 20}px`,
                                height: `${50 + i * 20}px`,
                                filter: 'blur(8px)',
                                zIndex: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Main timeline content */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight">
                        <span className="inline-block">
                            <span className="relative inline-block">
                                <span className={cn(`absolute -inset-1 rounded-lg blur opacity-30`, accentColor)}></span>
                                <span className="relative">Our Design Process</span>
                            </span>
                        </span>
                    </h2>

                    <div className="relative">
                        {/* Central line */}
                        <div
                            className={cn(`absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full`, primaryColor)}
                            style={{
                                // Fallback or specific shadow if needed, usually class is enough but inline for custom color match
                                boxShadow: `0 0 15px currentColor`,
                            }}
                        ></div>

                        {/* Timeline events */}
                        {events.map((event, index) => {
                            const [ref, inView] = useInView({
                                threshold: 0.3,
                                triggerOnce: false, // Keep animating as you scroll
                            });
                            const controls = useAnimation();

                            useEffect(() => {
                                if (inView) {
                                    controls.start('visible');
                                }
                            }, [controls, inView]);

                            const isEven = index % 2 === 0;
                            // Dynamic color based on even/odd or specific event color
                            // Matching the user's image: Blue (primary) for odd (1,3,5 -> index 0,2,4), Red (secondary) for even (2,4,6 -> index 1,3,5)
                            // Wait, indices: 0 (Step 1) -> Blue. 1 (Step 2) -> Red.
                            const eventColorClass = event.color || (index % 2 === 0 ? 'bg-blue-600' : 'bg-red-500');

                            return (
                                <motion.div
                                    key={event.id}
                                    ref={ref}
                                    className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'
                                        }`}
                                    initial="hidden"
                                    animate={controls}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            x: isEven ? 50 : -50,
                                            y: 20,
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: 'easeOut',
                                            },
                                        },
                                    }}
                                >
                                    {/* Timeline node */}
                                    <div
                                        className={`absolute left-1/2 md:left-auto ${isEven ? 'md:left-0' : 'md:right-0'
                                            } top-0 transform -translate-x-1/2 ${isEven ? 'md:translate-x-[-50%]' : 'md:translate-x-[50%]'
                                            } z-20`}
                                        style={{
                                            // Adjust node position relative to the center line
                                            [isEven ? 'left' : 'right']: 'auto',
                                            [isEven ? 'right' : 'left']: '-20px' // Adjust based on line width/position
                                        }}
                                    >
                                        <div className={cn("hidden md:block absolute top-0 w-10 h-10", isEven ? "-left-[1.3rem]" : "-right-[1.3rem]")}>
                                            <motion.div
                                                className={cn(`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer`, eventColorClass)}
                                                whileHover={{ scale: 1.2 }}
                                                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                                                animate={{
                                                    boxShadow:
                                                        activeEvent === event.id
                                                            ? [
                                                                `0 0 0 rgba(255,255,255,0.5)`,
                                                                `0 0 20px rgba(255,255,255,0.8)`,
                                                                `0 0 0 rgba(255,255,255,0.5)`,
                                                            ]
                                                            : `0 0 0 rgba(255,255,255,0)`,
                                                }}
                                                transition={{
                                                    repeat: activeEvent === event.id ? Infinity : 0,
                                                    duration: 1.5,
                                                }}
                                            >
                                                {event.icon || (
                                                    <span className="text-white font-bold text-sm">
                                                        {index + 1}
                                                    </span>
                                                )}
                                            </motion.div>
                                        </div>
                                        {/* Mobile Node */}
                                        <div className="block md:hidden">
                                            <motion.div
                                                className={cn(`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer`, eventColorClass)}
                                                whileHover={{ scale: 1.2 }}
                                                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                                            >
                                                {event.icon || (
                                                    <span className="text-white font-bold text-sm">
                                                        {index + 1}
                                                    </span>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <motion.div
                                        className={cn(
                                            `relative z-10 bg-white rounded-2xl overflow-hidden shadow-xl w-full md:w-[calc(100%-4rem)] border-t-4`,
                                            isEven ? 'md:ml-16' : 'md:mr-16',
                                            eventColorClass.replace('bg-', 'border-')
                                        )}
                                        whileHover={{
                                            y: -5,
                                            x: isEven ? 5 : -5,
                                            transition: { duration: 0.3 },
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transform: `perspective(1000px) rotateY(${mousePosition.x * (isEven ? -2 : 2)
                                                }deg) rotateX(${mousePosition.y * -2}deg)`,
                                        }}
                                        onMouseEnter={() => setActiveEvent(event.id)}
                                        onMouseLeave={() => setActiveEvent(null)}
                                    >
                                        {showImages && event.image && (
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                {/* Use a placeholder div if src is empty or handle img error */}
                                                {event.image.startsWith('http') || event.image.startsWith('/') ? (
                                                    <motion.img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                        initial={{ scale: 1.2 }}
                                                        animate={{
                                                            scale: activeEvent === event.id ? 1.05 : 1,
                                                            y: activeEvent === event.id ? -10 : 0
                                                        }}
                                                        transition={{ duration: 0.8 }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}


                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                                                {event.category && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className={cn(`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-black/30 backdrop-blur-sm`)}>
                                                            {event.category}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={cn(`text-lg font-bold`, eventColorClass.replace('bg-', 'text-'))}>
                                                    {event.date}
                                                </span>

                                                <motion.div
                                                    className={cn(`w-3 h-3 rounded-full`, eventColorClass)}
                                                    animate={{
                                                        scale: [1, 1.5, 1],
                                                        opacity: [0.7, 1, 0.7]
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 2,
                                                        repeatType: "reverse"
                                                    }}
                                                />
                                            </div>

                                            <h3 className="text-2xl font-bold mb-2 text-gray-900">{event.title}</h3>

                                            <motion.div
                                                // Always visible for better UX in this version, or standard collapse
                                                initial={{ height: "auto", opacity: 1 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-gray-600 mt-3 leading-relaxed">
                                                    {event.description}
                                                </p>

                                                {event.link && (
                                                    <a
                                                        href={event.link.url}
                                                        className={cn(`inline-block mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1 text-white`, eventColorClass)}
                                                    >
                                                        {event.link.text}
                                                    </a>
                                                )}
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className={cn(`absolute bottom-0 left-0 h-1`, eventColorClass)}
                                            initial={{ width: "0%" }}
                                            animate={{ width: activeEvent === event.id ? "100%" : "0%" }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
