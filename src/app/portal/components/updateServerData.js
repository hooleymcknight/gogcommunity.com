'use server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

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
        .catch((e) => {
            console.error(e);
        });
}

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

export async function updateServerPassword(newValue, currentPW) {
    const { hashedPassword } = await getUserData(newValue, currentPW);
    if (hashedPassword) {
        const isMatch = bcrypt.compareSync(newValue, hashedPassword);
        return isMatch;
    }
    else {
        return false;
    }
}