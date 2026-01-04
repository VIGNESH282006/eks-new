"use client";

import { motion } from "framer-motion";

export const InteriorCTA = () => {
    return (
        <section className="relative py-20 pb-[5.5rem] px-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2674&auto=format&fit=crop"
                    alt="Interior Design Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-[#0e3b7e]/60"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
                        Ready to Transform <br />
                        <span className="text-[#C11336] bg-white/10 px-2 rounded-lg">Your Interiors?</span>
                    </h2>
                    <p className="text-gray-100/90 text-lg mb-8 max-w-2xl mx-auto text-center leading-relaxed font-light">
                        Experience the perfect blend of aesthetics and functionality. Let us craft an interior that reflects your unique style and personality.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="/contact"
                        className="px-8 py-4 bg-[#C11336] hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 uppercase tracking-wide text-sm"
                    >
                        Contact Us
                    </a>
                    <a
                        href="/packages"
                        className="px-8 py-4 bg-white hover:bg-gray-100 text-[#082E6D] border border-gray-200 rounded-full font-semibold transition-all duration-300 shadow-sm uppercase tracking-wide text-sm"
                    >
                        View Packages
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
