import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export const ContactSection = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        alert("Thanks for reaching out! We'll build something great together. 🏗️");
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-zinc-950">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                    alt="Construction Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Hero Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                        Let's build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">something</span> <br />
                        amazing <br />
                        together!
                    </h1>
                    <p className="text-xl text-zinc-300 max-w-lg font-light leading-relaxed">
                        From dream homes to iconic skylines, we turn your vision into concrete reality.
                    </p>
                </motion.div>

                {/* Right Side: Dark Form Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-zinc-950/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Reach out to us today! ✨</h2>
                        <div className="mb-8">
                            <p className="text-zinc-400 text-sm mb-1">Mail us at</p>
                            <a href="mailto:info@eksconstruction.in" className="text-white font-medium hover:text-orange-400 transition-colors">info@eksconstruction.in</a>

                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Follow Us</span>
                                <div className="flex gap-2">
                                    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                                        <a key={i} href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all">
                                            <Icon size={14} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Your Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-12 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Briefly describe your project idea...</label>
                                <Textarea
                                    placeholder="I want to build a..."
                                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all min-h-[100px] rounded-xl resize-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-500 uppercase">I'm looking for...</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Residential', 'Commercial', 'Interior Design', 'Renovation', 'Architecture', 'Other'].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <Checkbox id={item} className="border-zinc-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                            <Label htmlFor={item} className="text-zinc-300 text-sm cursor-pointer">{item}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold text-lg rounded-xl mt-4 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                            >
                                Send a message
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
