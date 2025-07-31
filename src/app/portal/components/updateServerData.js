'use server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

/* new event */
async function addEventDB(inputData) {
    let dt = `${inputData.date} ${inputData.time}`;

    const insertEventData = await db.events.create({
        data: {
            name: inputData.name,
            description: inputData.description,
            datetime: new Date(dt).toISOString(),
            location: inputData.location,
            host: inputData.host,
            author: inputData.author,
        }
    });
}

export async function createNewEvent(data) {
    addEventDB(data)
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
        });
}

/* edit/delete event */
export async function editEventDB(eventID, newData) {
    if (newData === 'delete') {
        console.log('delete this event', eventID);
        const deleteEvent = await db.events.delete({
            where: {
                id: Number(eventID)
            }
        });
    }
    else {
        let dt = `${newData.date} ${newData.time}`;

        const editedEvent = await db.events.update({
            where: {
                id: Number(eventID)
            },
            data: {
                name: newData.name,
                description: newData.description,
                datetime: new Date(dt).toISOString(),
                location: newData.location,
                host: newData.host,
            }
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
        });
    }
}

/* list events */
export async function collectEvents() {
    let today = new Date();
    const events = await db.events.findMany({
        where: {
            datetime: {
                gte: today
            }
        },
        orderBy: {
            datetime: 'asc',
        }
    });
    return events;
}

/* change pw */
async function getUserData(newValue, currentPW) {
    const session = await getServerSession(options);
    const password = newValue;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const accountInfo = await db.users.findFirst({
        where: {
            username: session.user.username,
        }
    });

    let matchingCurrent;
    if (currentPW) {
        const hashedCurrentPW = bcrypt.hashSync(currentPW, salt);
        matchingCurrent = (hashedCurrentPW == bcrypt.hashSync(accountInfo.password));
    }
    else {
        matchingCurrent = true;
    }

    if (accountInfo && matchingCurrent) {
        // this does the thing, not just says it
        const updatePassword = await db.users.update({
            where: {
                username: session.user.username,
                id: accountInfo.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        
        return { hashedPassword };
    }
    else {
        return false;
    }
}

export async function updateServerPassword (newValue, currentPW) {
    const { hashedPassword } = await getUserData(newValue, currentPW);
    if (hashedPassword) {
        const isMatch = bcrypt.compareSync(newValue, hashedPassword);
        return isMatch;
    }
    else {
        return false;
    }
}

/* register new user */

async function validateNewUser(data) {
    const duplicateEmail = await db.users.findFirst({
        where: {
            email: data.email,
        }
    });

    // if duplicate email, we won't even get here.
    const duplicateUN = await db.users.findMany({
        where: {
            username: data.username,
        }
    });

    console.log(duplicateEmail, duplicateUN)

    if (duplicateEmail && duplicateUN) {
        return 'This username and email have already been used. Please try with different user info.';
    }
    else if (duplicateEmail) {
        return 'This email has already been used. Please try another email.';
    }
    else if (duplicateUN) {
        return 'This email has already been used. Please try another email.';
    }

    // if no duplicates, then we can return false.
    return false;
}

export async function registerUser (userData) {
    const duplicateData = await validateNewUser(userData);

    if (!duplicateData) {
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        const addUser = await db.users.create({
            data: {
                username: userData.username,
                password: hashedPassword,
                type: 'user',
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
            }
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }
    else {
        return duplicateData;
    }
}