
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/ui/mini-navbar";
import { ProjectCard } from "@/components/ui/project-card";
import { useProjects } from "@/hooks/use-projects";
import { useGallery } from "@/hooks/use-gallery";
import { ContainerScroll, ContainerSticky, GalleryContainer, GalleryCol } from "@/components/ui/animated-gallery";

const GallerySection = () => {
    const { gallery, loading, error } = useGallery();

    if (loading) return <div className="text-center py-20 text-white">Loading gallery...</div>;
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

    // Split images into 3 columns
    const chunk1 = allImages.filter((_, i) => i % 3 === 0);
    const chunk2 = allImages.filter((_, i) => i % 3 === 1);
    const chunk3 = allImages.filter((_, i) => i % 3 === 2);

    return (
        <ContainerScroll className="relative h-[200vh] w-full">
            <ContainerSticky className="h-[80vh] w-full">
                <GalleryContainer className="w-full">
                    <GalleryCol yRange={["-20%", "0%"]} className="-mt-2">
                        {chunk1.map((img, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                                <img
                                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={`https://eks-projectmanager.eksconstruction.in/${img.url}`}
                                    alt={img.heading}
                                />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p className="text-white font-bold text-lg md:text-xl text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.heading}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </GalleryCol>
                    <GalleryCol className="mt-[-20%]" yRange={["10%", "-10%"]}>
                        {chunk2.map((img, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                                <img
                                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={`https://eks-projectmanager.eksconstruction.in/${img.url}`}
                                    alt={img.heading}
                                />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p className="text-white font-bold text-lg md:text-xl text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.heading}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </GalleryCol>
                    <GalleryCol yRange={["-20%", "0%"]} className="-mt-2">
                        {chunk3.map((img, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                                <img
                                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={`https://eks-projectmanager.eksconstruction.in/${img.url}`}
                                    alt={img.heading}
                                />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p className="text-white font-bold text-lg md:text-xl text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.heading}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </GalleryCol>
                </GalleryContainer>
            </ContainerSticky>
        </ContainerScroll>
    );
};

const Projects = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "Completed Projects";
    const { projects, loading, error } = useProjects();

    const navItems = [
        { label: "Completed projects", href: "/projects?category=Completed Projects" },
        { label: "Ongoing projects", href: "/projects?category=Ongoing Projects" },
        { label: "Upcoming projects", href: "/projects?category=Upcoming Projects" },
        { label: "Our gallery", href: "/projects?category=Gallery" },
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
