'use client';
import '../styles/contact.css';
import Navbar from "../components/navbar";
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/app/api/sendEmail';

export default function Contact() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        let res = await sendEmail(data);

        if (res) {
            document.querySelector('#contact-form').reset();
        }
    }

    const handleKeyUp = (e) => {
        const inputGroup = e.target.closest('.changing-pw');
        if (e.key === 'Enter') {
            inputGroup.querySelector('button').click();
        }
    }

    return (
        <>
            <Navbar />
            <div className="contact main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1>Contact Us</h1>

                    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Full Name" {...register('name', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="email@domain.com" {...register('email', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                        </div>
                        <div className="input-group">
                            <label>Your Message</label>
                            <textarea rows={4} placeholder="Your message here..." {...register('message', {required: true})} onKeyUp={(e) => {handleKeyUp(e)}} />
                        </div>
                        <button id="submitMessage">Submit</button>
                    </form>
                </main>
            </div>
        </>
        
    );
}