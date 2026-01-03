import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
    mainText: string;
    readMoreLink: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    className?: string;
}

// The main reusable Hero Section component
export const MinimalistHero = ({
    mainText,
    readMoreLink = "#",
    imageSrc,
    imageAlt,
    overlayText,
    backgroundImage,
    className,
}: Omit<MinimalistHeroProps, 'logoText' | 'navLinks' | 'socialLinks' | 'locationText'> & { backgroundImage?: string }) => {
    return (
        <div
            className={cn(
                'relative flex min-h-[100dvh] md:h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 md:p-12 font-sans',
                className
            )}
        >
            {/* Background Image with Overlay */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay - Slight dark to make white text readable */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                </div>
            )}

            {/* Main Content Area */}
            <div className="relative z-10 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 pt-20">
                {/* Left Side: Heading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="order-2 md:order-1 text-center md:text-left text-white"
                >
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
                        {overlayText.part1}
                        <br />
                        {overlayText.part2}
                    </h1>
                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="absolute z-0 h-[300px] w-[300px] rounded-full bg-white/10 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                    ></motion.div>
                    <motion.img
                        src={imageSrc}
                        alt={imageAlt}
                        className="relative z-10 h-auto w-[650px] object-contain md:w-[850px] lg:w-[1000px]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: [0, -15, 0],
                        }}
                        transition={{
                            opacity: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
                            y: {
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop"
                            }
                        }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                        }}
                    />
                </div>

                {/* Right Side: Paragraph Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="order-3 flex items-center justify-center text-center md:justify-end md:text-right"
                >
                    <div>
                        <p className="mx-auto max-w-sm text-base leading-relaxed md:mx-0 drop-shadow-md font-medium text-white">{mainText}</p>
                        <a href={readMoreLink} className="mt-4 inline-block text-sm font-bold text-white underline decoration-white decoration-2 underline-offset-4 hover:opacity-80 transition-opacity">
                            Read More
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
