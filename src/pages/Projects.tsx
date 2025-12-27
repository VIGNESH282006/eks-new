

const Projects = () => {
    return (
        <div className="pt-32 px-8 min-h-screen bg-white text-center">
            <h1 className="text-5xl font-bold text-primary mb-8">Our Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl aspect-video bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">Project Image {i}</div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xl font-bold">View Project</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
