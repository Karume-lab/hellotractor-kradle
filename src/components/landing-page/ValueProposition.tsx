// components/ValueProposition.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ValueProposition: React.FC = () => {
    const features = [
        {
            title: 'Wide Selection',
            description: 'Browse our extensive collection of top-quality second-hand tractors and attachments.',
        },
        {
            title: 'Competitive Prices',
            description: 'Find the perfect equipment for your farm at unbeatable prices.',
        },
        {
            title: 'Trusted Sellers',
            description: 'Buy with confidence from verified and reliable sellers.',
        },
    ];

    return (
        <div className="bg-gray-100 py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Unmatched value, tailored just for you.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                              key={feature.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-sm"
                        >
                            <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ValueProposition;