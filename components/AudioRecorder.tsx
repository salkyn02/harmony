"use client";

import { RelatedFile } from "@/types";
import { FC, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { AudioPlayer } from "./AudioPlayer";
import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";

const AudioRecorder: FC<{
  classId: number;
  addFile: (newFile: RelatedFile) => void;
}> = ({ classId, addFile }) => {
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [submitted, setSubmitted] = useState(false);

  const recorder = useReactMediaRecorder({
    audio: true,
    onStop: async (url, blob) => {
      setBlob(blob);
      setSubmitted(false);
    },
  });

  const handleCancel = () => {
    setBlob(undefined);
    setSubmitted(false);
    recorder.stopRecording();
    recorder.clearBlobUrl();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* <p>{recorder.status}</p> */}
      {recorder.status !== "recording" && (
        <Button
          onClick={recorder.startRecording}
          disabled={loading}
          variant="ghost"
        >
          <Mic />
          Start Recording
        </Button>
      )}

      {recorder.status === "recording" && (
        <Button
          onClick={recorder.stopRecording}
          disabled={loading}
          variant="ghost"
        >
          <Square />
          Stop Recording
        </Button>
      )}

      {recorder.mediaBlobUrl && !submitted && (
        <AudioPlayer src={recorder.mediaBlobUrl} />
      )}

      {blob && !submitted && (
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              if (!blob) throw new Error("Missing blob");

              const formData = new FormData();
              formData.append("classId", String(classId));
              formData.append("file", blob, "recording.webm");

              setLoading(true);

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await response.json();
              data.createdAt = new Date(data.createdAt);

              setLoading(false);
              addFile(data);
              setSubmitted(true);
            }}
            disabled={loading}
          >
            Submit
          </Button>

          <Button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
