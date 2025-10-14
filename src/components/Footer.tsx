import Link from "next/link";
import {FacebookIcon, InstagramIcon, MessageCircle, Phone} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full text-center text-sm text-gray-500 p-0 sm:p-4 bg-gray-100">
            <div className={'flex flex-col gap-y-1 items-center justify-around sm:flex-row sm:gap-y-4'}>
                {/* Socials */}
                <div className={'flex flex-row items-center justify-center gap-x-4 scale-50 sm:scale-100'}>
                    <Link href={'https://api.whatsapp.com/send?phone=31628547428&text='} target={'_blank'} rel={'noopener noreferrer'} className={'relative hover:cursor-pointer'}>
                        <MessageCircle className={"w-6 h-6 text-green-500 hover:text-green-600"} fill={'var(--color-green-500)'} />
                        {/* Inside message circle add a phone icon */}
                        <Phone className={'w-3 h-3 absolute top-1/2 left-1/2 transform -translate-1/2 text-transparent'} fill={'var(--color-white)'} />
                    </Link>
                    <Link href={'https://www.facebook.com/Lindasdesign79/'} target={'_blank'} rel={'noopener noreferrer'} className={'relative hover:cursor-pointer'}>
                        <FacebookIcon className="w-6 h-6 text-blue-600 hover:text-blue-700" />
                    </Link>
                    <Link href={'https://www.instagram.com/lindasdesign79/'} target={'_blank'} rel={'noopener noreferrer'} className={'relative hover:cursor-pointer'}>
                        <InstagramIcon className="w-6 h-6 text-pink-500 hover:text-pink-600" />
                    </Link>
                </div>

                {/* Copyright + Watermark */}
                <div className={'flex flex-col items-center justify-center gap-x-4 scale-50 sm:scale-100'}>
                    <p>© {new Date().getFullYear()} Lindas-Design. All rights reserved.</p>
                    <Link href={'mailto:info@raeveira.nl'} className="text-xs text-gray-400">Created by <span className={'font-bold'}>Dylan</span></Link>
                </div>
            </div>
        </footer>
    )
}