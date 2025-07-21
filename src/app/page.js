'use client';
import Link from "next/link";
import './styles/index.css';
import { useEffect } from "react";
import Orbits from "./orbits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Home() {

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
            }, 6000);
        }
    });

  return (
    <>
        <div className="background-video video-hidden">
            <video width="1920" height="1080" muted playsInline>
                <source src="/gogcomm-tech-element_desktop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div className="fixed w-full top-0 left-0 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start menu-hidden">
                {/* <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
                />
                GoG Community

                <a href="/admin">Admin Portal</a> */}
                <Link href="/admin" className="login-link">
                    <FontAwesomeIcon icon={faUser} />
                    Admin Portal
                </Link>

                <Orbits />
            </main>
        </div>
    </>
  );
}
