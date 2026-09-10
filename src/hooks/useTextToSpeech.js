import { useState, useCallback, useRef } from "react";

// Wraps the browser's SpeechSynthesis API so the avatar can "speak" questions aloud.
// speaking state is used to drive the avatar's basic lip-sync animation.
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const speak = useCallback((text, onEnd) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel(); // stop any ongoing speech first

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
