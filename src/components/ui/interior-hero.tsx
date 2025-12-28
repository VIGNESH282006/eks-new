import { MoveRight } from "lucide-react";

export function InteriorHero() {
    return (
        <section className="min-h-[80vh] flex items-center py-32 px-8 bg-[#284370] text-white relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10 text-center">
                {/* Label */}
                <span className="block text-xs font-medium tracking-[0.2em] text-blue-200 mb-8 uppercase">
                    Interior Design Agency
                </span>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-12 max-w-5xl mx-auto text-white">
                    Why Choose <span className="text-[#ef4444] italic font-serif">eks</span> <span className="text-blue-300 italic font-serif">construction</span><br />
                    for Interior Design?
                </h1>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button className="inline-flex items-center gap-2.5 px-7 py-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold tracking-wider rounded-full transition-all duration-300 transform hover:-translate-y-0.5 group shadow-lg shadow-orange-600/20">
                        LET'S TALK
                        <MoveRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <button className="inline-flex items-center gap-2.5 px-7 py-4 bg-transparent border border-blue-300/30 hover:bg-white/10 text-white text-xs font-semibold tracking-wider rounded-full transition-all duration-300 transform hover:-translate-y-0.5 group">
                        VIEW OUR PROJECTS
                        <MoveRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                </div>

                {/* Subhead */}
                <p className="text-lg text-blue-100 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                    Your home is more than just a space—it's a reflection of who you are. We create timeless spaces that evolve with you and your lifestyle.
                </p>

                {/* Tagline */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-blue-200/60 font-medium tracking-wide uppercase">
                    <span>Form Follows Function</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Sustainable Choices</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Personal Expression</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Timeless Appeal</span>
                </div>
            </div>

            {/* Ambient Background Gradient - Dark Blue Version */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-[#284370]/50 to-[#284370] pointer-events-none" />
        </section>
    );
}
