import Hero from '@/components/ui/animated-shader-hero';
import AboutUsSection from '@/components/ui/about-us-section';
import StoryBehindSection from '@/components/ui/story-behind-section';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Hero
                title={
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
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
            <StoryBehindSection />
        </div>
    );
};

export default Home;
