import { RelatedAudio, RelatedMessage, User } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { DeleteAudioBtn } from "./DeleteAudioBtn";

export const MessageList: FC<{
  messages: RelatedMessage[];
  audios: RelatedAudio[];
  currentUser: User;
   deleteAudio: (audioId: number) => void;
}> = ({ messages, audios, currentUser, deleteAudio}) => {
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
