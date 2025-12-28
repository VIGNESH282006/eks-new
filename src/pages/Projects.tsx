

import { useSearchParams } from "react-router-dom";
import PillNav from "../components/ui/pill-nav";

const Projects = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "completed";

    const navItems = [
        { label: "Completed projects", href: "/projects?category=completed" },
        { label: "Ongoing projects", href: "/projects?category=ongoing" },
        { label: "Upcoming projects", href: "/projects?category=upcoming" },
        { label: "Our gallery", href: "/projects?category=gallery" },
    ];

    const currentHref = `/projects?category=${activeCategory}`;

    return (
        <div className="pt-32 px-8 min-h-screen bg-white text-center">

            {/* Pill Navbar */}
            <div className="flex justify-center mb-12">
                <PillNav
                    items={navItems}
                    activeHref={currentHref}
                    baseColor="#ef4444" // red
                    pillColor="#fff"
                    pillTextColor="#000"
                    hoveredPillTextColor="#fff"
                />
            </div>

            <h1 className="text-5xl font-bold text-primary mb-8">
                {activeCategory === 'completed' && "Completed Projects"}
                {activeCategory === 'ongoing' && "Ongoing Projects"}
                {activeCategory === 'upcoming' && "Upcoming Projects"}
                {activeCategory === 'gallery' && "Our Gallery"}
            </h1>

            {/* Content Sections */}
            <div className="max-w-6xl mx-auto">
                {activeCategory === 'completed' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl aspect-video bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500">Completed Project {i}</div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">View Project</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeCategory === 'ongoing' && (
                    <div className="p-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <p className="text-xl text-gray-500">Ongoing projects content goes here.</p>
                    </div>
                )}

                {activeCategory === 'upcoming' && (
                    <div className="p-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <p className="text-xl text-gray-500">Upcoming projects content goes here.</p>
                    </div>
                )}

                {activeCategory === 'gallery' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                Gallery {i}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
