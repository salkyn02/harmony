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
  stopRecording: () => void;
  startRecording: () => void;
}> = ({ classId, addFile, stopRecording, startRecording }) => {
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [submitted, setSubmitted] = useState(false);

  const recorder = useReactMediaRecorder({
    audio: true,
    onStop: async (url, blob) => {
      setBlob(blob);
      setSubmitted(false);
    },
    blobPropertyBag: { type: "audio/mp3" },
  });

  const handleCancel = () => {
    setBlob(undefined);
    setSubmitted(false);
    recorder.stopRecording();
    recorder.clearBlobUrl();
    stopRecording();
  };

  return (
    <div className="flex  items-center gap-3">
      {/* <p>{recorder.status}</p> */}
      {recorder.status !== "recording" && !blob && (
        <Button
          onClick={() => {
            recorder.startRecording();
            startRecording();
          }}
          disabled={loading}
          variant="ghost"
          className="hover:bg-transparent hover:text-primary cursor-pointer"
        >
          <Mic />
        </Button>
      )}

      {recorder.status === "recording" && (
        <Button
          onClick={() => {
            recorder.stopRecording();
          }}
          disabled={loading}
          variant="ghost"
          className="hover:bg-transparent hover:text-primary cursor-pointer"
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
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!blob) throw new Error("Missing blob");

              const formData = new FormData();
              formData.append("classId", String(classId));
              formData.append("file", blob, "recording.mp3");

              setLoading(true);

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await response.json();
              data.createdAt = new Date(data.createdAt);
              stopRecording();
              setLoading(false);
              addFile(data);
              setSubmitted(true);
              setBlob(undefined)
            }}
            disabled={loading}
            className="cursor-pointer"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
