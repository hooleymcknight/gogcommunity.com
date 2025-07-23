'use client';
import { useState } from 'react';


export default function ChangePasswordButton({ required, onDataSend }) {
    const [changingPassword, setChangingPassword] = useState(false);

    const handleClick = async (e) => {
        const pwContainer = e.target.parentElement;
        if (changingPassword) {
            let inputValue = pwContainer.querySelector('input#new-pw-1')?.value;
            let repeatValue = pwContainer.querySelector('input#new-pw-2')?.value;
            if (inputValue === repeatValue) {
                let currentPW = pwContainer.querySelector('input#current-pw')?.value;
                const updated = await onDataSend(inputValue, currentPW);
                if (updated) {
                    setChangingPassword(false);
                }
                else {
                    console.log('try again');
                    /**
                     * insert error messaging here
                     */
                }
            }
            else {
                console.log('get ya passwords matching');
                /**
                 * insert error messaging here
                 */
            }
        }
        else {
            setChangingPassword(true);
        }
    };

    return (
        <>
            { required ?
                <div className="change-pw-modal-container">
                    <div className="change-pw-modal">
                        <h2>Please reset your password immediately.</h2>
                        { changingPassword ?
                            <input type="password" placeholder="new password" />
                            :
                            ''
                        }
                        <button id="changePW" className="modal-btn" onClick={(e) => {handleClick(e)}}>Change Password</button>
                    </div>
                </div>
            :
                <>
                    { changingPassword ?
                        <>
                            <input id="current-pw" type="password" placeholder="current password" />
                            <input id="new-pw-1" type="password" placeholder="new password" />
                            <input id="new-pw-2" type="password" placeholder="repeat new password" />
                        </>
                        :
                        ''
                    }
                    <button id="changePW" onClick={(e) => {handleClick(e)}}>Change Password</button>
                </>
            }
            
        </>
    );
}