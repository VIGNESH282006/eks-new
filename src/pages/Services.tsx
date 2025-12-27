

const Services = () => {
    return (
        <div className="pt-32 px-8 min-h-screen bg-white">
            <h1 className="text-5xl font-bold text-primary mb-8 text-center">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Placeholders */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
                            Service Image Placeholder
                        </div>
                        <h3 className="text-2xl font-semibold text-primary-red mb-2">Service {i}</h3>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
