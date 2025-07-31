'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../SessionProvider";

import '../styles/portal.css';
import '../styles/listEvents.css';
import AccountInfo from "./components/accountInfo";
import EditEvents from "./components/editEvents";

const portalTabs = ['Account', 'Events'];

export default function Portal() {
    const [activeTab, setActiveTab] = useState(portalTabs[0]);
    const session = useSession().sessionData;

    return (
        <div className="portal main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Link href="/" className="homepage-logo">
                <Image src="/GoG-logo.svg" alt="GoG Community logo" width={180} height={38} />
            </Link>
            <a className="sign-out" href="/api/auth/signout?callbackUrl=%2F">Sign out</a>
            <main className="portal flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1>GoG Community {session.user.type === 'admin' ? 'Admin' : 'User'} Portal</h1>
                <div className="fireteam-tag">
                    <Image src="/fireteam/triangle.png" alt="triangle icon" width={40} height={40} />
                    {session.user.username}
                </div>

                <div className="portal-sidebar">
                    {
                        portalTabs.map(x => 
                            <button key={x} onClick={() => {setActiveTab(x)}} className={`acct-tab ${activeTab === x ? 'active-tab' : ''}`}>{x}</button>
                        )
                    }
                </div>

                {
                    activeTab === 'Account' ? <AccountInfo session={session} /> : ''
                }
                {
                    activeTab === 'Events' ? <EditEvents session={session} /> : ''
                }

            </main>
        </div>
    );
}
