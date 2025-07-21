import Image from "next/image";
import '../styles/about.css';

export default async function About() {

    return (
        <div className="main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    src="/GoG-logo.svg"
                    alt="GoG Community logo"
                    width={180}
                    height={38}
                    priority
                />
                <p>about us</p>
                <a href="/">go back</a>

            </main>
        </div>
    );
}