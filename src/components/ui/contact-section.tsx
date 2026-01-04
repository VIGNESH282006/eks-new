import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Youtube, Loader2, CheckCircle2, XCircle, X } from 'lucide-react';

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = 'service_hbqfu0d';
const EMAILJS_TEMPLATE_ID = 'template_tchjuow';
const EMAILJS_PUBLIC_KEY = '0bXXByMr7szLNAm3i';
// ========================================

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
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${type === 'success'
                ? 'bg-green-500/90 border-green-400/50 text-white'
                : 'bg-red-500/90 border-red-400/50 text-white'
                }`}
        >
            {type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            ) : (
                <XCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <span className="font-semibold text-base">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const ContactSection = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const services = ['Residential', 'Commercial', 'Interior Design', 'Renovation', 'Architecture', 'Other'];

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

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
            // Build template params manually for better control
            const formData = new FormData(formRef.current);
            const templateParams = {
                user_name: formData.get('user_name') as string,
                user_email: formData.get('user_email') as string,
                user_phone: formData.get('user_phone') as string || 'Not provided',
                message: formData.get('message') as string,
                services: selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified'
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            showToast('🎉 Message sent successfully! We\'ll get back to you soon.', 'success');
            formRef.current.reset();
            setSelectedServices([]);
        } catch (error) {
            console.error('EmailJS Error:', error);
            showToast('❌ Failed to send message. Please try again or contact us directly.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(prev => ({ ...prev, show: false }))}
                    />
                )}
            </AnimatePresence>

            <section className="relative min-h-screen w-full flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-gray-50">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                        alt="Construction Background"
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Side: Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#082E6D] tracking-tighter leading-[0.9] drop-shadow-sm">
                            Let's build <br />
                            <span className="text-[#C11336]">something</span> <br />
                            amazing <br />
                            together!
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg font-light leading-relaxed text-left">
                            From dream homes to iconic skylines, we turn your vision into concrete reality.
                        </p>
                    </motion.div>

                    {/* Right Side: Light Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-2xl border border-gray-200 p-8 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/40 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reach out to us today!</h2>
                            <div className="mb-8">
                                <p className="text-gray-500 text-sm mb-1">Mail us at</p>
                                <a href="mailto:info@eksconstruction.in" className="text-gray-900 font-medium hover:text-orange-600 transition-colors">info@eksconstruction.in</a>

                                <div className="flex items-center gap-4 mt-4">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Follow Us</span>
                                    <div className="flex gap-2">
                                        <a href="https://www.facebook.com/eksconstruction.in/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                            <Facebook size={14} />
                                        </a>
                                        <a href="https://www.instagram.com/eks_construction/?hl=en" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all">
                                            <Instagram size={14} />
                                        </a>
                                        <a href="https://www.youtube.com/@eksconstructions" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all">
                                            <Youtube size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                                        <Input
                                            name="user_name"
                                            placeholder="John Doe"
                                            required
                                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <Input
                                            type="email"
                                            name="user_email"
                                            placeholder="john@example.com"
                                            required
                                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-12 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                    <Input
                                        type="tel"
                                        name="user_phone"
                                        placeholder="+91 98765 43210"
                                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Briefly describe your project idea...</label>
                                    <Textarea
                                        name="message"
                                        placeholder="I want to build a..."
                                        required
                                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all min-h-[100px] rounded-xl resize-none"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase">I'm looking for...</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {services.map((item) => (
                                            <div key={item} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={item}
                                                    checked={selectedServices.includes(item)}
                                                    onCheckedChange={() => handleServiceToggle(item)}
                                                    className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                />
                                                <Label htmlFor={item} className="text-gray-700 text-sm cursor-pointer">{item}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-xl mt-4 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative z-20"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send a message'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};
