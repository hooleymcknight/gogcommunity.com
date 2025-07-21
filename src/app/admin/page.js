import Image from "next/image";
import ChangePasswordButton from "./components/changePW";
import { updateServerData } from "./components/updateServerData";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Admin() {
    const session = await getServerSession(options);

    console.log(session.user);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
                />
                <p>GoG Community ADMIN: {session.user.username}</p>
                <a href="/api/auth/signout?callbackUrl=%2F">Sign out</a>

                {session.user.needsReset ? 
                    <p>Please reset your password immediately.</p>
                : ''}
                <ChangePasswordButton onDataSend={updateServerData} />

            </main>
        </div>
    );
}
