import { RelatedMessage } from "@/types";
import { FC } from "react";

export const MessageList: FC<{
  messages: RelatedMessage[];
}> = ({ messages }) => {
  return (
    <>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.user.name}: {message.content} [
            {message.createdAt.toLocaleString()}]
          </div>
        );
      })}
    </>
  );
};
