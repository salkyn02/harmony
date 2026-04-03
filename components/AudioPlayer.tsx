import { FC } from "react";

export const AudioPlayer: FC<{ src: string }> = ({ src }) => {
  return <audio src={src} controls />;
};
