'use server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

async function getUserData(newValue, currentPW) {
    const session = await getServerSession(options);
    const password = newValue;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const hashedCurrentPW = bcrypt.hashSync(currentPW, salt);

    const accountInfo = await db.users.findFirst({
        where: {
            username: session.user.username,
            password: hashedCurrentPW,
        }
    });

    if (accountInfo) {
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

export async function updateServerData(newValue, currentPW) {
    const { hashedPassword } = await getUserData(newValue, currentPW);
    if (hashedPassword) {
        const isMatch = bcrypt.compareSync(newValue, hashedPassword);
        return isMatch;
    }
    else {
        return false;
    }
}