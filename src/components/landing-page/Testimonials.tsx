"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const reviews = [
    {
        name: 'John Doe',
        rating: 4.5,
        comment: 'I had a great experience buying a tractor from this platform. The process was smooth and the tractor was exactly as described.',
    },
    {
        name: 'Jane Smith',
        rating: 5,
        comment: 'Fantastic selection and unbeatable prices. I highly recommend this platform to anyone looking for high-quality second-hand agricultural equipment.',
    },
    {
        name: 'Bob Johnson',
        rating: 4,
        comment: 'The platform is user-friendly and the customer support team was very helpful. I was able to find the perfect tractor for my needs.',
    },
];

const Testimonials: React.FC = () => {
    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Don't just take our word for it.
                </h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 mr-2 flex">
                                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                    {review.rating % 1 !== 0 && (
                                        <FaStar className="text-yellow-400 opacity-50" />
                                    )}
                                </div>
                                <p className="text-gray-600 font-medium">
                                    {review.rating.toFixed(1)}
                                </p>
                            </div>
                            <p className="text-gray-700 italic">{review.comment}</p>
                            <p className="text-gray-600 font-medium mt-4">{review.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;