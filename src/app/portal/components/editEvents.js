'use client';
import { useState } from 'react';
import { updateServerData } from "./updateServerData";

export default function EditEvents({ session, onDataSend }) {
    const [addingEvent, setAddingEvent] = useState(false);

    const newEventHandler = () => {
        const form = document.querySelector('.add-event-modal');
        let responses = {
            name: form.querySelector('#name'),
            description: form.querySelector('#description') || null,
            date: form.querySelector('#date'),
            time: form.querySelector('#time'),
            location: form.querySelector('#location'),
            host: form.querySelector('#host') || null,
            author: session.user.username,
        }
    }

    return (
        <>
            edit events
            <button onClick={() => {setAddingEvent(true)}}>Add New Event</button>

            { addingEvent ?
                <div className="add-event-modal">
                    <h2>Add New Event</h2>
                    <input id="name" type="text" placeholder="name"></input>
                    <input id="description" type="text" placeholder="description"></input>
                    <input id="date" type="text" placeholder="date"></input>
                    <input id="time" type="text" placeholder="time"></input>
                    <input id="location" type="text" placeholder="location"></input>
                    <input id="host" type="text" placeholder="host"></input>
                    <button id="submit-new-event" onClick={newEventHandler}>Submit</button>
                </div>
            :''}
        </>
    );
}