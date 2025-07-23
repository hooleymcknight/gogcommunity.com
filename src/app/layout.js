// 'use client';
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SessionProvider from "./SessionProvider";

const metadata = {
  title: "GoG Community",
  description: "An online community of gamers.",
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(options);

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
            </head>
            <body
                className={`antialiased`}
            >
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
