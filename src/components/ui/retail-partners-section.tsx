"use client"

import { motion } from "framer-motion"
import { Building } from "lucide-react"

const BRANDS = [
    "/brands/ARS.jpg",
    "/brands/ashirvad-pipes.jpg",
    "/brands/asian-paints.jpg",
    "/brands/coromandel.jpg",
    "/brands/finolex-pipes.jpg",
    "/brands/gbr-tmt.jpg",
    "/brands/jaquar.jpg",
    "/brands/johnson-tiles.jpg",
    "/brands/jsw-steel.jpg",
    "/brands/kag-tiles.jpg",
    "/brands/kajaria-tiles.jpg",
    "/brands/kamachi-tmt-bars.jpg",
    "/brands/orbit-cables.jpg",
    "/brands/orientbell-tiles.jpg",
    "/brands/ramco-cement.jpg",
    "/brands/tirumala-steel.jpg",
    "/brands/ultratech.jpg",
    "/brands/zuari-cement-logo.jpg"
];

const RetailPartnersSection = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="w-full text-center mb-10">
                    <h3 className="text-[#C11336] font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-xl md:text-2xl">
                        <Building className="w-6 h-6" />
                        Our Retail Partners
                    </h3>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...BRANDS, ...BRANDS].map((brand, i) => (
                            <div key={i} className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                                <img
                                    src={brand}
                                    alt="Brand Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RetailPartnersSection;
