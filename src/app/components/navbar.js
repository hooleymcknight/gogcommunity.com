'use client';
import '../styles/about.css';
import Link from 'next/link';
import Image from 'next/image';
import NavbarWisps from './navbarWisps';

export default function Navbar() {

    return (
        <div className="navbar">
            <Link href="/" className="homepage-logo">
                <Image src="/GoG-logo.svg" alt="GoG Community logo" width={180} height={38} />
            </Link>

            <div className="navbar-buttons">
                <Link href="/events">Events</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/about">About</Link>

                <NavbarWisps />
            </div>
        </div>
    );
}