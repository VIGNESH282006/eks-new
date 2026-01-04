"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Loader2, CheckCircle2, XCircle, Check, Phone, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import emailjs from '@emailjs/browser';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = 'service_ii7mbet';
const EMAILJS_TEMPLATE_ID = 'template_abuyi9g';
const EMAILJS_PUBLIC_KEY = 'hs432_oCc0PnIh1Tr';
// ========================================

type PackageType = "Basic" | "Standard" | "Premium";
type FloorsType = "Ground" | "Ground + 1" | "Ground + 2" | "Ground + 3";

interface PackageDetails {
    price: number;
    label: string;
}

const PACKAGES: Record<PackageType, PackageDetails> = {
    Basic: { price: 2099, label: "Basic Package @ 2099/sqft" },
    Standard: { price: 2399, label: "Standard Package @ 2399/sqft" },
    Premium: { price: 2599, label: "Premium Package @ 2599/sqft" },
};

const INITIAL_DATA = {
    landArea: "",
    sumpSize: "",
    septicTankSize: "",
    compoundWallLength: "", // Default feet
};

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

export function CostCalculator() {
    const [formData, setFormData] = useState<{
        name: string;
        phone: string;
        email: string;
        location: string;
        landArea: number | string;
        floors: FloorsType;
        packageType: PackageType;
    }>({
        name: "",
        phone: "",
        email: "",
        location: "",
        landArea: INITIAL_DATA.landArea,
        floors: "Ground" as FloorsType,
        packageType: "Basic" as PackageType,
    });

    const [rowInputs, setRowInputs] = useState<{
        groundFloor: number | string;
        firstFloor: number | string;
        secondFloor: number | string;
        thirdFloor: number | string;
        sump: number | string;
        septic: number | string;
        compoundWall: number | string;
    }>({
        groundFloor: INITIAL_DATA.landArea,
        firstFloor: INITIAL_DATA.landArea,
        secondFloor: INITIAL_DATA.landArea,
        thirdFloor: INITIAL_DATA.landArea,
        sump: INITIAL_DATA.sumpSize,
        septic: INITIAL_DATA.septicTankSize,
        compoundWall: INITIAL_DATA.compoundWallLength,
    });

    const [showResult, setShowResult] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        setRowInputs((prev) => ({
            ...prev,
            groundFloor: formData.landArea,
            firstFloor: formData.landArea,
            secondFloor: formData.landArea,
            thirdFloor: formData.landArea,
        }));
    }, [formData.landArea]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "landArea" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 5000);
    };

    const currentPackage = PACKAGES[formData.packageType];

    const calculateCost = (quantity: number, rate: number) => {
        return quantity * rate;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const renderFloorRows = () => {
        const rows = [];
        // Ground Floor
        rows.push({
            label: "Area for Ground Floor",
            key: "groundFloor",
            unit: "sqft",
            rate: currentPackage.price,
        });

        if (formData.floors.includes("+ 1") || formData.floors.includes("+ 2") || formData.floors.includes("+ 3")) {
            rows.push({
                label: "Area for First Floor",
                key: "firstFloor",
                unit: "sqft",
                rate: currentPackage.price,
            });
        }

        if (formData.floors.includes("+ 2") || formData.floors.includes("+ 3")) {
            rows.push({
                label: "Area for Second Floor",
                key: "secondFloor",
                unit: "sqft",
                rate: currentPackage.price,
            });
        }

        if (formData.floors.includes("+ 3")) {
            rows.push({
                label: "Area for Third Floor",
                key: "thirdFloor",
                unit: "sqft",
                rate: currentPackage.price,
            });
        }

        return rows;
    };

    const floorRows = renderFloorRows();

    const calculateTotal = async () => {
        if (!formData.landArea || Number(formData.landArea) <= 0) {
            showToast("Please enter a valid Land Area.", "error");
            return;
        }
        if (!formData.name || !formData.phone) {
            showToast("Please enter your name and phone number.", "error");
            return;
        }

        setIsSubmitting(true);

        let total = 0;

        // Add floor costs
        floorRows.forEach(row => {
            const area = Number(rowInputs[row.key as keyof typeof rowInputs] || 0);
            total += calculateCost(area, row.rate);
        });

        // Add other costs
        total += calculateCost(Number(rowInputs.sump || 0), 35);
        total += calculateCost(Number(rowInputs.septic || 0), 20);
        total += calculateCost(Number(rowInputs.compoundWall || 0), 1850);

        setTotalCost(total);

        // Send Email
        try {
            const templateParams = {
                user_name: formData.name,
                user_mobile: formData.phone,
                user_email: formData.email,
                location: formData.location,
                land_area: formData.landArea,
                floors: formData.floors,
                package_type: formData.packageType,
                total_cost: formatCurrency(total),
                breakdown_ground: rowInputs.groundFloor || 0,
                breakdown_sump: rowInputs.sump || 0,
                breakdown_septic: rowInputs.septic || 0,
                breakdown_compound: rowInputs.compoundWall || 0,
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setShowResult(true);
            // showToast("Estimate calculated & sent to your email!", "success");

            // Trigger confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }; // Boost z-index for confetti

            const random = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

        } catch (error) {
            console.error("EmailJS Error:", error);
            showToast("Calculated, but failed to send email report.", "error");
            setShowResult(true); // Still show result even if email fails
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans relative">

            <AnimatePresence>
                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(prev => ({ ...prev, show: false }))}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md"
                        onClick={() => setShowResult(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] p-5 md:p-8 max-w-md md:max-w-4xl w-full relative shadow-2xl text-center overflow-hidden border border-white/20 ring-1 ring-black/5"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowResult(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
                            >
                                <X className="h-6 w-6 text-gray-400" />
                            </button>

                            {/* Desktop: Side Genies (Centered in Modal) */}
                            <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-64 transform pointer-events-none opacity-100 z-0">
                                <img
                                    src="/success/estimate-celebration.png"
                                    alt="Success"
                                    className="w-full h-auto object-contain drop-shadow-lg"
                                />
                            </div>
                            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-64 transform pointer-events-none opacity-100 z-0">
                                <img
                                    src="/success/estimate-celebration.png"
                                    alt="Success"
                                    className="w-full h-auto object-contain drop-shadow-lg scale-x-[-1]"
                                />
                            </div>

                            <div className="mb-4 mt-2 relative">


                                {/* Mobile: Center Genie */}
                                <div className="flex justify-center mb-4 md:hidden">
                                    <img
                                        src="/success/estimate-celebration.png"
                                        alt="Success"
                                        className="w-32 h-auto object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="relative z-10 mx-auto max-w-xs md:max-w-xl px-4 md:px-20 text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-display">Congratulations!</h3>
                                    <p className="text-gray-500 font-medium text-base md:text-xl text-center">Your estimated construction cost is ready</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-4 md:p-6 mb-4 md:mb-6 border border-primary/10 relative overflow-hidden max-w-sm mx-auto">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl" />

                                <p className="text-sm font-bold text-primary/70 uppercase tracking-widest mb-1 md:mb-2 text-center">Total Estimate</p>
                                <span className="text-4xl md:text-5xl font-bold text-primary block tracking-tight text-center">
                                    <NumberFlow
                                        value={totalCost}
                                        format={{
                                            style: "currency",
                                            currency: "INR",
                                            maximumFractionDigits: 0,
                                        }}
                                    />
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 max-w-lg mx-auto">
                                <a
                                    href="https://wa.me/918148353564"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] text-sm md:text-base w-full"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp
                                </a>
                                <a
                                    href="tel:+918148353564"
                                    className="flex items-center justify-center gap-2 bg-[#082E6D] hover:bg-[#062356] text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] text-sm md:text-base"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Now
                                </a>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs text-center text-gray-400 max-w-xs mx-auto leading-relaxed">
                                    * This acts as an approximate estimate. Final pricing may vary based on material selection and site conditions.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-12 space-y-4">
                <span className="bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block">
                    2026 Pricing
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display tracking-tight">
                    Construction Cost Calculator
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light text-center">
                    Get an instant estimate for your dream home construction in Chennai based on your specific needs.
                </p>
            </div>

            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-400 to-primary-red" />

                <div className="p-4 md:p-12 overflow-x-hidden">
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <InputGroup label="Name" placeholder="Enter name" name="name" value={formData.name} onChange={handleInputChange} />
                                    <InputGroup label="Phone" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>
                                <InputGroup label="Email Address" placeholder="Enter email address" name="email" value={formData.email} onChange={handleInputChange} />
                                <InputGroup label="Location / Site Address" placeholder="Enter location" name="location" value={formData.location} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                                Project Details
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Total Land Area (sq.ft) <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            name="landArea"
                                            value={formData.landArea}
                                            onChange={handleInputChange}
                                            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-primary/20 focus:ring-0 transition-all outline-none font-medium text-gray-900 placeholder:text-gray-400 hover:bg-gray-100/80"
                                            placeholder="Ex: 1200"
                                        />
                                        <div className="absolute right-4 top-4 text-gray-400 text-sm font-medium pointer-events-none">SQ.FT</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">No. of Floors <span className="text-red-500">*</span></label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full p-2.5 md:p-4 pr-8 md:pr-10 text-xs md:text-base bg-gray-50 rounded-lg md:rounded-xl border-2 border-transparent hover:bg-gray-100/80 focus:bg-white focus:border-primary/20 transition-all outline-none font-medium text-gray-900 cursor-pointer flex items-center justify-between"
                                                >
                                                    <span>{formData.floors === "Ground" ? "Ground Only" : formData.floors}</span>
                                                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-gray-200 shadow-lg">
                                                {(["Ground", "Ground + 1", "Ground + 2", "Ground + 3"] as FloorsType[]).map((floor) => (
                                                    <DropdownMenuItem
                                                        key={floor}
                                                        onClick={() => setFormData(prev => ({ ...prev, floors: floor }))}
                                                        className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-blue-50"
                                                    >
                                                        <span>{floor === "Ground" ? "Ground Only" : floor}</span>
                                                        {formData.floors === floor && <Check className="h-4 w-4 text-primary" />}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">Package Type <span className="text-red-500">*</span></label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full p-2.5 md:p-4 pr-8 md:pr-10 text-xs md:text-base bg-gray-50 rounded-lg md:rounded-xl border-2 border-transparent hover:bg-gray-100/80 focus:bg-white focus:border-primary/20 transition-all outline-none font-medium text-gray-900 cursor-pointer flex items-center justify-between"
                                                >
                                                    <span>{formData.packageType}</span>
                                                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-gray-200 shadow-lg">
                                                {(Object.keys(PACKAGES) as PackageType[]).map((pkg) => (
                                                    <DropdownMenuItem
                                                        key={pkg}
                                                        onClick={() => setFormData(prev => ({ ...prev, packageType: pkg }))}
                                                        className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-blue-50"
                                                    >
                                                        <span>{pkg}</span>
                                                        {formData.packageType === pkg && <Check className="h-4 w-4 text-primary" />}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Breakdown Table */}
                    <div className="rounded-3xl border border-gray-200/60 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5">
                        {/* Header - Hidden on mobile */}
                        <div className="hidden md:grid bg-gray-50/80 backdrop-blur-sm grid-cols-12 p-5 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <div className="col-span-5 pl-4">Description of Work</div>
                            <div className="col-span-2 text-center">Area / Qty</div>
                            <div className="col-span-1 text-center">Unit</div>
                            <div className="col-span-2 text-center">Rate</div>
                            <div className="col-span-2 text-center">Amount</div>
                        </div>

                        {/* Mobile Header */}
                        <div className="md:hidden bg-gray-50/80 backdrop-blur-sm grid grid-cols-4 p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <div className="col-span-1">Description</div>
                            <div className="col-span-1 text-center">Qty</div>
                            <div className="col-span-1 text-center">Rate</div>
                            <div className="col-span-1 text-center">Amount</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {floorRows.map((row) => (
                                    <motion.div
                                        key={row.key}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-3 md:p-5 group hover:bg-blue-50/30 transition-colors"
                                    >
                                        {/* Desktop Layout */}
                                        <div className="hidden md:grid grid-cols-12 items-center">
                                            <div className="col-span-5 pl-4 font-medium text-gray-900 text-sm md:text-base">{row.label}</div>
                                            <div className="col-span-2 px-2">
                                                <input
                                                    type="number"
                                                    placeholder="Area"
                                                    value={rowInputs[row.key as keyof typeof rowInputs] === 0 ? "" : rowInputs[row.key as keyof typeof rowInputs]}
                                                    onChange={(e) =>
                                                        setRowInputs((prev) => ({ ...prev, [row.key]: e.target.value === "" ? "" : Number(e.target.value) }))
                                                    }
                                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-gray-700 placeholder:text-gray-300 placeholder:text-xs"
                                                />
                                            </div>
                                            <div className="col-span-1 text-center text-gray-400 text-sm font-medium">{row.unit}</div>
                                            <div className="col-span-2 text-center text-gray-500 text-sm font-medium">Rs. {row.rate}</div>
                                            <div className="col-span-2 text-center font-bold text-gray-900 text-lg">
                                                {formatCurrency(calculateCost(Number(rowInputs[row.key as keyof typeof rowInputs] || 0), row.rate))}
                                            </div>
                                        </div>

                                        {/* Mobile Layout */}
                                        <div className="md:hidden grid grid-cols-4 items-center gap-2">
                                            <div className="col-span-1 font-medium text-gray-900 text-xs leading-tight">{row.label}</div>
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    placeholder="-"
                                                    value={rowInputs[row.key as keyof typeof rowInputs] === 0 ? "" : rowInputs[row.key as keyof typeof rowInputs]}
                                                    onChange={(e) =>
                                                        setRowInputs((prev) => ({ ...prev, [row.key]: e.target.value === "" ? "" : Number(e.target.value) }))
                                                    }
                                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20 font-medium text-gray-700"
                                                />
                                                <div className="text-[10px] text-gray-400 text-center mt-0.5">{row.unit}</div>
                                            </div>
                                            <div className="col-span-1 text-center text-gray-500 text-xs font-medium">Rs.{row.rate}</div>
                                            <div className="col-span-1 text-center font-bold text-gray-900 text-sm">
                                                ₹{calculateCost(Number(rowInputs[row.key as keyof typeof rowInputs] || 0), row.rate).toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Other Fixed Items */}
                            <TableRow
                                label="Size of RCC Water Sump (3000 litre)"
                                value={rowInputs.sump}
                                unit="litre"
                                rate={35}
                                placeholder="Value"
                                onChange={(val) => setRowInputs((prev) => ({ ...prev, sump: val }))}
                            />
                            <TableRow
                                label="Size of Septic Tank (10000 litre)"
                                value={rowInputs.septic}
                                unit="litre"
                                rate={20}
                                placeholder="Value"
                                onChange={(val) => setRowInputs((prev) => ({ ...prev, septic: val }))}
                            />
                            <TableRow
                                label="Compound Wall (Height 5ft)"
                                value={rowInputs.compoundWall}
                                unit="RFT"
                                rate={1850}
                                placeholder="Value"
                                onChange={(val) => setRowInputs((prev) => ({ ...prev, compoundWall: val }))}
                            />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-12 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={calculateTotal}
                            disabled={isSubmitting}
                            className={`bg-gradient-to-r from-primary-red to-[#d91f42] hover:shadow-2xl hover:shadow-red-500/30 text-white font-bold py-3 px-6 md:py-5 md:px-12 rounded-xl md:rounded-2xl shadow-xl text-sm md:text-xl uppercase tracking-wider transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-2 md:gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span>Calculating & Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Get Free Estimate Now</span>
                                    <span className="bg-white/20 rounded-full p-1">
                                        <ChevronDown className="h-5 w-5 -rotate-90" />
                                    </span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputGroup({ label, placeholder, name, value, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 ml-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-primary/20 focus:ring-0 transition-all outline-none font-medium text-gray-900 placeholder:text-gray-400 hover:bg-gray-100/80"
            />
        </div>
    );
}

function TableRow({ label, value, unit, rate, placeholder, onChange }: { label: string, value: number | string, unit: string, rate: number, placeholder?: string, onChange: (val: number | string) => void }) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="p-3 md:p-5 group hover:bg-blue-50/30 transition-colors border-t border-gray-100">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-12 items-center">
                <div className="col-span-5 pl-4 font-medium text-gray-900 text-sm md:text-base">{label}</div>
                <div className="col-span-2 px-2">
                    <input
                        type="number"
                        placeholder={placeholder}
                        value={value === 0 ? "" : value}
                        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-gray-700 placeholder:text-gray-300 placeholder:text-xs"
                    />
                </div>
                <div className="col-span-1 text-center text-gray-400 text-sm font-medium">{unit}</div>
                <div className="col-span-2 text-center text-gray-500 text-sm font-medium">Rs. {rate}</div>
                <div className="col-span-2 text-center font-bold text-gray-900 text-lg">
                    {formatCurrency(Number(value || 0) * rate)}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden grid grid-cols-4 items-center gap-2">
                <div className="col-span-1 font-medium text-gray-900 text-xs leading-tight">{label}</div>
                <div className="col-span-1">
                    <input
                        type="number"
                        placeholder="-"
                        value={value === 0 ? "" : value}
                        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-center text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20 font-medium text-gray-700"
                    />
                    <div className="text-[10px] text-gray-400 text-center mt-0.5">{unit}</div>
                </div>
                <div className="col-span-1 text-center text-gray-500 text-xs font-medium">Rs.{rate}</div>
                <div className="col-span-1 text-center font-bold text-gray-900 text-sm">
                    ₹{(Number(value || 0) * rate).toLocaleString('en-IN')}
                </div>
            </div>
        </div>
    );
}
