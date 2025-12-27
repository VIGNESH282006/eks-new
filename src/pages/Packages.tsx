

const Packages = () => {
    return (
        <div className="pt-32 px-8 min-h-screen bg-white text-center">
            <h1 className="text-5xl font-bold text-primary mb-8">Packages</h1>
            <p className="text-xl text-gray-600 mb-12">Choose the best package for your needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {['Basic', 'Premium', 'Luxury'].map((pkg) => (
                    <div key={pkg} className="border-2 border-primary/10 rounded-xl p-8 hover:border-primary-red transition-colors">
                        <h3 className="text-3xl font-bold text-primary mb-4">{pkg}</h3>
                        <div className="text-4xl font-bold text-gray-800 mb-6">$XXX <span className="text-base font-normal text-gray-500">/ sqft</span></div>
                        <ul className="text-left space-y-3 mb-8 text-gray-600">
                            <li>✓ Feature One</li>
                            <li>✓ Feature Two</li>
                            <li>✓ Feature Three</li>
                        </ul>
                        <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 w-full">Select Plan</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
