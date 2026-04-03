import { RelatedAudio, RelatedMessage } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";

export const MessageList: FC<{
  messages: RelatedMessage[];
  audios: RelatedAudio[]
}> = ({ messages, audios }) => {
  const items = [...messages, ...audios]
  const sorted = items.toSorted((a, b)=>{
    if(a.createdAt > b.createdAt){
      return 1
    } else {
      return -1
    }
  })
  return (
    <>
      {sorted.map((item) => {
        if('content' in item){
          return ( <div key={`message-${item.id}`}>
            {item.user.name}: {item.content} [
            {item.createdAt.toLocaleString()}]
          </div>)
        }
        return (
          <div key={item.id}>
            {item.user.name}:  <AudioPlayer src={item.url} /> [
            {item.createdAt.toLocaleString()}]
          </div>
        );
      })}
    </>
  );
};
