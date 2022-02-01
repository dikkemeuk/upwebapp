import apiFetch from "@lib/utils/api";
import { useEffect, useState } from "react";

export default function ChatLog({ id }: { id: string }) {
  const [messages, setMessages] = useState<
    {
      uid: number;
      command: string;
      datetime: Date;
      name: string;
      messageID: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await apiFetch<{
          data: {
            uid: number;
            command: string;
            datetime: Date;
            name: string;
            messageID: number;
          }[];
        }>(`/api/messages/${id}`);
        if (response.data) {
          setMessages(response.data);
        } else {
          setMessages([{uid: 0, command: "Looks like i failed to load messages somehow, please try again!", datetime: new Date(), name: "System", messageID: 0}]);
        }
      } catch {
        setMessages([{uid: 0, command: "Looks like i failed to load messages somehow, please try again!", datetime: new Date(), name: "System", messageID: 0}]);
      }
      
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div>
      <div className="divider">Chat Log</div>

      <div className="lg:m-auto lg:w-1/2 max-h-80 overflow-y-scroll overflow-x-hidden bg-gray-800 rounded-t-lg text-white px-4 py-4">
        <h1 className="text-xl">
          Showing a total of {messages.length} messages.
        </h1>
        {messages.map((x) => (
          <p className="m-1" key={x.messageID}>
            <span className="font-bold">
              {x.name ?? "Unknown User"} -{" "}
            </span>
            <span className="text-yellow-500">[@{x.uid}]</span> -
            <span className="text-red-500 opacity-70">
              {" "}
              {new Date(x.datetime).toLocaleString()}
            </span>
            <span className="text-white"> : {x.command}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
