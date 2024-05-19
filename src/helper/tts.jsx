import { Pause, Play, StopCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  //   const text = "This is RisheetParmar";
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const [fromStart, setFromStart] = useState(true);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    // u.voice = voices[12];

    setUtterance(u);
    // console.log(utterance);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    setFromStart(false);
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }
    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
    setFromStart(true);
  };

  return (
    <div className="text-white">
      <button
        onClick={() => {
          if (isPaused) {
            handlePlay();
          } else {
            handlePause();
          }

          console.log({
            isPaused,
            fromStart,
          });
        }}
      >
        {isPaused || fromStart ? <Play /> : <Pause />}
      </button>
      <button
        onClick={() => {
          console.log({
            isPaused,
            fromStart,
          });
          handleStop();
        }}
      >
        <StopCircle  />
      </button>
    </div>
  );
};

export default TextToSpeech;
