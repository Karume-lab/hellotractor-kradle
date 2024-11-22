'use client';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

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
                
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-clip-text bg-red-700">Farm solutions made easy and accessible </p>
            <p>hello tractor offers you a wide market place for your goods and items </p>
        </div>

    )
}

export default HeroSection
