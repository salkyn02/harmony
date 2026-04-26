import { RelatedFile, RelatedMessage, User } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { DeleteMessageBtn } from "./DeleteMessageBtn";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { DeleteFileBtn } from "./DeleteFileBtn";
import { CustomLink } from "./CustomLink";

export const MessageList: FC<{
  messages: RelatedMessage[];
  files: RelatedFile[];
  currentUser: User;
  deleteFile: (fileId: number) => void;
  deleteMessage: (messageId: number) => void;
}> = ({ messages, files, currentUser, deleteFile, deleteMessage }) => {
  const items = [...messages, ...files];
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
              <ItemContent className="space-y-1">
                <ItemTitle> {item.user.name}: </ItemTitle>

                <ItemDescription>{item.content}</ItemDescription>
              </ItemContent>

              <div className="text-[11px] text-muted-foreground text-right">
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
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
        console.log("Item:", item);
        const isAudio = item.url.endsWith('.mp3')
        return (
          <Item key={item.id} variant="outline">
            <ItemContent>
              <ItemTitle>{item.user.name}:</ItemTitle>
              <ItemDescription>
                {
                  isAudio
                    ? <AudioPlayer src={item.url} />
                    : <CustomLink href={item.url}>Open File ({item.url.split('.').slice(-1)[0]})</CustomLink>
                }
              </ItemDescription>
              <div className="text-[11px] text-muted-foreground text-right">
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </ItemContent>
            <ItemActions>
              <DeleteFileBtn
                fileId={item.id}
                userId={item.userId}
                currentUser={currentUser}
                deleteFile={deleteFile}
              />
            </ItemActions>
          </Item>
        );
      })}
    </>
  );
};
