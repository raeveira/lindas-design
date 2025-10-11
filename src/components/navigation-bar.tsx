'use client'

import type {Navigation} from '@/../generated/prisma';
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const NavigationBar = ({navigationData}: { navigationData: Navigation[] }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mid = Math.ceil(navigationData.length / 2);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <div className="fixed inset-x-0 top-0 z-50 hidden md:flex justify-center items-center bg-white/90 backdrop-blur-sm border-b border-gray-200 p-2">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-8 items-center">
                        {navigationData.slice(0, mid).map((nav, idx) => (
                            <NavigationMenuItem key={`left-${idx}`}>
                                <NavigationMenuLink asChild>
                                    <Link href={nav.link}>{nav.name}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <Image src="/logo.png" alt="Logo" width={128} height={128} priority />
                        </NavigationMenuItem>
                        {navigationData.slice(mid).map((nav, idx) => (
                            <NavigationMenuItem key={`right-${idx}`}>
                                <NavigationMenuLink asChild>
                                    <Link href={nav.link}>{nav.name}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                    <NavigationMenuIndicator />
                </NavigationMenu>
            </div>

            {/* Mobile Top Bar */}
            <div className="fixed inset-x-0 top-0 z-50 flex md:hidden items-center justify-between bg-white/90 backdrop-blur-sm border-b border-gray-200 p-2">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={128} height={128} priority />
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6 text-gray-700" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={toggleMobileMenu}
            />

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drawer Header with Logo + Close */}
                <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/">
                        <Image src="/logo.png" alt="Logo" width={128} height={128} priority />
                    </Link>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                <nav className="mt-2">
                    <ul className="flex flex-col divide-y">
                        {navigationData.map((nav, idx) => (
                            <li key={idx}>
                                <Link
                                    href={nav.link}
                                    className="block w-full py-4 px-6 text-gray-800 hover:bg-gray-100 transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    {nav.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};
