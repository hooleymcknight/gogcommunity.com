'use client';
import { useState } from 'react';
import ChangePasswordButton from "./changePW";
import { updateServerData } from "./updateServerData";
import { useSession } from '@/app/SessionProvider';

export default function AccountInfo({ session, onDataSend }) {
    // const { session, updateSession } = useSession();
    const { updateSession } = useSession();
    console.log(updateSession);

    return (
        <>
            <div className="acct-info-section" data-section="username">
                <h3>Username:</h3>
                <p>{session.user.username}</p>
            </div>
            <div className="acct-info-section" data-section="name">
                <h3>Name:</h3>
                <p>{session.user.fname} {session.user.lname}</p>
            </div>
            <div className="acct-info-section" data-section="email">
                <h3>Email:</h3>
                <p>{session.user.email}</p>
            </div>
            <div className="acct-info-section" data-section="password">
                <h3>Password:</h3>
                <ChangePasswordButton required={session.user.needsReset ? true : false} updatePwChangeRequired={(x) => { updateSession({ user: { ...session.user, needsReset: false } }) }} onDataSend={updateServerData} />
            </div>
            
        </>
    );
}