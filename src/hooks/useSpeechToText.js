import { useState, useRef, useCallback } from "react";

// Wraps the browser's Web Speech API (SpeechRecognition) for converting
// candidate's spoken answer into text. Free, no API key needed.
// NOTE: Not supported in all browsers (works best in Chrome).
export function useSpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported] = useState(
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window
  );
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!isSupported) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(""), []);

  return { transcript, isListening, isSupported, startListening, stopListening, resetTranscript };
}
