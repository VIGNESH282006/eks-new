"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

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

    const calculateTotal = () => {
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
        setShowResult(true);

        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

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
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans relative">
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
                            className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl text-center overflow-hidden border border-white/20 ring-1 ring-black/5"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowResult(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6 text-gray-400" />
                            </button>

                            <div className="mb-8 mt-2">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-4xl mb-6 shadow-inner ring-4 ring-white">
                                    🎉
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2 font-display">Congratulations!</h3>
                                <p className="text-gray-500 font-medium">Your estimated construction cost is ready</p>
                            </div>

                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 mb-8 border border-primary/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl" />

                                <p className="text-sm font-bold text-primary/70 uppercase tracking-widest mb-2">Total Estimate</p>
                                <span className="text-5xl font-bold text-primary block tracking-tight">
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

                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-primary to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 text-lg"
                                    onClick={() => setShowResult(false)}
                                >
                                    Start Your Project
                                </motion.button>
                                <p className="text-xs text-center text-gray-400 max-w-xs mx-auto leading-relaxed">
                                    * This acts as an approximate estimate. Final pricing may vary based on material selection and site conditions.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-12 space-y-4">
                <span className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                    2025 Pricing
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display tracking-tight">
                    Construction Cost Calculator
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                    Get an instant estimate for your dream home construction in Chennai based on your specific needs.
                </p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-400 to-primary-red" />

                <div className="p-6 md:p-12">
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

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-700 ml-1">No. of Floors <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                name="floors"
                                                value={formData.floors}
                                                onChange={handleInputChange}
                                                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-primary/20 focus:ring-0 transition-all outline-none font-medium text-gray-900 appearance-none hover:bg-gray-100/80 cursor-pointer"
                                            >
                                                <option value="Ground">Ground Only</option>
                                                <option value="Ground + 1">Ground + 1</option>
                                                <option value="Ground + 2">Ground + 2</option>
                                                <option value="Ground + 3">Ground + 3</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-4.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-700 ml-1">Package Type <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                name="packageType"
                                                value={formData.packageType}
                                                onChange={handleInputChange}
                                                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-primary/20 focus:ring-0 transition-all outline-none font-medium text-gray-900 appearance-none hover:bg-gray-100/80 cursor-pointer"
                                            >
                                                {Object.entries(PACKAGES).map(([key]) => (
                                                    <option key={key} value={key}>
                                                        {key}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-4.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Breakdown Table */}
                    <div className="rounded-3xl border border-gray-200/60 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5">
                        {/* Header */}
                        <div className="bg-gray-50/80 backdrop-blur-sm grid grid-cols-12 p-5 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <div className="col-span-5 pl-4">Description of Work</div>
                            <div className="col-span-2 text-center">Area / Qty</div>
                            <div className="col-span-1 text-center">Unit</div>
                            <div className="col-span-2 text-center">Rate</div>
                            <div className="col-span-2 text-center">Amount</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {floorRows.map((row) => (
                                    <motion.div
                                        key={row.key}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-12 p-5 items-center group hover:bg-blue-50/30 transition-colors"
                                    >
                                        <div className="col-span-5 pl-4 font-medium text-gray-900 text-sm md:text-base">{row.label}</div>
                                        <div className="col-span-2 px-2">
                                            <input
                                                type="number"
                                                placeholder="Area in sqft"
                                                value={rowInputs[row.key as keyof typeof rowInputs] === 0 ? "" : rowInputs[row.key as keyof typeof rowInputs]}
                                                onChange={(e) =>
                                                    setRowInputs((prev) => ({ ...prev, [row.key]: e.target.value === "" ? "" : Number(e.target.value) }))
                                                }
                                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-gray-700 placeholder:text-gray-300 placeholder:text-xs"
                                            />
                                        </div>
                                        <div className="col-span-1 text-center text-gray-400 text-sm font-medium">{row.unit}</div>
                                        <div className="col-span-2 text-center text-gray-500 text-sm font-medium font-variant-numeric">Rs. {row.rate}</div>
                                        <div className="col-span-2 text-center font-bold text-gray-900 text-lg">
                                            {formatCurrency(calculateCost(Number(rowInputs[row.key as keyof typeof rowInputs] || 0), row.rate))}
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
                            className="bg-gradient-to-r from-primary-red to-[#d91f42] hover:shadow-2xl hover:shadow-red-500/30 text-white font-bold py-5 px-12 rounded-2xl shadow-xl text-xl uppercase tracking-wider transition-all duration-300 w-full md:w-auto flex items-center gap-3"
                        >
                            <span>Get Free Estimate Now</span>
                            <span className="bg-white/20 rounded-full p-1">
                                <ChevronDown className="h-5 w-5 -rotate-90" />
                            </span>
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
        <div className="grid grid-cols-12 p-5 items-center group hover:bg-blue-50/30 transition-colors border-t border-gray-100">
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
            <div className="col-span-2 text-center text-gray-500 text-sm font-medium font-variant-numeric">Rs. {rate}</div>
            <div className="col-span-2 text-center font-bold text-gray-900 text-lg">
                {formatCurrency(Number(value || 0) * rate)}
            </div>
        </div>
    );
}
