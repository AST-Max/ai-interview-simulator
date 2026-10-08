import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewPage = () => {
  const navigate = useNavigate();
  
  const [isRecording, setIsRecording] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState("Connecting to AI Interviewer...");
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState(""); 
  
  // 1. YAHAN ADD HUA HAI: Backend memory link
  const [sessionId, setSessionId] = useState(null);
  
  const candidateProfile = {
    role: "Software Engineer",
    experience: "Fresher"
  };

  const recognitionRef = useRef(null);
  
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };
    }
  }, []);

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = 0.88; 
      utterance.pitch = 1.05; 
      
      const voices = window.speechSynthesis.getVoices();
      const politeVoice = voices.find(v => 
        v.name.includes('Samantha') || 
        v.name.includes('Google US English') || 
        v.name.includes('Microsoft Zira') || 
        (v.name.includes('Natural') && v.name.includes('Female'))
      ) || voices.find(v => v.name.includes('Female')) || voices[0];

      if (politeVoice) utterance.voice = politeVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const fetchRealQuestion = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch('http://localhost:5000/api/interview/start', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          jobRole: candidateProfile.role, 
          experience: candidateProfile.experience,
          isIntroRequest: true 
        }) 
      });
      
      if (!response.ok) throw new Error("Server Error");
      
      const data = await response.json();
      const newQuestion = data.question || data.message;
      
      // 2. YAHAN ADD HUA HAI: Session ID save karna
      setSessionId(data.sessionId); 
      
      setActiveQuestion(newQuestion);
      speakQuestion(newQuestion);
      
    } catch (error) {
      const fallback = "Hello! Welcome to the interview. I'm glad you could join today. Could you please start by introducing yourself?";
      setActiveQuestion(fallback);
      speakQuestion(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealQuestion();
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript(""); 
    window.speechSynthesis.cancel(); 
    if (recognitionRef.current) recognitionRef.current.start();
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    if (transcript.trim().length > 0) {
      await submitAnswerToBackend(transcript);
    }
  };

  const submitAnswerToBackend = async (userAnswer) => {
    setIsLoading(true);
    setActiveQuestion("Listening and evaluating...");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:5000/api/interview/answer', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        // 3. YAHAN ADD HUA HAI: Memory connect karne wala naya payload
        body: JSON.stringify({ 
          sessionId: sessionId,         
          questionText: activeQuestion, 
          answer: userAnswer            
        })
      });
      
      if (!response.ok) throw new Error("Answer submit failed");
      
      const data = await response.json();
      const nextQuestion = data.question || data.nextQuestion;
      
      setActiveQuestion(nextQuestion);
      speakQuestion(nextQuestion);
      
    } catch (error) {
      const fallback = "That's interesting. Could you elaborate a bit more on that, specifically regarding any challenges you faced?";
      setActiveQuestion(fallback);
      speakQuestion(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden font-sans">
      <header className="h-14 shrink-0 border-b border-outline-variant/30 bg-surface px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-sm text-on-surface">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] shadow-sm">
              <span className="material-symbols-outlined text-[12px]">mic</span>
            </span>
            IntervAI <span className="text-primary font-black ml-1">LIVE SESSION</span>
          </div>
          <span className="text-xs text-secondary bg-surface-container px-2 py-1 rounded-full">
            Role: {candidateProfile.role} ({candidateProfile.experience})
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { window.speechSynthesis.cancel(); navigate('/analytics'); }}
            className="px-4 py-1.5 rounded-full bg-error text-on-error text-xs font-bold hover:bg-error/90 transition-colors shadow-sm cursor-pointer"
          >
            End Interview
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 bg-surface-container-lowest flex gap-6 relative">
        <div className="flex-1 bg-surface-container-low/30 rounded-3xl border border-outline-variant/30 flex flex-col relative overflow-hidden shadow-inner">
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] animate-pulse">
                {isRecording ? 'mic' : 'graphic_eq'}
              </span>
              {isLoading ? 'IntervAI is thinking...' : isRecording ? 'Listening to your answer...' : 'IntervAI is speaking...'}
            </span>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-12">
              <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping duration-1000"></div>
              <div className="absolute inset-4 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute inset-8 rounded-full bg-primary/20"></div>
              <div className="absolute inset-12 rounded-full bg-primary shadow-[0_0_40px_rgba(0,97,148,0.4)] flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-on-primary text-[40px]">
                  {isRecording ? 'mic' : 'sound_detection_glass_break'}
                </span>
              </div>
            </div>

            <div className="max-w-3xl text-center space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-on-surface leading-snug tracking-wide">
                {isLoading ? (
                  <span className="animate-pulse text-primary/80">Loading...</span>
                ) : isRecording ? (
                  <span className="text-secondary">"{transcript || 'Listening...'}"</span>
                ) : (
                  `"${activeQuestion}"`
                )}
              </h2>
            </div>
          </div>

          <div className="h-20 shrink-0 border-t border-outline-variant/30 bg-surface/50 backdrop-blur-md px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-on-surface">Your Turn</div>
            </div>

            <button 
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
              onMouseLeave={handleStopRecording}
              onTouchStart={handleStartRecording}
              onTouchEnd={handleStopRecording}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg select-none cursor-pointer ${isRecording ? 'bg-error text-on-error scale-95' : 'bg-inverse-surface text-inverse-on-surface hover:bg-on-surface hover:-translate-y-0.5'}`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isRecording ? 'stop_circle' : 'keyboard_voice'}
              </span>
              {isRecording ? 'Release to Submit Answer' : 'Hold to Speak Answer'}
            </button>

            <div className="text-[10px] font-bold text-secondary text-right">
              Speech-to-Text <span className="text-primary">Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;