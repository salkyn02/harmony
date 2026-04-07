import { RelatedAudio, RelatedMessage, User } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { DeleteAudioBtn } from "./DeleteAudioBtn";
import { DeleteMessageBtn } from "./DeleteMessageBtn";

export const MessageList: FC<{
  messages: RelatedMessage[];
  audios: RelatedAudio[];
  currentUser: User;
   deleteAudio: (audioId: number) => void;
   deleteMessage: (messageId: number) => void;
}> = ({ messages, audios, currentUser, deleteAudio, deleteMessage}) => {
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
            <DeleteMessageBtn
                    messageId={item.id}
                    userId={item.userId}
                    currentUser={currentUser}
                    deleteMessage={deleteMessage}
                  />
          </div>)
        }
        return (
          <div key={item.id}>
            {item.user.name}:  <AudioPlayer src={item.url} /> [
            {item.createdAt.toLocaleString()}] 
             <DeleteAudioBtn
                    audioId={item.id}
                    userId={item.userId}
                    currentUser={currentUser}
                    deleteAudio={deleteAudio}
                  />
          </div>
        );
      })}
    </>
  );
};
