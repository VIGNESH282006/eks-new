"use client";

import { useState } from "react";
import { Slide, SlideData } from "./carousel";
import { cn } from "@/lib/utils";

interface MarqueeCarouselProps {
    slides: SlideData[];
    speed?: number; // duration in seconds
    className?: string;
}

export const MarqueeCarousel = ({ slides, speed = 40, className }: MarqueeCarouselProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn("w-full overflow-hidden py-10", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex w-max"
                style={{
                    animation: `marquee ${speed}s linear infinite`,
                    animationPlayState: isHovered ? 'paused' : 'running',
                }}
            >
                {/* Loop 1 */}
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div key={`loop1-${index}`} className="flex-shrink-0 mx-4">
                            <div className="transform scale-90 transition-transform duration-300">
                                <Slide
                                    slide={slide}
                                    index={index}
                                    current={index} // Ensure card is "active"/visible
                                    handleSlideClick={() => { }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loop 2 (Duplicate for seamless effect) */}
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div key={`loop2-${index}`} className="flex-shrink-0 mx-4">
                            <div className="transform scale-90 transition-transform duration-300">
                                <Slide
                                    slide={slide}
                                    index={index}
                                    current={index}
                                    handleSlideClick={() => { }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};
