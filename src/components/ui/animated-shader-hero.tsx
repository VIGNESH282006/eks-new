import { type FC } from 'react';

// Types for component props
interface HeroProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    // Deprecated but kept for compatibility if needed (or removed if unused)
    headline?: {
        line1: string;
        line2: string;
    };
    trustBadge?: {
        text: string;
        icons?: string[];
    };
    buttons?: {
        primary?: {
            text: string;
            onClick?: () => void;
        };
        secondary?: {
            text: string;
            onClick?: () => void;
        };
    };
    className?: string;
}

// Reusable Hero Component
const Hero: FC<HeroProps> = ({
    title,
    subtitle,
    headline,
    buttons,
    className = ""
}) => {
    return (
        <div className={`relative w-full h-[100dvh] md:h-screen overflow-hidden bg-white ${className}`}>

            {/* Video Background */}
            <div className="absolute inset-0 z-[1]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/intro-video.webm" type="video/mp4" />
                </video>

            </div>

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">

                <div className="text-center space-y-4 max-w-6xl mx-auto px-4">
                    {/* Main Title */}
                    <div className="animate-fade-in-up delay-200">
                        {title ? title : (
                            headline && (
                                <div className="space-y-2">
                                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent transform-gpu">
                                        {headline.line1}
                                    </h1>
                                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary-red via-red-500 to-orange-500 bg-clip-text text-transparent transform-gpu">
                                        {headline.line2}
                                    </h1>
                                </div>
                            )
                        )}
                    </div>

                    {/* Subtitle */}
                    <div className="animate-fade-in-up delay-[600ms]">
                        {typeof subtitle === 'string' ? (
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium leading-relaxed max-w-3xl mx-auto">
                                {subtitle}
                            </p>
                        ) : subtitle}
                    </div>

                    {/* CTA Buttons with Animation */}
                    {buttons && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up delay-[800ms]">
                            {buttons.primary && (
                                <button
                                    onClick={buttons.primary.onClick}
                                    className="px-8 py-4 bg-primary-red hover:bg-red-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-red/25"
                                >
                                    {buttons.primary.text}
                                </button>
                            )}
                            {buttons.secondary && (
                                <button
                                    onClick={buttons.secondary.onClick}
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-sm"
                                >
                                    {buttons.secondary.text}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



export default Hero;

