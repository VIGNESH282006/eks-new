"use client";

import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import NumberFlow from "@number-flow/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface PricingFeature {
    name: string;
    details: string[];
}

export interface PricingPlan {
    name: string;
    price: string;
    yearlyPrice: string;
    period: string;
    features: PricingFeature[];
    description: string;
    buttonText: string;
    href: string;
    isPopular: boolean;
}

interface PricingProps {
    plans: PricingPlan[];
    title?: string;
    description?: string;
}

export function Pricing({
    plans,
    title = "Simple, Transparent Pricing",
    description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="container py-20 px-6 md:px-4">
            <div className="text-center space-y-4 mb-24">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {title}
                </h2>
                <p className="text-muted-foreground text-lg whitespace-pre-line text-justify [text-justify:inter-word] md:text-center max-w-3xl mx-auto">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-8 max-w-5xl mx-auto px-2 md:px-0">
                {plans.map((plan, index) => (
                    <div key={index} className="relative">
                        <motion.div
                            initial={{ y: 50, opacity: 1 }}
                            whileInView={
                                isDesktop
                                    ? {
                                        y: plan.isPopular ? -20 : 0,
                                        opacity: 1,
                                        scale: plan.isPopular ? 1.05 : 1,
                                    }
                                    : {}
                            }
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.6,
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                delay: 0.4,
                                opacity: { duration: 0.5 },
                            }}
                            className={cn(
                                `relative w-full h-full transition-all duration-500`,
                                plan.isPopular ? "mt-2 md:mt-0" : "mt-5",
                                index === 0 || index === 2
                                    ? "z-0"
                                    : "z-10"
                            )}
                        >
                            <div
                                className={cn(
                                    "rounded-xl border-[1px] p-5 md:p-4 bg-background text-center flex flex-col h-full relative z-10 mx-2 md:mx-0",
                                    plan.isPopular ? "border-[#ef4444] border-2 shadow-xl" : "border-blue-600"
                                )}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 transform -translate-x-1/2 left-1/2 -mt-4 bg-gradient-to-r from-[#ef4444] to-[#fb7185] py-1.5 px-6 rounded-full flex items-center shadow-lg z-30">
                                        <Star className="text-white h-3.5 w-3.5 fill-current" />
                                        <span className="text-white ml-2 font-sans font-bold text-sm tracking-wide uppercase">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className={cn("flex-1 flex flex-col pt-4", plan.isPopular && "pt-8")}>
                                    <p className={cn("text-base font-bold uppercase tracking-wider text-center", plan.isPopular ? "text-[#ef4444]" : "text-foreground")}>
                                        {plan.name}
                                    </p>
                                    <div className="mt-4 flex items-center justify-center gap-x-2">
                                        <span className={cn("text-4xl font-bold tracking-tight", plan.isPopular ? "text-[#ef4444]" : "text-foreground")}>
                                            <NumberFlow
                                                value={Number(plan.price)}
                                                format={{
                                                    style: "currency",
                                                    currency: "INR",
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }}
                                                transformTiming={{
                                                    duration: 500,
                                                    easing: "ease-out",
                                                }}
                                                willChange
                                                className="font-variant-numeric: tabular-nums"
                                            />
                                        </span>
                                        {plan.period !== "Next 3 months" && (
                                            <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                                                / {plan.period}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs leading-5 text-muted-foreground mt-2 text-center">
                                        billed monthly
                                    </p>

                                    <div className="mt-6 text-left">
                                        <Accordion type="multiple" className="w-full">
                                            {plan.features.map((feature, idx) => (
                                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b-0">
                                                    <AccordionTrigger
                                                        className={cn(
                                                            "hover:no-underline py-3 text-base md:text-sm font-medium",
                                                            plan.isPopular ? "text-foreground hover:text-[#ef4444]" : "text-foreground hover:text-blue-600"
                                                        )}
                                                    >
                                                        {feature.name}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <ul className="space-y-2 pb-2 pl-1">
                                                            {feature.details.map((detail, dIdx) => (
                                                                <li key={dIdx} className="flex items-start gap-2 text-sm md:text-xs text-muted-foreground">
                                                                    <Check className={cn("h-3.5 w-3.5 mt-0.5 flex-shrink-0", plan.isPopular ? "text-[#ef4444]" : "text-blue-600")} />
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>

                                    <hr className="w-full my-6 border-dashed" />

                                    <Link
                                        to={plan.href}
                                        className={cn(
                                            buttonVariants({
                                                variant: plan.isPopular ? "default" : "outline",
                                            }),
                                            "group relative w-full gap-2 overflow-hidden text-lg font-bold tracking-tight mt-auto py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg",
                                            plan.isPopular
                                                ? "bg-gradient-to-r from-[#ef4444] to-[#f87171] text-white border-none hover:opacity-90 hover:scale-[1.02]"
                                                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                                        )}
                                    >
                                        {plan.buttonText}
                                    </Link>
                                    <p className="mt-6 text-xs leading-5 text-muted-foreground px-4 text-center">
                                        {plan.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))
                }
            </div >
        </div >
    );
}

