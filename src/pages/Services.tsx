import { ServiceCard } from "@/components/ui/service-card";
import WhatWeOfferSection from "@/components/ui/what-we-offer-section";
import TimelineSection from "@/components/ui/timeline-section";

const SERVICES = [
    {
        title: "Residential Construction",
        description: "Custom home construction with modern designs and quality materials that bring happiness to your family.",
        features: ["Custom Home Design", "Quality Materials", "Modern Architecture", "Timely Delivery"],
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        href: "/packages",
        themeColor: "210 60% 25%",
    },
    {
        title: "Commercial Buildings",
        description: "Professional commercial construction for offices and retail spaces with cutting-edge functionality.",
        features: ["Office Buildings", "Retail Spaces", "Industrial Projects", "Modern Facilities"],
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        href: "/packages",
        themeColor: "250 50% 30%",
    },
    {
        title: "Interior Design",
        description: "Complete interior design solutions that reflect your style and personality perfectly.",
        features: ["Space Planning", "Color Coordination", "Furniture Selection", "Lighting Design"],
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        href: "/packages",
        themeColor: "340 60% 35%",
    },
    {
        title: "Architectural Planning",
        description: "Comprehensive architectural planning and design services for all building types.",
        features: ["3D Modeling", "Structural Design", "Planning Permission", "Technical Drawings"],
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop",
        href: "/packages",
        themeColor: "30 70% 35%",
    },
    {
        title: "Project Management",
        description: "End-to-end project management ensuring timely completion and quality assurance.",
        features: ["Timeline Management", "Budget Control", "Quality Assurance", "Progress Monitoring"],
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        href: "/packages",
        themeColor: "150 50% 25%",
    },
    {
        title: "Renovation & Remodeling",
        description: "Transform existing spaces into modern, functional areas that enhance your lifestyle.",
        features: ["Kitchen Remodeling", "Bathroom Renovation", "Home Extensions", "Space Optimization"],
        imageUrl: "/renovation-remodeling.png",
        href: "/packages",
        themeColor: "200 60% 30%",
    },
];

const Services = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Services Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-[#C11336] font-semibold tracking-wider uppercase text-sm">What We Offer</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#082E6D] mt-4 mb-6">
                            Our Premium Services
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            From concept to completion, we provide comprehensive construction services tailored to your unique vision and requirements.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {SERVICES.map((service, index) => (
                            <div key={index} className="h-[450px]">
                                <ServiceCard
                                    imageUrl={service.imageUrl}
                                    title={service.title}
                                    description={service.description}
                                    features={service.features}
                                    href={service.href}
                                    themeColor={service.themeColor}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer Section */}
            <WhatWeOfferSection />

            {/* Construction Process Section */}
            <TimelineSection />

            {/* CTA Section */}
            <section className="py-20 px-4 bg-[#082E6D]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can bring your vision to life. Contact us today for a free consultation and quote.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-[#C11336] hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Get Free Quote
                        </a>
                        <a
                            href="/packages"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold transition-all duration-300"
                        >
                            View Packages
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
