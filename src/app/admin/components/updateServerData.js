'use server';
import { PrismaClient } from '@/generated/prisma';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import bcrypt from 'bcryptjs';

// const saltRounds = 10;
const salt = bcrypt.genSaltSync(10);
const db = new PrismaClient();

async function getUserData(newValue) {
    const session = await getServerSession(options);
    const password = newValue;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const accountInfo = await db.users.findFirst({
        where: {
            username: session.user.username,
            // password: hashedPassword,
            type: 'admin',
        }
    });

    const updateUser = await db.users.update({
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

export async function updateServerData(newValue) {
    const { hashedPassword } = await getUserData(newValue);
    // const isMatch = await bcrypt.compare(newValue, hashedPassword);
    const isMatch = bcrypt.compareSync(newValue, hashedPassword);
    
    return isMatch;
}