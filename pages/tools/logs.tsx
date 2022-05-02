import Layout from "components/Layout"
import Section from "components/Section"
import dynamic from "next/dynamic"

const ChatLog = dynamic(() => import("components/ChatLog"))

export default function ChatPage() {
    
    
    
    return (
        <Layout head={{ title: "Chatlog" }}>
            <div className="card shadow bg-gray-800 m-2">
                <div className="card-body">
                    <Section pretitle="">
                        <h1 className="font-bold text-white">Chatlog</h1>
                            <br />
                            <br />
                        <div className="divider" />

                        <div>
                            <ChatLog />
                        </div>

                    </Section>
                </div>
            </div>
        </Layout>
    )
}