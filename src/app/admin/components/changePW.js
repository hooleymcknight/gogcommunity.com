'use client';
import { useState } from 'react';


export default function ChangePasswordButton({ onDataSend }) {
    const [changingPassword, setChangingPassword] = useState(false);

    const handleClick = async (e) => {
        if (changingPassword) {
            let inputValue = e.target.parentElement.querySelector('input')?.value;
            const updated = await onDataSend(inputValue);
            if (updated) {
                setChangingPassword(false);
            }
        }
        else {
            setChangingPassword(true);
        }
    };

    return (
        <>
            { changingPassword ?
                <input type="password" placeholder="new password" />
                :
                ''
            }
            <button id="changePW" onClick={(e) => {handleClick(e)}}>Change Password</button>
        </>
    );
}