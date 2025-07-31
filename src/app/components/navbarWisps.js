'use client';
import { useState, useEffect } from 'react';
import '../styles/about.css';
import Wisp from "../components/wisp";

let wispInit = false;

export default function NavbarWisps() {
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        if (!wispInit) {
            Array.from(document.querySelectorAll('.navbar-buttons a')).forEach((btn, index) => {
                btn.addEventListener('mouseover', (e) => {
                    setCurrentPosition(index + 1);
                });
                btn.addEventListener('mouseout', (e) => {
                    setCurrentPosition(0);
                });
            });
        }
    }, []);

    /**
     * wisp bases are from LEFT and then BOTTOM. not top.
     * jk, about will use RIGHT instead of left.
     */
    return (
        <>
            <Wisp currentPos={currentPosition}
                base={['0%', '0%']}
                events={['calc(23% * calc(2 / 3))', '10%']}
                contact={['calc(50% - 100px)', '10%']}
                about={['calc(50% + 23%)', '78%']}
            />

            <Wisp currentPos={currentPosition}
                base={['30%', '80%']}
                events={['calc(28% * calc(2 / 3))', '76%']}
                contact={['calc(50% - 80px)', '66%']}
                about={['calc(50% + 24%)', '5%']}
            />

            <Wisp currentPos={currentPosition}
                base={['38%', '2%']}
                events={['calc(31% * calc(2 / 3))', '88%']}
                contact={['calc(50% - 40px)', '75%']}
                about={['calc(50% + 26%)', '10%']}
            />

            <Wisp currentPos={currentPosition}
                base={['60%', '58%']}
                events={['calc(35% * calc(2 / 3))', '3%']}
                contact={['calc(50% - 20px)', '3%']}
                about={['calc(50% + 30%)', '76%']}
            />

            <Wisp currentPos={currentPosition}
                base={['73%', '88%']}
                events={['calc(38% * calc(2 / 3))', '15%']}
                contact={['calc(50% + 30px)', '76%']}
                about={['calc(50% + 31%)', '15%']}
            />

            <Wisp currentPos={currentPosition}
                base={['95%', '12%']}
                events={['calc(42% * calc(2 / 3))', '66%']}
                contact={['calc(50% + 80px)', '15%']}
                about={['calc(50% + 33%)', '66%']}
            />
        </>
    );
}