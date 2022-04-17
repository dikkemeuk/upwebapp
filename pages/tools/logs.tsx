import apiFetch from "@lib/utils/api"
import Layout from "components/Layout"
import Section from "components/Section"
import { ChatMessage } from "@lib/utils/MessageCache";
import { useEffect, useState } from "react";
import { messagecache } from "@lib/prisma";

export default function ChatPage() {
    const [messagesList, setMessagesList] = useState<string[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await apiFetch<{data?: string[], message: string}>("/api/chats/initial")
            setMessagesList(messages.data ?? [])
        }

        fetchMessages()
        console.log(messagesList);
    }, [messagesList])

    return (
        <Layout head={{ title: "Chatlog" }}>
            <div className="card shadow bg-gray-800 m-2">
                <div className="card-body">
                    <Section pretitle="">
                        <h1>Chatlog</h1>
                            <br />
                            <br />
                        <div className="divider" />

                        <div>
                            {messagesList.map((message, index) => (
                                <div key={`message-${index}`} dangerouslySetInnerHTML={{__html: message}}></div>   
                            ))}
                        </div>

                    </Section>
                </div>
            </div>
        </Layout>
    )
}