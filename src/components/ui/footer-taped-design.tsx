import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Link component that scrolls to top on navigation
const ScrollToTopLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(to), 300);
    };

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="-mt-32 mb-0 w-full text-base-content">
            {/* Two mascots holding the footer card from left and right */}
            <div className="relative flex justify-between items-end -mb-16 -bottom-1 z-20 w-full max-w-[95%] mx-auto px-4 pointer-events-none">
                <img
                    src="/mascot-left.png"
                    alt="EKS Mascot Left"
                    className="w-52 md:w-48 h-auto object-contain drop-shadow-xl -ml-12"
                />
                <img
                    src="/mascot-right.png"
                    alt="EKS Mascot Right"
                    className="w-52 md:w-48 h-auto object-contain drop-shadow-xl -mr-8"
                />
            </div>

            <div className="relative bg-gradient-to-br from-slate-900 via-[#082E6D] to-slate-800 w-full px-10 py-8 flex flex-col gap-6 shadow-lg overflow-hidden">
                {/* Animated EKS CONSTRUCTION Marquee Watermark */}
                <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    >
                        <span className="text-[120px] md:text-[200px] font-black text-white/[0.04] tracking-tight select-none">
                            eks construction&emsp;&emsp;
                        </span>
                        <span className="text-[120px] md:text-[200px] font-black text-white/[0.04] tracking-tight select-none">
                            eks construction&emsp;&emsp;
                        </span>
                        <span className="text-[120px] md:text-[200px] font-black text-white/[0.04] tracking-tight select-none">
                            eks construction&emsp;&emsp;
                        </span>
                        <span className="text-[120px] md:text-[200px] font-black text-white/[0.04] tracking-tight select-none">
                            eks construction&emsp;&emsp;
                        </span>
                    </motion.div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 px-2 md:px-8 w-full">
                    {/* Logo and Description */}
                    <div className='flex flex-col items-center md:items-start gap-3 md:w-1/3'>
                        <ScrollToTopLink
                            to="/"
                            className="flex flex-row gap-1 items-center justify-start"
                        >
                            <img
                                src="/logo.png"
                                alt="EKS Construction Logo"
                                className="h-32 w-auto object-contain -mt-4"
                            />
                        </ScrollToTopLink>
                        <p className='text-white/60 font-medium text-base w-full md:w-4/5 text-center md:text-left'>
                            Building your dreams with precision and passion. Quality construction services for residential and commercial projects.
                        </p>
                    </div>

                    {/* Quick Links and Contact - side by side */}
                    <div className='flex flex-row gap-8 md:gap-12 items-start justify-between flex-1'>
                        {/* Quick Links */}
                        <div className='flex flex-col gap-2'>
                            <h4 className='uppercase font-display text-md text-white/40 font-semibold'>Quick Links</h4>
                            <div className="flex flex-col gap-1.5 text-sm text-white items-start">
                                <ScrollToTopLink className='text-white/60 whitespace-nowrap font-medium hover:text-white transition-colors' to="/">Home</ScrollToTopLink>
                                <ScrollToTopLink className='text-white/60 whitespace-nowrap font-medium hover:text-white transition-colors' to="/services">Services</ScrollToTopLink>
                                <ScrollToTopLink className='text-white/60 whitespace-nowrap font-medium hover:text-white transition-colors' to="/packages">Packages</ScrollToTopLink>
                                <ScrollToTopLink className='text-white/60 whitespace-nowrap font-medium hover:text-white transition-colors' to="/projects">Our Projects</ScrollToTopLink>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className='flex flex-col gap-2 md:ml-32'>
                            <h4 className='uppercase whitespace-nowrap font-display text-md text-white/40 font-semibold'>Contact</h4>
                            <div className="flex flex-col gap-1.5 text-sm text-white items-start">
                                <a href="mailto:eksconstruction30@gmail.com" className='text-white/60 font-medium flex items-center gap-2 hover:text-white transition-colors'>
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> eksconstruction30@gmail.com
                                </a>
                                <a href="tel:+918148353564" className='text-white/60 font-medium flex items-center gap-2 hover:text-white transition-colors'>
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg> +91 8148353564
                                </a>
                            </div>
                        </div>

                        {/* Desktop only: Find Us */}
                        <div className='hidden md:flex flex-col gap-4 ml-auto'>
                            <div className='flex flex-col gap-2'>
                                <h4 className='uppercase whitespace-nowrap font-display text-md text-white/40 font-semibold'>Find Us</h4>
                                <div className="flex flex-col gap-1 text-sm text-white items-start">
                                    <span className='text-white/60 font-medium flex items-start gap-2'>
                                        <svg className="w-4 h-4 fill-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg> No.4, 1st Floor, N.M.Road, Avadi, Chennai - 54
                                    </span>
                                    <span className='text-white/60 font-medium'>
                                        <strong className="text-white/80">Hours:</strong> Mon–Sat: 10AM–6PM | Sun: 11AM–6PM
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h4 className='uppercase whitespace-nowrap font-display text-md text-white/40 font-semibold'>Social Links</h4>
                                <div className="flex gap-3 items-center">
                                    <a href="https://facebook.com/" target="_blank" rel="nofollow noopener" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </a>
                                    <a href="https://instagram.com/" target="_blank" rel="nofollow noopener" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a href="https://youtube.com/" target="_blank" rel="nofollow noopener" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile only: Find Us and Hours */}
                <div className='flex md:hidden flex-col gap-4 w-full relative z-10 px-2'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='uppercase whitespace-nowrap font-display text-md text-white/40 font-semibold'>Find Us</h4>
                        <span className='text-white/60 font-medium text-sm flex items-start gap-2'>
                            <svg className="w-4 h-4 fill-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg> No.4, 1st Floor, N.M.Road, Avadi, Chennai - 54
                        </span>
                        <span className='text-white/60 font-medium text-sm'>
                            <strong className="text-white/80">Hours:</strong> Mon–Sat: 10AM–6PM | Sun: 11AM–6PM
                        </span>
                    </div>
                </div>

                {/* Mobile only: Social Links */}
                <div className='flex md:hidden flex-col gap-4 w-full relative z-10 px-2'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='uppercase whitespace-nowrap font-display text-md text-white/40 font-semibold'>Social Links</h4>
                        <div className="flex gap-3 items-center">
                            <a href="https://facebook.com/" target="_blank" rel="nofollow noopener" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="nofollow noopener" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="nofollow noopener" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative z-10 w-full h-px bg-white/10"></div>

                {/* Bottom section */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white px-2 md:px-8">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start sm:items-center">
                        <p className="whitespace-nowrap text-white/60">
                            ©{currentYear} EKS Construction. All rights reserved.
                        </p>
                        <div className="flex flex-row gap-4">
                            <ScrollToTopLink to="/contact" className="text-white/60 hover:text-white transition-colors">Contact Us</ScrollToTopLink>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-white/60 font-medium">Designed By</span>
                        <a
                            href="https://caarapace.com/"
                            target="_blank"
                            rel="nofollow noopener"
                            className="flex items-center gap-2 text-white font-medium hover:text-[#C11336] transition-colors"
                        >
                            <img
                                src="/caarapace-logo.png"
                                alt="Caarapace Logo"
                                className="w-8 h-8 object-contain"
                            />
                            Caarapace
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
