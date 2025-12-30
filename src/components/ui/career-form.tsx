"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Folder } from "lucide-react";

export function CareerApplicationForm() {
    return (
        <div className="flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-primary to-primary-red rounded-[3rem] mt-20">
            <div className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/20 border border-white/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                    Apply Now
                </h3>

                <form className="space-y-6">
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
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/30 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <Folder className="w-10 h-10 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-primary font-medium mb-1">Click to upload</p>
                            <p className="text-sm text-gray-500 mb-4">or drag and drop</p>
                            <p className="text-xs text-gray-400 mb-4">PDF, DOC, DOCX (max 10MB)</p>
                            <Button type="button" variant="default" className="bg-primary hover:bg-primary/90 text-white">
                                Choose File
                            </Button>
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
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

                    <Button type="submit" className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white mt-8 rounded-xl shadow-lg shadow-primary/20">
                        SUBMIT APPLICATION
                    </Button>
                </form>
            </div>
        </div>
    );
}
