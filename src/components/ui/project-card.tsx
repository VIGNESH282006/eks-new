
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Layers, Maximize } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ProjectData {
    id: number;
    project_type: string;
    client_name: string;
    project_title: string;
    location: string;
    area: string;
    floors: string;
    phase?: string;
    start_date: string;
    completion_date?: string;
    progress?: number;
    key_features?: string;
    images?: string | string[]; // Can be JSON string or array
}

interface ProjectCardProps {
    project: ProjectData;
    className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    // Parse images securely
    const images: string[] = (() => {
        try {
            if (!project.images) return [];
            if (Array.isArray(project.images)) return project.images;
            const parsed = JSON.parse(project.images);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return []; // Fallback if JSON is invalid or just a single string
        }
    })();

    // Use a fallback image if none exist
    const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (displayImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 2000); // 2 seconds delay

        return () => clearInterval(interval);
    }, [displayImages.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 h-full relative",
                className
            )}
        >
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-red-500 z-10" />

            {/* Image Slider Section */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={`https://eks-projectmanager.eksconstruction.in${displayImages[currentImageIndex]}`}
                        initial={{ opacity: 0.8, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8 }}
                        transition={{ duration: 0.5 }}
                        alt={project.project_title}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).src = displayImages[0].startsWith('http') ? displayImages[0] : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-6 md:w-3/5 gap-3 pt-7">
                <div>
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 group-hover:text-primary transition-colors line-clamp-1 mb-1">
                        {project.client_name}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <MapPin className="mr-1.5 h-3.5 w-3.5 text-red-500" />
                        {project.location}
                    </div>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.project_title}
                </p>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2 text-sm border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                        <Maximize className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="font-semibold">{project.area} sqft</span>
                    </div>
                    <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                        <Layers className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="font-semibold">{project.floors} Floors</span>
                    </div>

                    {/* Date Logic */}
                    {project.project_type?.includes("Ongoing") ? (
                        <div className="col-span-2 space-y-2 mt-1 bg-blue-50/50 p-2 rounded-lg">
                            {project.start_date && (
                                <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-xs text-neutral-500 mr-1">Started:</span>
                                    <span className="font-medium text-xs">{new Date(project.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                </div>
                            )}
                            {project.completion_date && (
                                <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></div>
                                    <span className="text-xs text-neutral-500 mr-1">Expected:</span>
                                    <span className="font-medium text-xs">{new Date(project.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        project.completion_date && (
                            <div className="flex items-center text-neutral-700 dark:text-neutral-300 col-span-2 mt-1">
                                <Calendar className="mr-2 h-4 w-4 text-green-600" />
                                <span className="font-medium">Completed: {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        )
                    )}
                </div>

                {/* Features Tags - Redesigned */}
                {project.key_features && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {project.key_features.split(',').slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-white border border-gray-200 text-gray-700 text-[10px] px-3 py-1 rounded-full font-semibold shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
                                {feature.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
