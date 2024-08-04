'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { GlobeIcon, ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { language } from '@/lib/data/language';

const Navigation: React.FC = () => {
    const [languageData, setLanguageData] = React.useState(language.dutch);
    const [languageName, setLanguageName] = React.useState('dutch');
    const [isMobile, setIsMobile] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        const storedLanguage =
            localStorage.getItem('language') === 'english'
                ? language.english
                : language.dutch;
        setLanguageName(
            localStorage.getItem('language') === 'english' ? 'english' : 'dutch'
        );
        setLanguageData(storedLanguage);
    }, []);

    React.useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
        };

        handleRouteChange();
    }, [pathname]);

    const changeLanguage = ({ lang }: { lang: string }) => {
        localStorage.setItem('language', lang);
        setLanguageName(lang);
        location.reload();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <NavigationMenu className='min-w-full min-h-10 bg-gray-100 p-2 fixed'>
            {isMobile ? (
                <>
                    <div className='flex justify-around items-center p-2 w-full'>
                        <Image
                            src={
                                languageData.navigation_data.find(
                                    (item) => item.type === 'image'
                                )?.src || ''
                            }
                            alt=''
                            width={150}
                            height={0}
                            className='h-auto'
                        />
                        <Button variant={'ghost'} onClick={toggleMenu} className='p-2'>
                            <MenuIcon size={24} />
                        </Button>
                    </div>
                    <div
                        className={`fixed top-0 left-0 w-full h-full bg-gray-100 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className='flex flex-col items-center justify-start pt-16 h-full space-y-6 p-4 relative'>
                            <Button variant={'ghost'} onClick={toggleMenu} className='p-2 absolute top-5 right-5'>
                                <XIcon size={24} />
                            </Button>
                            <NavigationMenuList className='flex flex-col space-y-2'>
                                {languageData.navigation_data.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className={`${item.link ? 'relative' : ''}`}
                                    >
                                        {!item.link && item.type !== 'image' ? (
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href || ''}
                                                    className={
                                                        navigationMenuTriggerStyle() +
                                                        ' bg-transparent hover:bg-gray-200'
                                                    }
                                                >
                                                    {item.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        ) : (
                                            <>
                                                {item.link && item.type !== 'image' && (
                                                    <>
                                                        <NavigationMenuTrigger className='bg-transparent'>
                                                            {item.title}
                                                        </NavigationMenuTrigger>
                                                        <NavigationMenuContent className='flex flex-col px-3 py-6 space-y-3 min-w-max bg-gray-100'>
                                                            {item.link?.map((link, index) => (
                                                                <NavigationMenuLink key={index} asChild>
                                                                    <Link
                                                                        href={link.href}
                                                                        className={
                                                                            navigationMenuTriggerStyle() +
                                                                            ' bg-transparent hover:bg-gray-200'
                                                                        }
                                                                    >
                                                                        {link.title}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </NavigationMenuContent>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                            <div className='absolute top-0 left-5'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant='outline' className='flex items-center gap-2'>
                                            <GlobeIcon className='h-5 w-5' />
                                            <span className='capitalize'>
                                                {languageName === 'dutch' ? 'Nederlands' : 'English'}
                                            </span>
                                            <ChevronDownIcon className='h-4 w-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className='w-48'>
                                        <DropdownMenuLabel>
                                            {languageName === 'dutch'
                                                ? 'Selecteer Taal'
                                                : 'Select Language'}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={languageName}>
                                            <DropdownMenuRadioItem
                                                value='dutch'
                                                onClick={() => changeLanguage({ lang: 'dutch' })}
                                            >
                                                {languageName === 'dutch' ? 'Nederlands' : 'Dutch'}
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value='english'
                                                onClick={() => changeLanguage({ lang: 'english' })}
                                            >
                                                {languageName === 'dutch' ? 'Engels' : 'English'}
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <NavigationMenuList className='flex items-center space-x-12'>
                        {languageData.navigation_data.map((item, index) => (
                            <NavigationMenuItem
                                key={index}
                                className={`${item.link ? 'relative' : ''}`}
                            >
                                {!item.link && item.type !== 'image' ? (
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href || ''}
                                            className={
                                                navigationMenuTriggerStyle() +
                                                ' bg-transparent hover:bg-gray-200'
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                    </NavigationMenuLink>
                                ) : (
                                    <>
                                        {item.link && item.type !== 'image' && (
                                            <>
                                                <NavigationMenuTrigger className='bg-transparent'>
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className='flex flex-col px-3 py-6 space-y-3 min-w-max bg-gray-100'>
                                                    {item.link?.map((link, index) => (
                                                        <NavigationMenuLink key={index} asChild>
                                                            <Link
                                                                href={link.href}
                                                                className={
                                                                    navigationMenuTriggerStyle() +
                                                                    ' bg-transparent hover:bg-gray-200'
                                                                }
                                                            >
                                                                {link.title}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </NavigationMenuContent>
                                            </>
                                        )}
                                    </>
                                )}
                                {item.src && (
                                    <Image
                                        src={item.src}
                                        alt={item.alt?.toString() || ''}
                                        width={150}
                                        height={0}
                                        sizes='100vw'
                                        style={{ width: '150px', height: 'auto' }}
                                        priority
                                    />
                                )}
                                {item.link && <NavigationMenuViewport />}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </>
            )}
            {!isMobile && (
                <div className='absolute right-3 top-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='flex items-center gap-2'>
                                <GlobeIcon className='h-5 w-5' />
                                <span className='capitalize'>
                                    {languageName === 'dutch' ? 'Nederlands' : 'English'}
                                </span>
                                <ChevronDownIcon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-48'>
                            <DropdownMenuLabel>
                                {languageName === 'dutch'
                                    ? 'Selecteer Taal'
                                    : 'Select Language'}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={languageName}>
                                <DropdownMenuRadioItem
                                    value='dutch'
                                    onClick={() => changeLanguage({ lang: 'dutch' })}
                                >
                                    {languageName === 'dutch' ? 'Nederlands' : 'Dutch'}
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='english'
                                    onClick={() => changeLanguage({ lang: 'english' })}
                                >
                                    {languageName === 'dutch' ? 'Engels' : 'English'}
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </NavigationMenu>
    );
};

export default Navigation;
