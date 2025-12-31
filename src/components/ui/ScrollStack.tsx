import React, { useLayoutEffect, useRef, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full h-auto min-h-[20rem] my-8 p-8 md:p-12 rounded-[30px] md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
        }}
    >
        {children}
    </div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const cardPositionsRef = useRef<number[]>([]); // Cache card positions
    const lastTransformsRef = useRef(new Map<number, any>());
    const isUpdatingRef = useRef(false);

    // Measure Layout trigger
    const [isReady, setIsReady] = useState(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller ? scroller.scrollTop : 0,
                containerHeight: scroller ? scroller.clientHeight : 0,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    // Measure all cards at once
    const measureCards = useCallback(() => {
        if (!cardsRef.current.length) return;

        const positions: number[] = [];
        cardsRef.current.forEach((card) => {
            // We need the original offsetTop relative to the document (if window scroll) or container
            // Since we use window scroll, we want absolute position.
            // IMPORTANT: We must temporarily remove transforms to measure correctly if they depend on flow?
            // Actually, offsetTop usually ignores transform. getBoundingClientRect includes it.
            // We will use offsetTop chain to be safe if possible, or just assume initially partial scroll is 0.
            // But simpler: getBoundingClientRect().top + window.scrollY IS the position.
            // If transforms are applied, it shifts. 
            // Ideally we measure BEFORE any transforms are applied (initial render).

            let top = 0;
            if (useWindowScroll) {
                const rect = card.getBoundingClientRect();
                top = rect.top + window.scrollY;
            } else {
                top = card.offsetTop;
            }
            positions.push(top);
        });
        cardPositionsRef.current = positions;
    }, [useWindowScroll]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current || !cardPositionsRef.current.length) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = useWindowScroll
            ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
            : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

        // We also need endElement position. Since it's at the bottom, it might move if content changes, 
        // but generally it's static relative to flow. 
        // Let's calculate it here or cache it too? 
        // For safety, let's calculate endElement here (one read) or assuming it's far down.
        // Optimization: Cache this too? It depends on height. 
        // Let's read it here - ONE read per frame is better than N reads.
        // But better: use offsetTop for it too.
        let endElementTop = 0;
        if (endElement) {
            if (useWindowScroll) {
                // Warning: getBoundingClientRect forces reflow. 
                // If we can avoid it, good. 
                // Assuming fixed flow, we can measure once?
                // But let's keep it for now as it's just one.
                // Actually, if we use measureCards, we can update this too.
                // For now, let's just do it, but maybe optimize later if still stuttering.
                // Try to use pure math if possible. 
                // But wait! If we transform cards, the flow of the document DOES NOT change because they are `relative` (default). 
                // Wait, we are NOT changing `position: absolute` or `fixed`.
                // We are just using `transform`. Transforms do NOT affect layout flow (updates to logic).
                // So `endElement` position should stick.

                // HOWEVER, if we used `getBoundingClientRect` on cards previously, and they were transformed, THAT was the issue.
                // Now using cached card positions.

                const rect = endElement.getBoundingClientRect();
                endElementTop = rect.top + window.scrollY;
            } else {
                endElementTop = endElement.offsetTop;
            }
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = cardPositionsRef.current[i]; // Use cached position

            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                // Optimization: Use binary search or simpler logic since valid cards are ordered?
                // Or just loop. Cache lengths.
                let topCardIndex = 0;
                for (let j = 0; j < cardPositionsRef.current.length; j++) {
                    const jCardTop = cardPositionsRef.current[j];
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                // Pin at bottom
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            // Note: We are using transforms to simulate pinning. 
            // The element stays in document flow at 'cardTop'.
            // We visually move it by 'translateY'.

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                gestureOrientation: 'vertical',
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        }
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        // Collect cards
        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
        ) as HTMLElement[];
        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        // Apply margins
        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            // Init styles
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            // card.style.webkitTransform = 'translateZ(0)'; // Generally handled by autoprefixer or inline below
            // Clean initial state for measuring
            card.style.transform = 'none';
        });

        // Measure initial positions (after a small delay to ensure layout stable? or synchronously)
        // Request animation frame to measure?
        // Let's measure immediately.
        measureCards();
        setIsReady(true);

        // Initialize Scroll
        setupLenis();

        // Initial update
        updateCardTransforms();

        // Resize handler to re-measure
        const handleResize = () => {
            // Reset transforms to measure correctly? 
            // Since we use translate, if we measure getBoundingClientRect it includes transform.
            // If we use offsetTop, it ignores transform.
            // But layout might change.
            // Let's try re-measuring.
            measureCards();
            updateCardTransforms();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            cardPositionsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        measureCards
    ]);

    return (
        <div
            className={`relative w-full ${!useWindowScroll ? 'h-full overflow-y-auto overflow-x-visible' : ''} ${className}`.trim()}
            ref={scrollerRef}
        // Remove style that might conflict
        >
            <div className={`scroll-stack-inner pt-[15vh] px-4 md:px-20 pb-[50rem] min-h-screen ${!isReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end w-full h-px" />
            </div>
        </div>
    );
};

export default ScrollStack;
