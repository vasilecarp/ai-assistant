import React from "react";
import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";

function Recorder() {
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
