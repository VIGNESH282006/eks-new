"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"

// Define interface for props
export interface ImageStackItem {
    id: string | number;
    src: string;
    alt: string;
    title: string;
    description: string;
}

interface VerticalImageStackProps {
    items: ImageStackItem[];
    className?: string;
}

export function VerticalImageStack({ items, className = "" }: VerticalImageStackProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const lastNavigationTime = useRef(0)
    const navigationCooldown = 400 // ms between navigations

    const navigate = useCallback((newDirection: number) => {
        const now = Date.now()
        if (now - lastNavigationTime.current < navigationCooldown) return
        lastNavigationTime.current = now

        setCurrentIndex((prev) => {
            if (newDirection > 0) {
                return prev === items.length - 1 ? 0 : prev + 1
            }
            return prev === 0 ? items.length - 1 : prev - 1
        })
    }, [items.length])

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50
        if (info.offset.y < -threshold) {
            navigate(1) // Dragged up -> Next
        } else if (info.offset.y > threshold) {
            navigate(-1) // Dragged down -> Prev
        }
    }

    // Attach wheel listener to the container instead of window to avoid hijacking whole page
    const containerRef = useRef<HTMLDivElement>(null)

    const handleWheel = useCallback(
        (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 30) {
                if (e.deltaY > 0) {
                    navigate(1)
                } else {
                    navigate(-1)
                }
            }
        },
        [navigate],
    )

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: true })
            return () => container.removeEventListener("wheel", handleWheel)
        }
    }, [handleWheel])

    const getCardStyle = (index: number) => {
        const total = items.length
        let diff = index - currentIndex
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total

        if (diff === 0) {
            return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
        } else if (diff === -1) {
            return { y: -50, scale: 0.95, opacity: 0.7, zIndex: 4, rotateX: 5 }
        } else if (diff === -2) {
            return { y: -100, scale: 0.9, opacity: 0.4, zIndex: 3, rotateX: 10 }
        } else if (diff === 1) {
            return { y: 180, scale: 0.95, opacity: 0.7, zIndex: 4, rotateX: -5 } // Push next cards further down
        } else if (diff === 2) {
            return { y: 340, scale: 0.9, opacity: 0.4, zIndex: 3, rotateX: -10 }
        } else {
            return { y: diff > 0 ? 500 : -500, scale: 0.8, opacity: 0, zIndex: 0, rotateX: 0 }
        }
    }

    const isVisible = (index: number) => {
        const total = items.length
        let diff = index - currentIndex
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total
        return Math.abs(diff) <= 2
    }

    return (
        <div ref={containerRef} className={`relative flex h-[600px] w-full items-center justify-center overflow-hidden ${className}`}>

            {/* Card Stack */}
            <div className="relative flex h-[550px] w-full max-w-[340px] items-center justify-center perspective-[1000px]">
                {items.map((item, index) => {
                    if (!isVisible(index)) return null
                    const style = getCardStyle(index)
                    const isCurrent = index === currentIndex

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute w-[300px] h-[480px] cursor-grab active:cursor-grabbing"
                            animate={{
                                y: style.y,
                                scale: style.scale,
                                opacity: style.opacity,
                                rotateX: style.rotateX,
                                zIndex: style.zIndex,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            drag={isCurrent ? "y" : false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragEnd={handleDragEnd}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div
                                className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 flex flex-col"
                            >
                                {/* Image Section (Top 65%) */}
                                <div className="relative h-[65%] w-full bg-gray-50 p-2">
                                    <img
                                        src={item.src || "/placeholder.svg"}
                                        alt={item.alt}
                                        className="object-contain w-full h-full select-none"
                                        draggable={false}
                                    />
                                </div>

                                {/* Content Section (Bottom 35%) */}
                                <div className="h-[35%] w-full p-6 bg-white flex flex-col justify-center text-center">
                                    <h3 className="text-xl font-bold text-[#082E6D] leading-tight mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    {/* <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p> */}
                                    <div className="w-12 h-1 bg-[#C11336] rounded-full mx-auto mt-2"></div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Instruction hint */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <div className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="text-[10px] font-bold tracking-widest uppercase">Swipe Vertical</span>
                </div>
            </motion.div>

        </div>
    )
}
