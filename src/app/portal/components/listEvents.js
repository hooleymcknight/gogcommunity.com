'use server';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const ListEvents = async () => {
    let today = new Date();

    const events = await db.events.findMany({
        where: {
            datetime: {
                gte: today
            }
        }
    })
    //
    console.log(events);

    return (
        <div className="events-list">
            {/* {events.map((x, index) =>
                <div className="event-listing" key={index}>
                    <h3>{x.name}</h3>
                </div>
            )} */}
        </div>
    )
}