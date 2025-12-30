"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServicePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ServicePopup({ isOpen, onClose }: ServicePopupProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500 backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>

                    {/* Left Column: Branding & Image */}
                    <div className="w-full md:w-5/12 bg-gray-50 relative flex flex-col hidden md:flex">
                        {/* Logo Area */}
                        <div className="absolute top-0 left-0 w-full p-8 z-10 bg-gradient-to-b from-white/90 to-transparent flex justify-center">
                            <img
                                src="/logo.png"
                                alt="eks Construction Logo"
                                className="h-24 w-auto object-contain drop-shadow-sm"
                            />
                        </div>
                        {/* Main Image */}
                        <img
                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
                            alt="Modern Luxury Home"
                            className="w-full h-full object-cover"
                        />

                        {/* Bottom Tagline */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                            <p className="font-medium text-lg text-shadow-sm">We offer Turnkey and Interior Designing Services!!</p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full md:w-7/12 p-6 md:p-10 lg:p-12 overflow-y-auto bg-white flex flex-col justify-center">
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight uppercase">
                                Home Construction<br />
                                <span className="text-gray-900">Experts in </span>
                                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 drop-shadow-sm">Chennai</span>
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <Input
                                    placeholder="Enter your Name"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div className="flex gap-2">
                                <div className="flex items-center justify-center px-4 bg-gray-100 rounded-xl text-gray-500 font-medium text-sm border border-gray-200">
                                    IN +91
                                </div>
                                <Input
                                    placeholder="Enter mobile number"
                                    type="tel"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl flex-1"
                                />
                            </div>

                            <div>
                                <Input
                                    placeholder="Enter your Email ID"
                                    type="email"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div>
                                <Input
                                    placeholder="Enter your Location"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div>
                                <Input
                                    placeholder="Enter Total Land area"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <Button className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl shadow-primary/20 rounded-xl mt-4 transition-all hover:scale-[1.02]">
                                Get Free Quote
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
