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
import { MarqueeLogoScroller, Logo } from './marquee-logo-scroller';

const RetailPartnersSection = () => {
    const partners: Logo[] = [
        {
            src: '/brands/ARS.jpg',
            alt: 'ARS',
            gradient: { from: '#E63946', via: '#F1FAEE', to: '#A8DADC' },
        },
        {
            src: '/brands/ashirvad-pipes.jpg',
            alt: 'Ashirvad Pipes',
            gradient: { from: '#457B9D', via: '#A8DADC', to: '#1D3557' },
        },
        {
            src: '/brands/asian-paints.jpg',
            alt: 'Asian Paints',
            gradient: { from: '#F4A261', via: '#E76F51', to: '#264653' },
        },
        {
            src: '/brands/coromandel.jpg',
            alt: 'Coromandel',
            gradient: { from: '#2A9D8F', via: '#E9C46A', to: '#F4A261' },
        },
        {
            src: '/brands/finolex-pipes.jpg',
            alt: 'Finolex Pipes',
            gradient: { from: '#023E8A', via: '#0077B6', to: '#0096C7' },
        },
        {
            src: '/brands/gbr-tmt.jpg',
            alt: 'GBR TMT',
            gradient: { from: '#D62828', via: '#F77F00', to: '#FCBF49' },
        },
        {
            src: '/brands/jaquar.jpg',
            alt: 'Jaquar',
            gradient: { from: '#333533', via: '#D6D6D6', to: '#FFEE32' },
        },
        {
            src: '/brands/johnson-tiles.jpg',
            alt: 'Johnson Tiles',
            gradient: { from: '#FFD100', via: '#FFEE32', to: '#D6D6D6' },
        },
        {
            src: '/brands/jsw-steel.jpg',
            alt: 'JSW Steel',
            gradient: { from: '#003049', via: '#D62828', to: '#F77F00' },
        },
        {
            src: '/brands/kag-tiles.jpg',
            alt: 'KAG Tiles',
            gradient: { from: '#6A994E', via: '#A7C957', to: '#F2E8CF' },
        },
        {
            src: '/brands/kajaria-tiles.jpg',
            alt: 'Kajaria Tiles',
            gradient: { from: '#BC4749', via: '#F2E8CF', to: '#386641' },
        },
        {
            src: '/brands/kamachi-tmt-bars.jpg',
            alt: 'Kamachi TMT Bars',
            gradient: { from: '#5F0F40', via: '#Fb8B24', to: '#E36414' },
        },
        {
            src: '/brands/orbit-cables.jpg',
            alt: 'Orbit Cables',
            gradient: { from: '#9A031E', via: '#CB793A', to: '#F1D302' },
        },
        {
            src: '/brands/orientbell-tiles.jpg',
            alt: 'Orientbell Tiles',
            gradient: { from: '#0F4C5C', via: '#5F0F40', to: '#FB8B24' },
        },
        {
            src: '/brands/ramco-cement.jpg',
            alt: 'Ramco Cement',
            gradient: { from: '#283618', via: '#606C38', to: '#FEFAE0' },
        },
        {
            src: '/brands/tirumala-steel.jpg',
            alt: 'Tirumala Steel',
            gradient: { from: '#6D6875', via: '#B5838D', to: '#E5989B' },
        },
        {
            src: '/brands/ultratech.jpg',
            alt: 'UltraTech',
            gradient: { from: '#FFB703', via: '#FB8500', to: '#219EBC' },
        },
        {
            src: '/brands/zuari-cement-logo.jpg',
            alt: 'Zuari Cement',
            gradient: { from: '#8D99AE', via: '#EDF2F4', to: '#2B2D42' },
        }
    ];

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <MarqueeLogoScroller
                    title="Our Retail Partners"
                    description="Trusted brands we collaborate with to deliver quality."
                    logos={partners}
                    speed="slow"
                    className="bg-gray-50 border-gray-100" // Light theme adjustment
                />
            </div>
        </div>
    );
};

export default RetailPartnersSection;
