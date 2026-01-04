"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AnimatedNavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) => {
    const defaultTextColor = isActive ? 'text-black' : 'text-gray-500'; // Darker text for white bg
    const hoverTextColor = 'text-black';
    const textSizeClass = 'text-base font-bold'; // Bold font

    return (
        <Link
            to={href}
            className={`
                group relative px-3 py-1.5 rounded-[1.25rem] transition-all duration-300 ease-out
                ${isActive
                    ? 'bg-gray-200/40 backdrop-blur-md shadow-inner border border-white/50'
                    : 'hover:bg-gray-100/30'
                }
            `}
        >
            <div className={`overflow-hidden h-6 ${textSizeClass}`}>
                <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2 whitespace-nowrap">
                    <span className={`${defaultTextColor} h-6 flex items-center justify-center`}>{children}</span>
                    <span className={`${hoverTextColor} h-6 flex items-center justify-center`}>{children}</span>
                </div>
            </div>
        </Link>
    );
};

interface NavbarProps {
    links?: { label: string; href: string; isActive?: boolean }[];
    showBrand?: boolean;
    showAuth?: boolean;
}

export function Navbar({ links, showBrand = true, showAuth = true }: NavbarProps) {
    const [isOpen, _setIsOpen] = useState(false);
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
            <span className="absolute w-1.5 h-1.5 rounded-full bg-black top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-black left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-black right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-black bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
        </div>
    );

    const navLinksData = links || [
        { label: 'Manifesto', href: '#1' },
        { label: 'Careers', href: '#2' },
        { label: 'Discover', href: '#3' },
    ];

    const location = useLocation();

    const loginButtonElement = (
        <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-gray-200 bg-gray-50 text-gray-700 rounded-full hover:border-gray-400 hover:text-black transition-colors duration-200 w-full sm:w-auto">
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
                       px-6 md:px-14 py-6 md:py-6 backdrop-blur-md
                       rounded-[2rem] lg:rounded-full
                       border border-gray-200 bg-white/90
                       w-fit max-w-[95%] lg:w-fit lg:min-w-0 mx-auto
                       transition-all duration-300 ease-in-out shadow-lg`}>

            <div className="flex items-center justify-between gap-x-4 md:gap-x-12 sm:gap-x-16 w-full md:px-4">
                {showBrand && (
                    <div className="flex items-center flex-shrink-0">
                        {logoElement}
                    </div>
                )}

                <nav className="grid grid-cols-2 gap-x-6 gap-y-3 w-full justify-items-center lg:flex lg:items-center lg:space-x-8 lg:w-auto lg:justify-center">
                    {navLinksData.map((link) => (
                        <AnimatedNavLink
                            key={link.href}
                            href={link.href}
                            isActive={link.isActive ?? (location.search.includes(link.href.split('?')[1] || '') && link.href.includes('?'))}
                        >
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
            </div>
        </header>
    );
}
