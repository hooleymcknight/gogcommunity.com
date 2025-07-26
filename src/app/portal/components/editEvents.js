'use client';
import { useState } from 'react';
import { createNewEvent } from "./updateServerData";
import { ListEvents } from './listEvents';

export default function EditEvents({ session, onDataSend }) {
    const [addingEvent, setAddingEvent] = useState(false);

    const newEventHandler = () => {
        const form = document.querySelector('.add-event-modal');
        let responses = {
            name: form.querySelector('#name').value,
            description: form.querySelector('#description').value || null,
            date: form.querySelector('#date').value,
            time: form.querySelector('#time').value,
            location: form.querySelector('#location').value,
            host: form.querySelector('#host').value || null,
            author: session.user.username,
        }

        createNewEvent(responses);
    }

    const handleCloseModal = (e) => {
        if (!e.target.closest('.ae-modal-inner')) {
            setAddingEvent(false);
        }
    }

    return (
        <>
            <h2>Events</h2>
            <button onClick={() => {setAddingEvent(true)}}>Add New Event</button>

            {/* <ListEvents /> */}

            { addingEvent ?
                <div className="add-event-modal" onClick={(e) => {handleCloseModal(e)}}>
                    <div className="ae-modal-inner">
                        <h2>Add New Event</h2>
                        <input id="name" type="text" placeholder="name"></input>
                        <input id="description" type="text" placeholder="description"></input>
                        <input id="date" type="date" placeholder="date"></input>
                        <input id="time" type="time" placeholder="time"></input>
                        <input id="location" type="text" placeholder="location"></input>
                        <input id="host" type="text" placeholder="host"></input>
                        <button id="submit-new-event" onClick={newEventHandler}>Submit</button>
                    </div>
                </div>
            :''}
        </>
    );
}