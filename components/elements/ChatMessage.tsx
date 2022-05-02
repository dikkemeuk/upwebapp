import type { ChatMessage } from "@lib/utils/MessageCache";
import { coloredText } from "@lib/utils/textColor";
import Link from "next/link";

export default function Message(message: ChatMessage) {
  return (
    <div
      className="collapse mx-2 border-b-2 border-gray-700"
      key={`message-${message.messageID}`}
    >   
        <input type="checkbox" className="peer" /> 
        <div tabIndex={0} className="collapse-title" >
            <span dangerouslySetInnerHTML={{__html: `${coloredText(message.alias!)}: ${coloredText(message.command)}` }}/>
        </div>
        
        <div className="collapse-content text-white text-xs grid grid-cols-2 gap-2">
            <p>
            UID: {message.uid} <br/>
            MessageID: {message.messageID} <br/>
            Sent at: {message.datetime}
            </p>
            <button className="btn bg-red-800">
                <Link href={`/users/${message.uid}`}>
                    <a>View User</a>
                </Link>
            </button>
           
        </div>
    </div>
  );
}
