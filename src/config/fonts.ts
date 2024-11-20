import { Manrope, Merriweather } from 'next/font/google'

export const manrope = Manrope({
  subsets: ['latin'], // Include subsets
  weight: ['200', '300', '400', '500', '600', '700', '800'], // Regular and bold weights
  variable: '--font-manrope', // Optional: Map to a CSS variable
});

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
});
