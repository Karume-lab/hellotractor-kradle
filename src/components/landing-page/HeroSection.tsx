'use client';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import LinkAsButton from '../core/LinkAsButton';
import { urls } from '@/lib/urls';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="flex items-center justify-center h-screen flex-col ">
            {/* <TypeAnimation
                sequence={[
                    'Farm solutions made accessible: Second Hand Tractors',
                    2000,
                    'Farm solutions made accessible: Dealers',
                    2000,
                    'Farm solutions made accessible: Tractor Operators',
                    2000,
                    'Farm solutions made accessible: Equipment',
                    2000,
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={60}
                style={{height: '500px', display: 'inline-block' }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-clip-text bg-red-700"
                // repeat={Infinity}
            /> */}

            {/* <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-clip-text bg-red-700">Farm solutions made easy and accessible </p> */}
            {/* <p>hello tractor offers you a wide market place for your goods and items </p> */}

            <div className="relative  py-32 sm:py-40">
                <div className="absolute inset-x-0 bottom-0 h-1/2 " />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold tracking-tight sm:text-6xl"
                        >
                            Discover the Best Deals on Second-Hand Tractors
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto mt-6 max-w-2xl text-lg leading-8 "
                        >
                            Browse our extensive collection of top-quality second-hand tractors and attachments. Find the perfect equipment for your farm at unbeatable prices.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-10 flex items-center justify-center gap-x-6"
                        >
                            
                            <SearchBar />
                            <LinkAsButton
                                text="Sell your Tractor"
                                redirectTo={urls.AUTH}   
                                icon={<ArrowRight />}
                            />
                            
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeroSection
