'use client';
import Link from "next/link";
import './styles/index.css';
import { useState, useEffect } from "react";
import Orbits from "./helpers/orbits";
import Image from "next/image";
import { useSession } from "./SessionProvider";


export default function Home() {
    const session = useSession();
    const displayName = session?.user?.username;

    useEffect(() => {
        const mainMenu = document.querySelector('main');
        if (sessionStorage.getItem('intro-animation-shown') == 'true') {
            mainMenu.classList.remove('menu-hidden');
        }
        else {
            sessionStorage.setItem('intro-animation-shown', 'true');
            const video = document.querySelector('.background-video');

            video.classList.remove('video-hidden');
            video.querySelector('video').play();
            setTimeout(() => {
                mainMenu.classList.remove('menu-hidden');
                video.querySelector('video').style.opacity = 0;
            }, 6000);
        }
    }, []);

  return (
        <>
            <div className="background-video video-hidden">
                <video width="1920" height="1080" muted playsInline>
                    <source src="/gogcomm-tech-element_desktop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="fixed w-full top-0 left-0 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start menu-hidden">

                    <Link href="/portal" className="login-link fireteam-tag">
                        <Image src="/fireteam/triangle.png" alt="triangle icon" width={40} height={40} />
                        {displayName ? displayName : 'Xx_Log-In-Here_xX'}
                    </Link>

                    <Orbits />
                </main>
            </div>
        </>
    );
}
