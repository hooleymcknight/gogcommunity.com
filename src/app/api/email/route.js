import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
// import Mail from "nodemailer/lib/mailer";

export async function POST (request) {
    const { email, name, message } = await request.json();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOG_EMAIL,
            pass: process.env.GOG_PW,
        },
    });

    const mailOptions = {
        from: process.env.GOG_EMAIL,
        to: process.env.GOG_EMAIL,
        // cc: email, // uncomment to send copy to sender
        subject: `Message from ${name} (${email})`,
        text: message,
    }

    const sendMailPromise = () => 
        new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                }
                else {
                    reject(err.message);
                }
            })
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent' });
    }
    catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
    

    // return NextResponse.json('hello from api');
}