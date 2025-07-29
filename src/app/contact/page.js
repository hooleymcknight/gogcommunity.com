'use client';
import '../styles/contact.css';
import Navbar from "../helpers/navbar";
import { useForm } from 'react-hook-form';
import { sendEmail } from '../api/sendEmail';

export default function Contact() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendEmail(data);
    }

    return (
        <>
            <Navbar />
            <div className="contact main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1>Contact Us</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Full Name" {...register('name', {required: true})} />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="email@domain.com" {...register('email', {required: true})} />
                        </div>
                        <div className="input-group">
                            <label>Your Message</label>
                            <textarea rows={4} placeholder="Your message here..." {...register('message', {required: true})} />
                        </div>
                        <button id="submitMessage">Submit</button>
                    </form>
                </main>
            </div>
        </>
        
    );
}