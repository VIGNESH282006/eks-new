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
                'relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-8 font-sans md:p-12',
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
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            {/* Main Content Area */}
            <div className="relative z-10 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 pt-20">
                {/* Left Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="order-2 md:order-1 text-center md:text-left text-white"
                >
                    <p className="mx-auto max-w-xs text-sm leading-relaxed md:mx-0 drop-shadow-md font-medium">{mainText}</p>
                    <a href={readMoreLink} className="mt-4 inline-block text-sm font-bold text-white underline decoration-white decoration-2 underline-offset-4 hover:opacity-80 transition-opacity">
                        Read More
                    </a>
                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="absolute z-0 h-[300px] w-[300px] rounded-full bg-white/50 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                    ></motion.div>
                    <motion.img
                        src={imageSrc}
                        alt={imageAlt}
                        className="relative z-10 h-auto w-80 object-contain md:w-96 lg:w-[450px]"
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

                {/* Right Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="order-3 flex items-center justify-center text-center md:justify-start"
                >
                    <h1 className="text-7xl font-extrabold text-white md:text-8xl lg:text-9xl drop-shadow-lg">
                        {overlayText.part1}
                        <br />
                        {overlayText.part2}
                    </h1>
                </motion.div>
            </div>
        </div>
    );
};
