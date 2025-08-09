'use client';
import '../styles/about.css';
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function About() {

    return (
        <>
            <Navbar />
            <div className="about main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1>About GoG Community</h1>
                    <div className="about-content">
                        <p>
                            Originally created in 2013 as a student organization on a Texas college campus, GoG eventually became a non-profit organization. 
                            Its newest form comes in that of GoG Community, an online group focused on connecting gamers together in a safe and accepting environment. 
                            <br/><br/>
                            GoG Community is an online home to open-hearted individuals who are hoping to find connection with other individuals who share similar interests. 
                            We play a wide variety of games, and we&rsquo;re excited to learn about the games that you love as well!
                        </p>
                        <a href="https://discord.gg/5MyTgHUSjy" id="joinDiscord">
                            <FontAwesomeIcon icon={faDiscord} />
                            Join Discord
                        </a>
                    </div>
                </main>
            </div>
        </>
    );
}