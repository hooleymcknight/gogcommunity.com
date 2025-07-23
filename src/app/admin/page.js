import Image from "next/image";
import ChangePasswordButton from "./components/changePW";
import { updateServerData } from "./components/updateServerData";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

import '../styles/admin.css';

export default async function Admin() {
    const session = await getServerSession(options);

    return (
        <div className="main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <h1>GoG Community {session.user.type === 'admin' ? 'Admin' : 'User'} Portal</h1>
                <h2>Hello, {session.user.username}!</h2>

                {/* <p>user type: {session.user.type}</p> */}

                <a class="sign-out" href="/api/auth/signout?callbackUrl=%2F">Sign out</a>

                {session.user.needsReset ? 
                    <p>Please reset your password immediately.</p>
                : ''}
                <ChangePasswordButton onDataSend={updateServerData} />

            </main>
        </div>
    );
}
