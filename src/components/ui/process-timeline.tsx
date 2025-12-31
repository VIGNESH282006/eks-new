"use client"

import * as React from "react"


import { VariantProps, cva } from "class-variance-authority"
import {
    HTMLMotionProps,
    MotionValue,
    motion,
    useScroll,
    useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const processCardVariants = cva("flex border backdrop-blur-lg rounded-lg", {
    variants: {
        variant: {
            indigo:
                "flex border border-white/20 text-slate-50 backdrop-blur-xl bg-[#284370]/60 shadow-2xl hover:bg-[#284370]/80 transition-colors duration-300",
            light: "shadow",
        },
        size: {
            sm: "min-w-[25%] max-w-[25%]",
            md: "min-w-[50%] max-w-[50%]",
            lg: "min-w-[75%] max-w-[75%]",
            xl: "min-w-full max-w-full",
        },
    },
    defaultVariants: {
        variant: "indigo",
        size: "md",
    },
})
interface ContainerScrollContextValue {
    scrollYProgress: MotionValue<number>
}
interface ProcessCardProps
    extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
    itemsLength: number
    index: number
}

const ContainerScrollContext = React.createContext<
    ContainerScrollContextValue | undefined
>(undefined)
export function useContainerScrollContext() {
    const context = React.useContext(ContainerScrollContext)
    if (!context) {
        throw new Error(
            "useContainerScrollContext must be used within a ContainerScroll Component"
        )
    }
    return context
}
export const ContainerScroll = ({
    children,
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
    })
    return (
        <ContainerScrollContext.Provider value={{ scrollYProgress }}>
            <div
                ref={scrollRef}
                className={cn("relative min-h-[120vh]", className)}
                {...props}
            >
                {children}
            </div>
        </ContainerScrollContext.Provider>
    )
}
export const ContainerSticky = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
        {...props}
    />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-8 p-6", className)}
        {...props}
    />
))
ProcessCardBody.displayName = "ProcessCardBody"

export const ProcessCard: React.FC<ProcessCardProps> = ({
    className,
    style,
    variant,
    size,
    itemsLength,
    index,
    ...props
}) => {
    const { scrollYProgress } = useContainerScrollContext()
    const start = index / itemsLength
    const end = start + 1 / itemsLength
    const { innerWidth } = window

    const ref = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState(0)

    React.useEffect(() => {
        if (!ref.current) return

        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width)
        })

        observer.observe(ref.current)

        // Initial measure
        setWidth(ref.current.offsetWidth)

        return () => {
            observer.disconnect()
        }
    }, [])

    const x = useTransform(
        scrollYProgress,
        [start, end],
        [innerWidth, -(width * index) + 64 * index]
    )

    return (
        <motion.div
            ref={ref}
            style={{
                x: index > 0 ? x : 0,
                ...style,
            }}
            className={cn(processCardVariants({ variant, size }), className)}
            {...props}
        />
    )
}
ProcessCard.displayName = "ProcessCard"
