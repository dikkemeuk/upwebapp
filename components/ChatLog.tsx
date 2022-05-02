import { ChatMessage } from "@lib/utils/MessageCache";
import Section from "./Section";
import { useState, useRef } from "react";
import { coloredText } from "@lib/utils/textColor";
import useSWRInfinite from "swr/infinite";
import Message from "./elements/ChatMessage";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChatLog() {
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(1);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/chats/chunk?page=${index}`,
    fetcher
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + 1);
        setSize(size + 1);
      }
    }
  };

  const messages: ChatMessage[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < 1000);
  const isRefreshing = isValidating && data && data.length === size;

  const listInnerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={listInnerRef}
      onScroll={onScroll}
      className="w-auto text-xs p-2 mt-5 md:text-xl md:w-[2/3] text-left h-80 overflow-y-auto rounded-lg border-red-800 border-2"
    >
      {messages.map((message, index) => (
        <>
          <Message {...message} key={message.messageID}/> 
        </>
      ))}
    </div>
  );
}
