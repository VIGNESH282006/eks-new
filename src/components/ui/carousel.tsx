"use client";
import { IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Role {
    title: string;
    locations: string[];
    description: string;
}

export interface SlideData {
    title: string;
    button: string;
    src: string;
    roles?: Role[];
}

export interface SlideProps {
    slide: SlideData;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}

export const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
    const slideRef = useRef<HTMLLIElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        // Reset flip when slide becomes inactive
        if (current !== index) {
            setIsFlipped(false);
        }
    }, [current, index]);

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event: React.MouseEvent) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.style.opacity = "1";
    };

    const { src, button, title, roles } = slide;

    return (
        <div className="[perspective:1200px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 "
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.98) rotateX(8deg)"
                            : "scale(1) rotateX(0deg)", // Tilt effect
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}
            >
                {/* Flipper Container */}
                <div
                    className="relative w-full h-full transition-all duration-700 pointer-events-none"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 backface-hidden pointer-events-auto rounded-[1%] overflow-hidden bg-[#1D1F2F]"
                        style={{ backfaceVisibility: 'hidden' }}>
                        <div
                            className="absolute inset-0 transition-all duration-150 ease-out"
                            style={{
                                transform:
                                    current === index
                                        ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                                        : "none",
                            }}
                        >
                            <img
                                className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                                style={{
                                    opacity: current === index ? 1 : 0.5,
                                }}
                                alt={title}
                                src={src}
                                onLoad={imageLoaded}
                                loading="eager"
                                decoding="sync"
                            />
                            {current === index && (
                                <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
                            )}
                        </div>

                        <article
                            className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out h-full flex flex-col justify-end pb-20 ${current === index ? "opacity-100 visible" : "opacity-0 invisible"
                                }`}
                        >
                            <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative mb-4">
                                {title}
                            </h2>
                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-3 text-sm text-black bg-white rounded-full font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFlipped(true);
                                    }}
                                >
                                    {button}
                                </button>
                            </div>
                        </article>
                    </div>

                    {/* BACK FACE */}
                    <div
                        className="absolute inset-0 backface-hidden pointer-events-auto bg-white rounded-[1%] overflow-hidden border-t-4 border-primary shadow-xl"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: "rotateY(180deg)"
                        }}
                    >
                        <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <IconX size={24} />
                            </button>
                        </div>

                        <div className="h-full overflow-y-auto p-8 text-left scrollbar-hide">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">{title}</h3>

                            <div className="space-y-6">
                                {roles?.map((role, idx) => (
                                    <div key={idx} className="group cursor-default">
                                        <h4 className="text-lg font-bold text-primary mb-2 flex items-center flex-wrap gap-2">
                                            {role.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {role.locations.map((loc, lIdx) => (
                                                <Badge key={lIdx} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    {loc}
                                                </Badge>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

interface CarouselControlProps {
    type: string;
    title: string;
    handleClick: () => void;
}

const CarouselControl = ({
    type,
    title,
    handleClick,
}: CarouselControlProps) => {
    return (
        <button
            className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""
                }`}
            title={title}
            onClick={handleClick}
        >
            <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
    );
};

interface CarouselProps {
    slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index: number) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    const id = useId();

    return (
        <div
            className="relative w-[70vmin] h-[70vmin] mx-auto"
            aria-labelledby={`carousel-heading-${id}`}
        >
            <ul
                className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        slide={slide}
                        index={index}
                        current={current}
                        handleSlideClick={handleSlideClick}
                    />
                ))}
            </ul>

            <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <CarouselControl
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    );
}
