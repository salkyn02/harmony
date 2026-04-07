"use client";

import { RelatedAudio } from "@/types";
import { FC, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { AudioPlayer } from "./AudioPlayer";

const AudioRecorder: FC<{
  classId: number;
  addAudio: (newAudio: RelatedAudio) => void;
}> = ({ classId, addAudio }) => {
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [submitted, setSubmitted] = useState(false)
  const recorder = useReactMediaRecorder({
    audio: true,
    onStop: async (url, blob) => {
      setBlob(blob);
      setSubmitted(false)
    },
  });

  return (
    <div>
      <p>{recorder.status}</p>
      {recorder.status !== "recording" && (
        <button onClick={recorder.startRecording} disabled={loading}>
          Start Recording
        </button>
      )}

      {recorder.status === "recording" && (
        <button onClick={recorder.stopRecording} disabled={loading}>
          Stop Recording
        </button>
      )}

      {recorder.mediaBlobUrl && !submitted && <AudioPlayer src={recorder.mediaBlobUrl} />}

      {blob && !submitted && (
        <button
          onClick={async () => {
            if (!blob) {
              throw new Error("Missing blob");
            }
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
            addAudio(data);
            setSubmitted(true)
          }}
          disabled={loading}
        >
          Submit
        </button>
      )}
      
    </div>
  );
};

export default AudioRecorder;
