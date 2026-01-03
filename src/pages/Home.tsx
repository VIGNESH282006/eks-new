import Hero from '@/components/ui/animated-shader-hero';
import AboutUsSection from '@/components/ui/about-us-section';
import StoryBehindSection from '@/components/ui/story-behind-section';
import ManagementSection from '@/components/ui/management-section';
import RetailPartnersSection from '@/components/ui/retail-partners-section';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Hero
                title={
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                        <span className="text-[#082E6D]">e</span>
                        <span className="text-[#C11336]">k</span>
                        <span className="text-[#082E6D]">s</span>
                        <span className="text-[#082E6D]"> construction</span>
                    </h1>
                }
                subtitle={
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-1 bg-[#C11336] mb-2 rounded-full hidden md:block opacity-80" /> {/* Decorative line similar to image */}
                        <p className="text-xl md:text-3xl font-semibold text-[#ef4444] tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            Feel the happiness in your Home
                        </p>
                        <div className="w-24 h-1 bg-[#C11336] mt-2 rounded-full hidden md:block opacity-80" />
                    </div>
                }
                buttons={{
                    primary: {
                        text: "Our Projects",
                        onClick: () => window.location.href = '/projects'
                    },
                    secondary: {
                        text: "Contact Us",
                        onClick: () => window.location.href = '/contact'
                    }
                }}
            />
            <AboutUsSection />
            <ManagementSection />
            <StoryBehindSection />
            <RetailPartnersSection />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#082E6D] mb-4">Why Choose Us</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">We don't just build structures; we build relationships. Here is what makes us the preferred choice for construction.</p>
                </div>
                <AnimatedTestimonials
                    testimonials={[
                        {
                            quote: "We respect your time. Our efficient project management ensures that we stick to the schedule and hand over your keys exactly when promised.",
                            name: "Timely Completion",
                            designation: "On-time Delivery Guaranteed",
                            src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop"
                        },
                        {
                            quote: "Our diverse team of architects and designers bring fresh, innovative ideas to the table, ensuring your space is unique, functional, and aesthetically stunning.",
                            name: "Experienced Team",
                            designation: "Experts in Design & Execution",
                            src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                        },
                        {
                            quote: "We don't compromise on quality. Our rigorous inspection process ensures every material and construction stage meets the highest industry standards.",
                            name: "Quality Construction",
                            designation: "120+ Quality Checks",
                            src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
                        },
                        {
                            quote: "Your dream home, your way. We offer fully customizable design packages to suit your specific lifestyle needs and preferences.",
                            name: "Customizable Designs",
                            designation: "Tailored to Your Vision",
                            src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        },
                        {
                            quote: "Honesty is our policy. Our quotes are comprehensive, with absolutely no surprise costs or hidden fees down the line. What we agree on is what you pay.",
                            name: "Transparent Process",
                            designation: "No Hidden Charges",
                            src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                        }
                    ]}
                    autoplay={true}
                />
            </section>
        </div>
    );
};

export default Home;
