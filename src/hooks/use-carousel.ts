import { useReducer, useEffect, CSSProperties } from "react";

const initialCarouselState = {
    offset: 0,
    desired: 0,
    active: 0,
};

function previous(length: number, current: number) {
    return (current - 1 + length) % length;
}

function next(length: number, current: number) {
    return (current + 1) % length;
}

function carouselReducer(state: any, action: any) {
    switch (action.type) {
        case "jump":
            return { ...state, desired: action.desired };
        case "next":
            return { ...state, desired: next(action.length, state.active) };
        case "prev":
            return { ...state, desired: previous(action.length, state.active) };
        case "done":
            return { ...state, offset: NaN, active: state.desired };
        case "drag":
            return { ...state, offset: action.offset };
        default:
            return state;
    }
}

export function useCarousel(length: number, interval: number = 5000) {
    const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
    const transitionTime = 400;
    const smooth = `transform ${transitionTime}ms ease`;

    useEffect(() => {
        const id = setTimeout(() => dispatch({ type: "next", length }), interval);
        return () => clearTimeout(id);
    }, [state.offset, state.active, length, interval]);

    useEffect(() => {
        const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
        return () => clearTimeout(id);
    }, [state.desired]);

    const style: CSSProperties = {
        transform: "translateX(0)",
        width: `${100 * (length + 2)}%`,
        left: `-${(state.active + 1) * 100}%`,
        transition: smooth,
    };

    if (state.desired !== state.active) {
        // Calculate the direction and distance
        const dist = Math.abs(state.active - state.desired);

        // Use logic only to detect loop crossing
        // If distance is more than half (e.g. 0->8 or 8->0), we are looping
        const isLooping = dist > length / 2;

        let direction = Math.sign(state.desired - state.active);

        if (isLooping) {
            // Flip direction if looping
            direction = -direction;
        }

        // direction = 1 means desired > active (e.g. 0 -> 1), so we want NEXT. 
        // NEXT means moving the track LEFT (negative transform).
        // direction = -1 means desired < active (e.g. 1 -> 0), so we want PREV.
        // PREV means moving the track RIGHT (positive transform).

        // Wait, standard Math.sign(1 - 0) is 1.
        // Standard Next (0->1) gives direction 1.
        // Looping Next (8->0): sign -1. Loop flipped -> 1.
        // So NEXT is consistently 1.

        // Standard Prev (1->0): sign -1.
        // Looping Prev (0->8): sign 1. Loop flipped -> -1.
        // So PREV is consistently -1.

        const shiftPercentage = 100 / (length + 2);

        if (direction === 1) { // Next
            style.transform = `translateX(-${shiftPercentage}%)`;
        } else if (direction === -1) { // Prev
            style.transform = `translateX(${shiftPercentage}%)`;
        }

        // Note: This logic assumes 1-step moves for auto/next/prev.
        // If jumping multiple steps (dots), this will animate 1 unit but snap to target. 
        // This is acceptable behavior for this simplified carousel.

    } else {
        style.transition = 'none';
        if (!isNaN(state.offset) && state.offset !== 0) {
            style.transform = `translateX(${state.offset}px)`;
        }
    }

    let startX = 0;

    const handlers = {
        onTouchStart: (e: React.TouchEvent) => {
            startX = e.touches[0].clientX;
        },
        onTouchMove: (e: React.TouchEvent) => {
            const x = e.touches[0].clientX;
            const deltaX = x - startX;
            dispatch({ type: "drag", offset: deltaX });
        },
        onTouchEnd: (e: React.TouchEvent) => {
            const x = e.changedTouches[0].clientX;
            const deltaX = x - startX;
            const t = (e.target as HTMLElement).offsetWidth / 3;

            if (Math.abs(deltaX) >= t) {
                if (deltaX > 0) {
                    dispatch({ type: "prev", length });
                } else {
                    dispatch({ type: "next", length });
                }
            } else {
                dispatch({ type: "drag", offset: 0 });
            }
        }
    };

    const nextSlide = () => dispatch({ type: "next", length });
    const prevSlide = () => dispatch({ type: "prev", length });

    return [state.active, (n: number) => dispatch({ type: "jump", desired: n }), handlers, style, nextSlide, prevSlide] as const;
}
