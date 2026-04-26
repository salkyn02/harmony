// import { FC } from "react";

// export const AudioPlayer: FC<{ src: string }> = ({ src }) => {
//   return (
//     <div className="w-full rounded-md bg-muted/40 p-2">
//       <audio src={src} controls className="w-full h-8" />
//     </div>
//   );
// };


import { FC, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

export const AudioPlayer: FC<{ src: string }> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <span className="flex items-center gap-2 rounded-md px-3 py-2">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={toggle}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </Button>

      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        className="hidden"
      />

      <span className="flex-1 text-xs text-muted-foreground">
        Audio file
      </span>
    </span>
  );
};