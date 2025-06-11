// app/layout.js
import './globals.css'; // Your existing Tailwind CSS
import 'leaflet/dist/leaflet.css'; // Add this line for Leaflet styles

// Import fonts (already done in your component, but if you want global font classes for all components)
import { Manrope, Noto_Sans } from 'next/font/google';

const manrope = Manrope({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSans = Noto_Sans({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${notoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}