import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = 'service_hbqfu0d';
const EMAILJS_TEMPLATE_ID = 'template_ebsy7cm';
const EMAILJS_PUBLIC_KEY = '0bXXByMr7szLNAm3i';
// ========================================

interface ServicePopupProps {
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

export function ServicePopup({ isOpen, onClose }: ServicePopupProps) {
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
                form_source: 'Service Popup'
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

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    name="user_name"
                                    required
                                    placeholder="Enter your Name"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div className="flex gap-2">
                                <div className="flex items-center justify-center px-4 bg-gray-100 rounded-xl text-gray-500 font-medium text-sm border border-gray-200">
                                    IN +91
                                </div>
                                <Input
                                    name="user_mobile"
                                    required
                                    placeholder="Enter mobile number"
                                    type="tel"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl flex-1"
                                />
                            </div>

                            <div>
                                <Input
                                    name="user_email"
                                    required
                                    placeholder="Enter your Email ID"
                                    type="email"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div>
                                <Input
                                    name="location"
                                    required
                                    placeholder="Enter your Location"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <div>
                                <Input
                                    name="land_area"
                                    placeholder="Enter Total Land area"
                                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl shadow-primary/20 rounded-xl mt-4 transition-all hover:scale-[1.02] cursor-pointer relative z-20"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    'Get Free Quote'
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
