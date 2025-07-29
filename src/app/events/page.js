'use client';
import '../styles/events.css';
import '../styles/listEvents.css';
import Navbar from "../helpers/navbar";
import { ListEvents } from "../portal/components/listEvents";

export default function Events({ session }) {

    return (
        <>
            <Navbar />
            <div className="main-container events grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="events flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1>Upcoming Events</h1>

                    <ListEvents session={session} />

                </main>
            </div>
        </>
    );
}