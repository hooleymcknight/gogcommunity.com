'use client';
import '../styles/about.css';
import { useEffect } from "react";

export default function Wisp({ currentPos, base, events, contact, about }) {
    const coordinateSets = [base, events, contact, about];
    let coordSet = coordinateSets[currentPos];

    return (
        <>
            <div className="wisp-container" style={{ left: coordSet[0], bottom: coordSet[1] }}>
                <div className="wisp"></div>
            </div>
        </>
    );
}