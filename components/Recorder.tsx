"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";
import { useFormStatus } from "react-dom";

const mimeType = "audio/webm";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { pending } = useFormStatus();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (stream === null || pending) return;

    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudiochunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      {
        if (event.data.size === 0) return;

        localAudiochunks.push(event.data);
      }
      setAudioChunks(localAudiochunks);
    };
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;

    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className="flex items-center justify-center text-white">
      {!permission ? (
        <button onClick={getMicrophonePermission} type="button">
          Get Microphone
        </button>
      ) : null}

      {pending && (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          width={350}
          height={350}
          //onClick={stopRecording}
          priority={true}
          className="assistant grayscale"
        />
      )}

      {permission && recordingStatus === "inactive" && !pending ? (
        <Image
          src={notActiveAssistantIcon}
          alt="Not Recording"
          width={350}
          height={350}
          onClick={startRecording}
          priority={true}
          className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      ) : null}

      {recordingStatus === "recording" ? (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          width={350}
          height={350}
          //onClick={stopRecording}
          priority={true}
          className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      ) : null}
    </div>
  );
}

export default Recorder;
