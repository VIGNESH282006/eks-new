"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PackagesPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PackagesPopup({ isOpen, onClose }: PackagesPopupProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[650px]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 md:left-auto md:right-4 z-50 p-2 bg-white/20 hover:bg-red-50 rounded-full transition-colors text-gray-500 hover:text-red-600 backdrop-blur-sm"
                    >
                        <X size={24} />
                    </button>

                    {/* Left Column: Form (Flipped) */}
                    <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-14 bg-white flex flex-col justify-center order-2 md:order-1 relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-red-50 rounded-br-full -z-10 opacity-50"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-50 rounded-tl-full -z-10 opacity-50"></div>

                        <div className="mb-8 text-center md:text-left relative">
                            <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wider mb-4 border border-red-100 uppercase">
                                Limited Time Offer
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight uppercase font-display">
                                Home Construction<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Experts in </span>
                                <span className="text-red-600 underline decoration-4 decoration-red-200 underline-offset-4">Chennai</span>
                            </h2>
                        </div>

                        <form className="space-y-4 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Your Name"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                                <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all hover:bg-white focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500">
                                    <div className="flex items-center justify-center px-3 bg-gray-100 text-gray-500 font-medium text-sm border-r border-gray-200">
                                        +91
                                    </div>
                                    <Input
                                        placeholder="Mobile Number"
                                        type="tel"
                                        className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none flex-1"
                                    />
                                </div>
                            </div>

                            <Input
                                placeholder="Email Address"
                                type="email"
                                className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Project Location"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                                <Input
                                    placeholder="Land Area (Sq.ft)"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                            </div>

                            <Button className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-[#C11336] to-[#E91E63] hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/30 rounded-lg mt-6 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
                                Get Free Consultation
                            </Button>
                        </form>
                    </div>

                    {/* Right Column: Image (Flipped) */}
                    <div className="w-full md:w-5/12 relative order-1 md:order-2 h-48 md:h-auto">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 md:hidden"></div>

                        {/* Red Overlay Effect */}
                        <div className="absolute inset-0 bg-[#C11336]/10 mix-blend-multiply z-10 hidden md:block"></div>

                        {/* Logo Overlay */}
                        <div className="absolute top-6 right-6 z-20 bg-white/90 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                            <img src="/logo.png" alt="eks Constructions" className="h-12 w-auto object-contain" />
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
                            alt="Luxury Home Construction"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
