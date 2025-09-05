'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Hero as HeroType } from '@/types/strapi';

interface HeroProps {
    hero: HeroType;
}

export default function Hero({ hero }: HeroProps) {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">{hero.heading}</span>
                            </h1>
                            {hero.text && (
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    {hero.text}
                                </p>
                            )}
                            {hero.link && (
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href={hero.link.href}
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                            {...(hero.link.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                                        >
                                            {hero.link.label}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {hero.image && (
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <Image
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src={`http://localhost:1337${hero.image.url}`}
                        alt={hero.image.alternativeText || hero.heading}
                        width={800}
                        height={600}
                        priority
                    />
                </div>
            )}
        </div>
    );
}
