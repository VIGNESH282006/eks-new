import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CheckCircle2 } from "lucide-react";

const ManagementSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "/c-deck/cdeck-step1.png",
        "/c-deck/cdeck-step2.png",
        "/c-deck/cdeck-step3.png"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            title: "Real-Time Project Insights",
            description: "Stop guessing and start controlling. Monitor your exact budget and timeline in real-time to prevent costly overruns.",
        },
        {
            title: "Task-by-Task Monitoring",
            description: "Granular control over every activity. Update progress daily, track site issues, and ensure every specific task meets quality standards.",
        },
        {
            title: "Full-Time Dedicated Support",
            description: "More than just software, we're your partner in progress. Never build alone—our dedicated team is always on standby to ensure you build with total confidence.",
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-white text-gray-900">
            {/* Decorative Background Elements - Light Theme */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* Poppins Font */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                .poppins-font * { font-family: 'Poppins', sans-serif; }
            `}</style>

            <div className="poppins-font relative z-10 max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Header Badge */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm animate-fade-in-down">
                        <span className="flex h-2 w-2 rounded-full bg-[#FB0224]"></span>
                        <span className="text-sm md:text-base font-semibold tracking-wide text-gray-700">
                            Chennai's <span className="text-[#FB0224]">No.1</span> Construction Management Tool
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Left Content Section */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
                                Manage Your Site <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
                                    From Anywhere.
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                Experience the power of C-Deck. Build smarter with our dedicated mobile app designed for on-site efficiency and real-time control.
                            </p>
                        </div>

                        {/* App Availability */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 w-fit shadow-sm">
                                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                    <Smartphone size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Available on Mobile App</h4>
                                    <p className="text-xs md:text-sm text-gray-500">Seamlessly manage projects on iOS & Android</p>
                                </div>
                            </div>

                            {/* Mobile Only: Efficiency Boost Card */}
                            <div className="lg:hidden flex items-center justify-between gap-6 bg-black/90 text-white p-4 rounded-xl shadow-lg border border-gray-800 max-w-sm">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Efficiency</p>
                                    <p className="text-xl font-bold">35% <span className="text-green-400 text-xs">▲</span></p>
                                </div>
                                <div className="h-8 w-[1px] bg-white/20"></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Savings</p>
                                    <p className="text-xl font-bold">20% <span className="text-green-400 text-xs">▲</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Features Accordion */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    className={`rounded-xl border transition-all duration-300 ${openIndex === index ? 'bg-white border-[#FB0224] shadow-md' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm'}`}
                                    key={index}
                                    onClick={() => setOpenIndex(index)}
                                >
                                    <div className="p-4 cursor-pointer flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${openIndex === index ? 'text-[#FB0224] bg-red-50' : 'text-gray-400'}`}>
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <h3 className={`font-semibold text-lg ${openIndex === index ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="px-12 pb-6 pt-0 space-y-4">
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>

                                            {/* Mobile: Image inside box below text */}
                                            <div className="lg:hidden rounded-lg overflow-hidden border border-gray-100 shadow-sm mt-4">
                                                <img
                                                    src={images[index]}
                                                    alt={feature.title}
                                                    className="w-full h-auto object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <a
                                href="https://cdeck.eksconstruction.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#FB0224] border border-transparent rounded-full hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-200"
                            >
                                Get Started Now
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Image Section - Hidden on Mobile */}
                    <div className="hidden lg:block w-full lg:w-1/2 relative min-h-[400px]">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 aspect-video lg:aspect-[4/3] group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-60"></div>

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt="C-Deck Dashboard"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-linear scale-100 group-hover:scale-110"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                />
                            </AnimatePresence>

                            {/* Floating Stats Card - Dark version for visibility over image */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-6 left-6 right-6 z-20 bg-black/70 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-xl"
                            >
                                <div>
                                    <p className="text-xs text-gray-300 uppercase tracking-widest">Efficiency Boost</p>
                                    <p className="text-2xl font-bold text-white">35% <span className="text-green-400 text-sm">▲</span></p>
                                </div>
                                <div className="h-10 w-[1px] bg-white/20"></div>
                                <div>
                                    <p className="text-xs text-gray-300 uppercase tracking-widest">Cost Saving</p>
                                    <p className="text-2xl font-bold text-white">20% <span className="text-green-400 text-sm">▲</span></p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Abstract Glow - Subtle shadow for light theme */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl opacity-50 blur-xl -z-10"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ManagementSection;
