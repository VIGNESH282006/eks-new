"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, XCircle, X, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

// ========================================
// CONFIGURATION PLACEHOLDERS
// ========================================
const EMAILJS_SERVICE_ID = 'service_rfahi2m';
const EMAILJS_PUBLIC_KEY = 'EUKs2SqUMoJWLexhD';
const EMAILJS_TEMPLATE_ID = 'template_ng3zz53';

const CLOUDINARY_CLOUD_NAME = 'dtl0gebhh';
const CLOUDINARY_UPLOAD_PRESET = 'resumes_new';
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
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border ${type === 'success'
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

export function CareerApplicationForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 5000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Cloudinary upload failed");
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Upload Error:", error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!CLOUDINARY_CLOUD_NAME) {
            showToast("Cloudinary configuration missing in code!", "error");
            return;
        }

        if (!formRef.current) return;

        setIsSubmitting(true);
        setStatusMessage("Uploading resume...");

        try {
            let resumeUrl = "No resume attached";

            // 1. Upload Resume if selected
            if (selectedFile) {
                const url = await uploadToCloudinary(selectedFile);
                if (url) {
                    resumeUrl = url;
                } else {
                    throw new Error("Failed to upload resume");
                }
            }

            setStatusMessage("Sending application...");

            // 2. Send Email via EmailJS
            const formData = new FormData(formRef.current);
            const templateParams = {
                first_name: formData.get('first-name'),
                last_name: formData.get('last-name'),
                user_email: formData.get('email'),
                user_phone: formData.get('phone'),
                experience: formData.get('experience'),
                position: formData.get('position'),
                message: formData.get('message'),
                resume_link: resumeUrl, // This sends the Cloudinary link
                form_source: 'Careers Page'
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            showToast("Application submitted successfully!", "success");
            formRef.current.reset();
            setSelectedFile(null);
            setStatusMessage("");

        } catch (error) {
            console.error("Submission Error:", error);
            showToast("Failed to submit application. Please try again.", "error");
            setStatusMessage("");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full py-20 overflow-hidden">
            {/* Minimalist Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

            <div className="flex items-center justify-center px-0 md:p-10">
                <AnimatePresence>
                    {toast.show && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(prev => ({ ...prev, show: false }))}
                        />
                    )}
                </AnimatePresence>

                <div className="w-full max-w-4xl bg-white/80 backdrop-blur-3xl p-6 md:p-14 rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-12 space-y-3">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide border border-blue-100 animate-fade-in-up">
                            CAREERS
                        </div>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Join <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">The Team</span>
                        </h3>
                        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed text-justify [text-justify:inter-word] md:text-center">
                            Ready to build something amazing? Fill out the form below and let's get started.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2 group">
                                <Label htmlFor="first-name" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                    First Name
                                </Label>
                                <Input
                                    type="text"
                                    id="first-name"
                                    name="first-name"
                                    placeholder="Jane"
                                    required
                                    className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <Label htmlFor="last-name" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                    Last Name
                                </Label>
                                <Input
                                    type="text"
                                    id="last-name"
                                    name="last-name"
                                    placeholder="Doe"
                                    required
                                    className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="jane@example.com"
                                required
                                className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Phone Number
                            </Label>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+1 (555) 000-0000"
                                required
                                className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2 group">
                                <Label htmlFor="experience" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                    Experience
                                </Label>
                                <Input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    placeholder="e.g. 5+ years"
                                    required
                                    className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <Label htmlFor="position" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                    Desired Position
                                </Label>
                                <Input
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="e.g. Senior Architect"
                                    required
                                    className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="resume" className="text-sm font-semibold text-slate-700 ml-1">
                                Resume / CV
                            </Label>
                            <div
                                className={`relative group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer overflow-hidden ${selectedFile ? 'border-green-400 bg-green-50/30' : 'border-slate-200 bg-slate-50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    required={!selectedFile}
                                />

                                <div className="z-10 flex flex-col items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                                    {selectedFile ? (
                                        <>
                                            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                                                <CheckCircle2 className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold max-w-[280px] truncate">{selectedFile.name}</p>
                                                <p className="text-sm text-green-600 font-medium">Ready to upload</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <UploadCloud className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold text-lg">Click to upload</p>
                                                <p className="text-sm text-slate-500">or drag and drop here (PDF, DOC)</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-blue-600 transition-colors">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us why you're a great fit..."
                                required
                                className="min-h-[160px] rounded-2xl bg-slate-50 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none p-5 text-base"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 text-lg font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {statusMessage || "Submitting..."}
                                </span>
                            ) : (
                                "Send Application"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
