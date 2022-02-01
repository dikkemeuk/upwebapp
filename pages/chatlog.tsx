import apiFetch from "@lib/utils/api";
import Layout from "components/Layout";
import { useEffect, useState } from "react";

export default function ChatLog() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
        try {
            const response = await apiFetch<{data?: string[], message: string}>(`/api/chatlog`)
            if (response.data) {
                setMessages(response.data)
                const box = document.getElementById("chatbox")
                if (box) {
                    box.innerHTML = `${response.data.join("<br>")}`
                }
                
            } else {
                setMessages(["no messages"])
            }
        } catch {
            setMessages(["no messages"])
        }
        setLoading(false)
    }

    fetch()
})

  if (loading) {
    return (
      <Layout head={{title: "Chatlog", description: "Watch all our recent messages!"}}>
       <div className="divider">Chat Log</div>
      <div className="flex flex-col m-auto h-auto w-auto">
        <div className="w-full">
          <div className="card lg:m-auto lg:w-1/2 max-h-80 shadow bg-gray-800 m-2 animate-pulse">
            <div className="card-body">
              <div className="card-title grid grid-cols-2 w-full">
                <span>Loading...</span>
                <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
              </div>
              <span>The messages are loading, be patient please.</span>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout head={{title: "Chatlog", description: "Watch all our recent messages!"}} >
    <div className="container h-screen m-auto w-auto">
      <div className="divider">Chat Log</div>
      
      <div className="m-auto lg:m-auto lg:w-1/2 h-[90%] lg:h-2/3 overflow-y-scroll overflow-x-hidden bg-gray-800 rounded-lg shadow-sm px-4 py-4">
        <h1 className="text-xl">
          Showing a total of {messages.length} messages.
        </h1>
        <p id="chatbox" className="mt-2 mb-2"></p>
      </div>
    </div>
    </Layout>
  );
}
