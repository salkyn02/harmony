"use client";

import { RelatedFile, RelatedMessage, User } from "@/types";
import { FC } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { DeleteMessageBtn } from "./DeleteMessageBtn";
import { DeleteFileBtn } from "./DeleteFileBtn";
import { CustomLink } from "./CustomLink";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 w-full rounded-md border p-4">
        <div className="flex flex-col gap-4 pr-4">
          {sorted.map((item) => {
            const uniqueKey =
              "content" in item ? `msg-${item.id}` : `file-${item.id}`;

            const isMe = item.userId === currentUser?.id;
            const isAudio = "url" in item && item.url.endsWith(".mp3");
            const timestamp = new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={uniqueKey}
                className={cn(
                  "flex w-full flex-col gap-1",
                  isMe ? "items-end" : "items-start",
                )}
              >
                {!isMe && (
                  <span className="text-[10px] font-medium text-muted-foreground ml-2">
                    {item.user.name}
                  </span>
                )}

                <div
                  className={cn(
                    "flex items-center gap-2 max-w-full",
                    isMe ? "flex-row" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[95%] rounded-2xl px-4 py-2 shadow-sm text-sm",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-primary-foreground text-foreground rounded-tl-none border",
                    )}
                  >
                    {"content" in item ? (
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {item.content}
                      </p>
                    ) : isAudio ? (
                      <AudioPlayer src={item.url} darkMode={isMe} />
                    ) : (
                      <CustomLink
                        href={item.url}
                        className={cn(
                          "underline font-medium transition-opacity hover:opacity-80",
                          isMe ? "text-primary-foreground" : "text-primary",
                        )}
                      >
                        Open File ({item.url.split(".").slice(-1)})
                      </CustomLink>
                    )}

                    <div
                      className={cn(
                        "text-[10px] mt-1 opacity-70",
                        isMe ? "text-right" : "text-left",
                      )}
                    >
                      {timestamp}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {"content" in item ? (
                      <DeleteMessageBtn
                        messageId={item.id}
                        userId={item.userId}
                        currentUser={currentUser}
                        deleteMessage={deleteMessage}
                      />
                    ) : (
                      <DeleteFileBtn
                        fileId={item.id}
                        userId={item.userId}
                        currentUser={currentUser}
                        deleteFile={deleteFile}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>

    // <>
    //   {sorted.map((item) => {
    //     if ("content" in item) {
    //       return (
    //         <Item key={`message-${item.id}`} variant="outline">
    //           <ItemContent className="space-y-1">
    //             <ItemTitle> {item.user.name}: </ItemTitle>

    //             <ItemDescription>{item.content}</ItemDescription>
    //           </ItemContent>

    //           <div className="text-[11px] text-muted-foreground text-right">
    //             {new Date(item.createdAt).toLocaleTimeString([], {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //             })}
    //           </div>
    //           <ItemActions>
    //             <DeleteMessageBtn
    //               messageId={item.id}
    //               userId={item.userId}
    //               currentUser={currentUser}
    //               deleteMessage={deleteMessage}
    //             />
    //           </ItemActions>
    //         </Item>
    //       );
    //     }
    //     const isAudio = item.url.endsWith(".mp3");
    //     return (
    //       <Item key={item.id} variant="outline">
    //         <ItemContent>
    //           <ItemTitle>{item.user.name}:</ItemTitle>
    //           <ItemDescription>
    //             {isAudio ? (
    //               <AudioPlayer src={item.url} />
    //             ) : (
    //               <CustomLink href={item.url}>
    //                 Open File ({item.url.split(".").slice(-1)[0]})
    //               </CustomLink>
    //             )}
    //           </ItemDescription>
    //           <div className="text-[11px] text-muted-foreground text-right">
    //             {new Date(item.createdAt).toLocaleTimeString([], {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //             })}
    //           </div>
    //         </ItemContent>
    //         <ItemActions>
    //           <DeleteFileBtn
    //             fileId={item.id}
    //             userId={item.userId}
    //             currentUser={currentUser}
    //             deleteFile={deleteFile}
    //           />
    //         </ItemActions>
    //       </Item>
    //     );
    //   })}
    // </>
  );
};
