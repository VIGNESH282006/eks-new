"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Folder, Loader2, CheckCircle2, XCircle, X, UploadCloud } from "lucide-react";
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
        <div className="flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-primary to-primary-red rounded-[3rem] mt-20 relative">
            <AnimatePresence>
                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(prev => ({ ...prev, show: false }))}
                    />
                )}
            </AnimatePresence>

            <div className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/20 border border-white/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    Apply Now
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="first-name" className="font-medium">
                                First Name <span className="text-primary-red">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="first-name"
                                name="first-name"
                                placeholder="Enter your first name"
                                required
                                className="h-12 bg-gray-50/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last-name" className="font-medium">
                                Last Name <span className="text-primary-red">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="last-name"
                                name="last-name"
                                placeholder="Enter your last name"
                                required
                                className="h-12 bg-gray-50/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">
                            Email Address <span className="text-primary-red">*</span>
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            required
                            className="h-12 bg-gray-50/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="font-medium">
                            Phone Number <span className="text-primary-red">*</span>
                        </Label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            required
                            className="h-12 bg-gray-50/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience" className="font-medium">
                            Experience <span className="text-primary-red">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="experience"
                            name="experience"
                            placeholder="e.g., +5 years experience in Civil"
                            required
                            className="h-12 bg-gray-50/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="position" className="font-medium">
                            Desired Position <span className="text-primary-red">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="position"
                            name="position"
                            placeholder="e.g., Civil Engineer, Project Manager"
                            required
                            className="h-12 bg-gray-50/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="resume" className="font-medium">
                            Your Resume <span className="text-primary-red">*</span>
                        </Label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group relative ${selectedFile ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required={!selectedFile}
                            />

                            {selectedFile ? (
                                <>
                                    <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
                                    <p className="text-green-700 font-bold mb-1 max-w-[90%] truncate">{selectedFile.name}</p>
                                    <p className="text-xs text-green-600">Click to change file</p>
                                </>
                            ) : (
                                <>
                                    <Folder className="w-10 h-10 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                                    <p className="text-primary font-medium mb-1">Click to upload</p>
                                    <p className="text-sm text-gray-500 mb-4">or drag and drop</p>
                                    <p className="text-xs text-gray-400 mb-4">PDF, DOC, DOCX (max 10MB)</p>
                                    <Button type="button" variant="default" className="bg-primary hover:bg-primary/90 text-white pointer-events-none">
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="font-medium">
                            Message to Hiring Team <span className="text-primary-red">*</span>
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us why you'd like to work with eks Construction..."
                            required
                            className="min-h-[150px] bg-gray-50/50 resize-none p-4"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white mt-8 rounded-xl shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {statusMessage || "Processing..."}
                            </span>
                        ) : (
                            "SUBMIT APPLICATION"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
