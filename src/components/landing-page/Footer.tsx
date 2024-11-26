// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className=" bg-gradient-to-b from-[#2f1c54] to-[#1a0f30] text-white py-8 flex flex-col ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-evenly">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Hello Tractor</h3>
          <p className="text-gray-400 mb-4 w-1/2">
            Hello Tractor is a platform that connects farmers with tractor owners and tractor operators. We offer a wide selection of second-hand tractors, attachments, and other agricultural equipment at competitive prices.
          </p>
          <p className="text-gray-400">&copy; 2024 Hello Tractor. All rights reserved.</p>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tractors" className="text-gray-400 hover:text-gray-300">
                   Tractors
                </Link>
              </li>
              <li>
                <Link href="/attachments" className="text-gray-400 hover:text-gray-300">
                   Attachments
                </Link>
              </li>
              <li>
                <Link href="/operators" className="text-gray-400 hover:text-gray-300">
                   Operators
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-gray-400 hover:text-gray-300">
                   Dealers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 w-fit">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gray-300">
                   Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-gray-300">
                   FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gray-300" >
                   Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-gray-300" >
                   Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
