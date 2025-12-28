"use client";

import { motion } from "framer-motion";

export function InteriorFeatureSection() {
    return (
        <section className="py-24 bg-white relative z-20 -mt-20 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                        Our Features
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
                        Discover the premium features that make our interior designs stand out.
                        We combine aesthetics with functionality to create spaces you'll love.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center p-8">
                                <span className="text-xl font-semibold text-gray-500">Feature {i} Placeholder</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
