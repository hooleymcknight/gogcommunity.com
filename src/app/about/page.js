'use client';
import '../styles/about.css';
import { useEffect } from "react";
import Eyeball from "../helpers/eyeball";
import Wisp from "../helpers/wisp";
import Navbar from "../helpers/navbar";

export default function About() {

    return (
        <>
            <Navbar />
            <div className="main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <p>about us</p>
                    <a href="/">go back</a>

                    {/* <Eyeball /> */}
                    {/* <Wisp /> */}

                </main>
            </div>
        </>
    );
}