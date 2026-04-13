import { RelatedAudio, RelatedMessage, User } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { DeleteAudioBtn } from "./DeleteAudioBtn";
import { DeleteMessageBtn } from "./DeleteMessageBtn";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";

export const MessageList: FC<{
  messages: RelatedMessage[];
  audios: RelatedAudio[];
  currentUser: User;
  deleteAudio: (audioId: number) => void;
  deleteMessage: (messageId: number) => void;
}> = ({ messages, audios, currentUser, deleteAudio, deleteMessage }) => {
  const items = [...messages, ...audios];
  const sorted = items.toSorted((a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });
  return (
    <>
      {sorted.map((item) => {
        if ("content" in item) {
          return (
            <Item key={`message-${item.id}`} variant="outline">
              <ItemContent>
                <ItemTitle> {item.user.name}: </ItemTitle>
                <ItemDescription>
                  {item.content} [{item.createdAt.toLocaleString()}]
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <DeleteMessageBtn
                  messageId={item.id}
                  userId={item.userId}
                  currentUser={currentUser}
                  deleteMessage={deleteMessage}
                />
              </ItemActions>
            </Item>
          );
        }
        return (
          <Item key={item.id} variant="outline">
            <ItemContent>
              <ItemTitle>{item.user.name}:</ItemTitle>
              <ItemDescription>
                <AudioPlayer src={item.url} /> [
                {item.createdAt.toLocaleString()}]
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <DeleteAudioBtn
                audioId={item.id}
                userId={item.userId}
                currentUser={currentUser}
                deleteAudio={deleteAudio}
              />
            </ItemActions>
          </Item>
        );
      })}
    </>
  );
};
