
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/ui/mini-navbar";
import { ProjectCard } from "@/components/ui/project-card";
import { useProjects } from "@/hooks/use-projects";
import { useGallery } from "@/hooks/use-gallery";
import { FocusCards } from "@/components/ui/focus-cards";

const GallerySection = () => {
    const { gallery, loading, error } = useGallery();

    if (loading) return <div className="text-center py-20 text-gray-500">Loading gallery...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error loading gallery</div>;

    // Flatten all images from all gallery items, attaching the heading to each image
    const allImages = gallery.flatMap(item => {
        const images = Array.isArray(item.images) ? item.images : [];
        return images.map((img: { url: string }) => ({
            url: img.url,
            heading: item.heading
        }));
    });

    if (allImages.length === 0) return <div className="text-center py-20 text-neutral-400">No images found in gallery.</div>;

    const cards = allImages.map((img) => ({
        title: img.heading || "Project Image",
        src: `https://eks-projectmanager.eksconstruction.in/${img.url}`
    }));

    return (
        <div className="py-10">
            <FocusCards cards={cards} />
        </div>
    );
};

const Projects = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "Completed Projects";
    const { projects, loading, error } = useProjects();

    const navItems = [
        { label: "Completed projects", href: "/projects?category=Completed Projects", isActive: activeCategory === "Completed Projects" },
        { label: "Ongoing projects", href: "/projects?category=Ongoing Projects", isActive: activeCategory === "Ongoing Projects" },
        { label: "Upcoming projects", href: "/projects?category=Upcoming Projects", isActive: activeCategory === "Upcoming Projects" },
        { label: "Our gallery", href: "/projects?category=Gallery", isActive: activeCategory === "Gallery" },
    ];

    // Filter projects based on active Category
    const filteredProjects = projects.filter(p => {
        if (activeCategory === "Gallery") return false;
        return p.project_type?.toLowerCase().includes(activeCategory.replace(" Projects", "").toLowerCase());
    });

    return (
        <div className="pt-32 px-4 md:px-8 min-h-screen bg-gray-50/50 dark:bg-neutral-950">

            {/* Pill Navbar */}
            <div className="flex justify-center mb-6 md:mb-12">
                <Navbar
                    links={navItems}
                    showBrand={false}
                    showAuth={false}
                />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
                {activeCategory}
            </h1>

            {/* Content Sections */}
            <div className="max-w-[85rem] mx-auto pb-20">
                {activeCategory === 'Gallery' ? (
                    <GallerySection />
                ) : loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">
                        <p>Failed to load projects. Please try again later.</p>
                        <p className="text-sm text-neutral-400 mt-2">{error}</p>
                    </div>
                ) : (
                    <>
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-12 text-neutral-500">
                                No projects found in this category.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                                {filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} className="h-full" />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Projects;
