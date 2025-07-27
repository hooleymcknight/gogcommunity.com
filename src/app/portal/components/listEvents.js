import { useEffect, useState } from 'react';
import { useSession } from '@/app/SessionProvider';
import { collectEvents } from '../components/updateServerData';

const dtToDate = (dt) => {
    return dt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

const dtToTime = (dt) => {
    return dt.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'});
}

export const ListEvents = ({ session }) => {
    const [events, setEvents] = useState([]);
    const { updateSession } = useSession();
    const sessionData = useSession().sessionData;
    const isAdmin = sessionData?.user?.type;

    useEffect(() => {
        async function fetchEvents() {
            const eventsData = await collectEvents();
            updateSession({ events: { eventsData } });
            setEvents(eventsData);
        }
        
        fetchEvents();
    }, []);

    return (
        <div className="events-list">
            {events.map((x, index) =>
                <div className="event-listing" key={index}>
                    <h3>{x.name}</h3>
                    <label className="l-date">Date</label>
                    <p className="date">{dtToDate(x.datetime)}</p>
                    <label className="l-time">Time</label>
                    <p className="time">{dtToTime(x.datetime)}</p>
                    <label className="l-location">Location</label>
                    <p className="location">{x.location}</p>
                    <label className="l-desc">Description</label>
                    <p className="desc">{x.description}</p>
                    <label className="l-host">Host</label>
                    <p className="host">{x.host}</p>
                    { isAdmin ? 
                        <>
                            <label className="l-author">Author</label>
                            <p className="author">{x.author}</p>
                        </>
                    :''}
                </div>
            )}
        </div>
    );
}