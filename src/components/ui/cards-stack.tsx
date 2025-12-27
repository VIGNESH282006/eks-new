"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
    index: number
    incrementY?: number
    incrementZ?: number
}

const ContainerScroll = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("relative w-full", className)}
            style={{ perspective: "1000px", ...props.style }}
            {...props}
        >
            {children}
        </div>
    )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
    (
        {
            index,
            incrementY = 40, // Adjusted default for better overlap
            incrementZ = 10,
            children,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const y = index * incrementY
        const z = index * incrementZ

        return (
            <motion.div
                ref={ref}
                layout="position"
                style={{
                    top: y,
                    zIndex: z, // Changed from just 'z' to 'zIndex' for clarity, though framer usually handles z
                    ...style,
                }}
                className={cn("sticky top-0", className)} // Added top-0 to ensure sticky behavior works
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
