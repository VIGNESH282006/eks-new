"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AnimatedNavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) => {
    const defaultTextColor = isActive ? 'text-white' : 'text-gray-100'; // Brighter text
    const hoverTextColor = 'text-white';
    const textSizeClass = 'text-base font-bold'; // Bold font

    return (
        <Link to={href} className={`group relative block overflow-hidden h-6 ${textSizeClass}`}> {/* Removed flex items-center, changed inline-block to block (or inline-block is fine, but flex was the issue) */}
            <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2 whitespace-nowrap">
                <span className={`${defaultTextColor} h-6 flex items-center`}>{children}</span>
                <span className={`${hoverTextColor} h-6 flex items-center`}>{children}</span>
            </div>
        </Link>
    );
};

interface NavbarProps {
    links?: { label: string; href: string }[];
    showBrand?: boolean;
    showAuth?: boolean;
}

export function Navbar({ links, showBrand = true, showAuth = true }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
    const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);



    useEffect(() => {
        if (shapeTimeoutRef.current) {
            clearTimeout(shapeTimeoutRef.current);
        }

        if (isOpen) {
            setHeaderShapeClass('rounded-xl');
        } else {
            shapeTimeoutRef.current = setTimeout(() => {
                setHeaderShapeClass('rounded-full');
            }, 300);
        }

        return () => {
            if (shapeTimeoutRef.current) {
                clearTimeout(shapeTimeoutRef.current);
            }
        };
    }, [isOpen]);

    const logoElement = (
        <div className="relative w-5 h-5 flex items-center justify-center">
            <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
        </div>
    );

    const navLinksData = links || [
        { label: 'Manifesto', href: '#1' },
        { label: 'Careers', href: '#2' },
        { label: 'Discover', href: '#3' },
    ];

    const location = useLocation();

    const loginButtonElement = (
        <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
            LogIn
        </button>
    );

    const signupButtonElement = (
        <div className="relative group w-full sm:w-auto">
            <div className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-gray-100
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
            <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto">
                Signup
            </button>
        </div>
    );

    return (
        <header className={`relative z-20 flex flex-col items-center
                       pl-10 pr-10 py-5 backdrop-blur-md
                       ${headerShapeClass}
                       border border-[#333] bg-black/80
                       w-fit min-w-[600px]
                       transition-[border-radius] duration-0 ease-in-out shadow-2xl`}>

            <div className="flex items-center justify-between gap-x-12 sm:gap-x-16 w-full px-4">
                {showBrand && (
                    <div className="flex items-center">
                        {logoElement}
                    </div>
                )}

                <nav className="flex items-center space-x-8 sm:space-x-12 w-full justify-center">
                    {navLinksData.map((link) => (
                        <AnimatedNavLink key={link.href} href={link.href} isActive={location.search.includes(link.href.split('?')[1] || '')}>
                            {link.label}
                        </AnimatedNavLink>
                    ))}
                </nav>

                {showAuth && (
                    <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                        {loginButtonElement}
                        {signupButtonElement}
                    </div>
                )}

                {/* Mobile Toggle - Hide if no auth and simple links, or keep? Keeping simplified for now since 'pill' implies simple nav. */}
            </div>
        </header>
    );
}
