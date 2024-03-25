"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void} ) {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

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

  return (
    <div className="flex items-center justify-center text-white">
      <Image
        src={activeAssistantIcon}
        alt="Recording"
        width={350}
        height={350}
        //onClick={stopRecording}
        priority={true}
        className="assistant grayscale"
      />
    </div>
  );
}

export default Recorder;
