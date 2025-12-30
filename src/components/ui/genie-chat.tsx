import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";

export function GenieChat() {
    const [isOpen, setIsOpen] = useState(false);
    const hasAutoOpened = useRef(false);
    const { scrollY } = useScroll();

    // Auto-open when scrolling past hero section (approx 600px)
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 600 && !hasAutoOpened.current && !isOpen) {
            setIsOpen(true);
            hasAutoOpened.current = true;
        }
    });

    // Toggle chat
    const toggleChat = () => setIsOpen(!isOpen);

    // Contact Links
    const openWhatsApp = () => window.open("https://wa.me/919962590632", "_blank");
    const openPhone = () => window.open("tel:+919962590632");

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">

            {/* Chat Popup Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-2 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-neutral-900 origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="relative bg-[#0052cc] p-5 text-white">
                            <h3 className="text-xl font-bold">Hi!!</h3>
                            <p className="text-sm opacity-90 mt-1">How can I help you?</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col p-3 gap-2">
                            <button
                                onClick={openWhatsApp}
                                className="flex items-center gap-4 rounded-xl p-4 text-base font-semibold text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors border border-neutral-100 dark:border-neutral-800 shadow-sm"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <MessageCircle size={22} fill="currentColor" className="opacity-90" />
                                </div>
                                WhatsApp
                            </button>

                            <button
                                onClick={openPhone}
                                className="flex items-center gap-4 rounded-xl p-4 text-base font-semibold text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors border border-neutral-100 dark:border-neutral-800 shadow-sm"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <Phone size={22} fill="currentColor" className="opacity-90" />
                                </div>
                                Phone
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Genie Button */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative h-32 w-32 bg-transparent focus:outline-none z-50 filter drop-shadow-2xl"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.img
                            key="open"
                            src="/chat/chat-icon-open.jpg"
                            alt="Genie Open"
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <motion.img
                            key="closed"
                            src="/chat/chat-icon.jpg"
                            alt="Genie Closed"
                            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="h-full w-full object-contain"
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
