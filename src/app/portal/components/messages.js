'use client';
import ChangePasswordButton from "./changePW";
import { updateServerPassword } from "./server/updateMessages";
import { useSession } from '@/app/SessionProvider';
import Link from "next/link";

export default function Messages({ session }) {
    const [messages, setMessages] = useState([]);
    const { updateSession } = useSession();

    useEffect(() => {
        async function fetchMessages() {
            const messagesData = await collectEvents();
            updateSession({ messages: { messagesData } });
            setMessages(messagesData);
        }
        
        fetchMessages();
    }, []);

    return (
        <>
            <div className="messages">
                {messages.length ?
                    <p>messages</p>
                :
                    <p>no messages</p>
                }
            </div>
        </>
    );
}