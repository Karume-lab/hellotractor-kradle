"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTractor, FaWrench, FaUserTie, FaMapMarkedAlt } from 'react-icons/fa';

const CategorySection: React.FC = () => {
    const categories = [
        {
            name: 'Tractors',
            icon: FaTractor,
            link: '/tractors',
        },
        {
            name: 'Attachments',
            icon: FaWrench,
            link: '/attachments',
        },
        {
            name: 'Operators',
            icon: FaUserTie,
            link: '/operators',
        },
        {
            name: 'Dealers',
            icon: FaMapMarkedAlt,
            link: '/dealers',
        },
    ];

    return (

    <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                        className="bg-gradient-to-br from-gray-100 to-white rounded-lg p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transform transition-transform"
                    >
                        <div className="bg-[#f8c8d5] p-4 rounded-full mb-4">
                            <category.icon className="text-4xl text-[#f8285f]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <Link
                            className="text-[#f8285f] font-medium underline hover:text-[#f45882]"
                            href={category.link}
                        >
                            Explore
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>

    );
};

export default CategorySection;