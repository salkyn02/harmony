import { Message } from "@/types";
import { FC } from "react";

export const MessageList: FC<{
  messages: Message[];
}> = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => {
        return (
          <li key={message.id}>
            {message.content} [{message.createdAt.toLocaleString()}]
          </li>
        );
      })}
    </ul>
  );
};
