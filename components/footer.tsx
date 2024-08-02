import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Image from 'next/image';

const socials = [
    { name: 'Whatsapp', icon: '/whatsapp.png', link: 'https://api.whatsapp.com/send?phone=31628547428&text=' },
    { name: 'Facebook', icon: Facebook, link: 'https://www.facebook.com/Lindasdesign79/' },
    { name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/lindasdesign79/' },
];

const Footer: React.FC = () => {
    return (
        <footer className='bg-gray-200 fixed bottom-0 left-0 min-h-10 max-h-[100px] w-full p-3 flex max-sm:flex-col max-sm:space-y-3 justify-around items-center'>
            <div className='flex flex-row space-x-5'>
                {socials.map((social, index) => (
                    <Link key={index} href={social.link} className={navigationMenuTriggerStyle() + ' bg-transparent hover:bg-gray-300'}>
                        {typeof social.icon === 'string' ? (
                            <Image src={social.icon} alt={social.name} width={24} height={24} />
                        ) : (
                            <>
                                <social.icon size={24} />
                                <p className='sr-only'>{social.name}</p>
                            </>
                        )}
                    </Link>
                ))}
            </div>
            <div>
                <p>© 2024 Linda&apos;s Design</p>
            </div>
        </footer>
    );
};

export default Footer;