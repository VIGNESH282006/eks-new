import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = 'service_ii7mbet';
const EMAILJS_TEMPLATE_ID = 'template_97i61hm';
const EMAILJS_PUBLIC_KEY = 'hs432_oCc0PnIh1Tr';
// ========================================

interface PackagesPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

// Toast Notification Component
const Toast = ({
    message,
    type,
    onClose
}: {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border ${type === 'success'
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600'
                }`}
        >
            {type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium text-sm">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export function PackagesPopup({ isOpen, onClose }: PackagesPopupProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    if (!isOpen) return null;

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;

        setIsSubmitting(true);

        try {
            const formData = new FormData(formRef.current);
            const templateParams = {
                user_name: formData.get('user_name'),
                user_mobile: formData.get('user_mobile'),
                user_email: formData.get('user_email'),
                location: formData.get('location'),
                land_area: formData.get('land_area'),
                form_source: 'Packages Popup'
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            showToast('Query submitted successfully!', 'success');
            formRef.current.reset();
            // Optional: Close popup after success
            setTimeout(onClose, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            showToast('Failed to submit. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    {/* Toast Inside Popup */}
                    <AnimatePresence>
                        {toast.show && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast(prev => ({ ...prev, show: false }))}
                            />
                        )}
                    </AnimatePresence>

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

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    name="user_name"
                                    required
                                    placeholder="Your Name"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                                <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all hover:bg-white focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500">
                                    <div className="flex items-center justify-center px-3 bg-gray-100 text-gray-500 font-medium text-sm border-r border-gray-200">
                                        +91
                                    </div>
                                    <Input
                                        name="user_mobile"
                                        required
                                        placeholder="Mobile Number"
                                        type="tel"
                                        className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none flex-1"
                                    />
                                </div>
                            </div>

                            <Input
                                name="user_email"
                                required
                                placeholder="Email Address"
                                type="email"
                                className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    name="location"
                                    required
                                    placeholder="Project Location"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                                <Input
                                    name="land_area"
                                    placeholder="Land Area (Sq.ft)"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-lg transition-all hover:bg-white"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-[#C11336] to-[#E91E63] hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/30 rounded-lg mt-6 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer relative z-20"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    'Get Free Consultation'
                                )}
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
