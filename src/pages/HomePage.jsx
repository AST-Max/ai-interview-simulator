import React, { useState } from 'react';
import bgImage from './BackGroundImage/screen.png';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  // ... rest of your code
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogue, setDialogue] = useState("Welcome to the IntervAI live engine demo. Click 'Speak Response' to test live response grading.");
  const [engineStatus, setEngineStatus] = useState("Engine ready • Model 4.0-Omni");
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleResponses = [
    "Analyzing response... 'When scaling Kafka partitions, we maintained zero consumer lag.' Score: 95%",
    "Evaluating metrics... 'I refactored the monolith authentication gateway.' Score: 98%"
  ];
  const [sampleIndex, setSampleIndex] = useState(0);

  const handleSimulateSpeech = () => {
    setEngineStatus("Processing audio stream...");
    setIsProcessing(true);
    setTimeout(() => {
      setDialogue(sampleResponses[sampleIndex % sampleResponses.length]);
      setSampleIndex(prev => prev + 1);
      setEngineStatus("Evaluation complete • 18ms latency");
      setIsProcessing(false);
    }, 650);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 focus:outline-none">
            <span className="text-lg tracking-tight text-on-surface font-bold">IntervAI</span>
            <span className="h-2 w-2 rounded-full bg-primary-container inline-block translate-y-0.5"></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-on-surface font-bold text-sm">Product</Link>
            <Link to="/features" className="text-secondary hover:text-on-surface text-sm transition-colors">Features</Link>
            <Link to="/dashboard" className="text-secondary hover:text-on-surface text-sm transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 rounded-full bg-inverse-surface text-inverse-on-surface text-sm font-bold hover:bg-on-surface transition-all shadow-sm">
              Get Started
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 flex-1 bg-surface/90 backdrop-blur-sm">
        <div className="flex flex-col w-full">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 flex flex-col items-center text-center z-10">
            
            {/* BACKGROUND IMAGE ELEMENT */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full max-w-6xl -z-10 opacity-40 pointer-events-none select-none">
  <img 
    src="/hero-background.png" 
    alt="Background Overlay" 
    className="w-full h-auto object-contain mix-blend-luminosity"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-surface"></div>
</div>

            {/* Hero Section */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/80 border border-outline-variant/30 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs text-secondary tracking-widest uppercase font-bold">ai interview tool</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface max-w-4xl leading-tight">
              Master your next interview. Faster. <span className="text-primary">With AI.</span>
            </h1>
            <p className="text-lg text-secondary max-w-2xl mt-6 leading-relaxed">
              Our AI Interview Simulator helps candidates generate instant ATS scores, identify missing keywords, and practice live voice interviews without the stress.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <Link to="/login" className="px-8 py-3.5 rounded-full bg-inverse-surface text-inverse-on-surface text-sm font-bold hover:bg-on-surface shadow-md flex items-center gap-2">
                <span>Start Mock Interview</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-3.5 rounded-full bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-variant flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                <span>Try Demo</span>
              </button>
            </div>

            {/* MOCKUP SECTION */}
            <div className="relative w-full max-w-5xl mx-auto mt-20 mb-32">
              <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-2xl shadow-primary/5 border border-outline-variant/30 overflow-visible">
                
                {/* Mock macOS Toolbar */}
                <div className="h-11 bg-surface-container rounded-t-2xl px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/80 text-[11px] font-semibold text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live Voice Connection • WebRTC 28ms</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </div>
                </div>

                {/* App Mockup Interior Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-b from-surface-container-lowest to-surface-container/30 rounded-b-2xl pb-28">
                  
                  {/* Left: Video/Audio Tile */}
                  <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-xl bg-surface-container-high relative shadow-inner min-h-[340px] border border-outline-variant/20">
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                        <span className="text-xs font-bold text-on-surface">AI Recruiter (Staff Eng Track)</span>
                      </div>
                      <span className="text-xs font-bold text-secondary bg-surface-container-lowest/60 px-2.5 py-1 rounded-full">08:24 elapsed</span>
                    </div>

                    <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
                      <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-surface-container-lowest shadow-lg mb-6">
                        <div className="absolute inset-0 rounded-full bg-primary-fixed-dim/40 animate-ping opacity-60"></div>
                        <span className="material-symbols-outlined text-[54px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                      </div>
                      <div className="flex items-center gap-1.5 h-12">
                        <span className="w-1.5 bg-primary rounded-full h-4 animate-[pulse_1s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-8 animate-[pulse_1.2s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-12 animate-[pulse_0.8s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-6 animate-[pulse_1.1s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-9 animate-[pulse_0.9s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-5 animate-[pulse_1.3s_infinite]"></span>
                        <span className="w-1.5 bg-primary rounded-full h-3 animate-[pulse_1s_infinite]"></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Transcript */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm border border-outline-variant/20">
                      <span className="text-sm font-bold text-on-surface">Live Transcript &amp; Rubric</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">Real-time</span>
                    </div>
                    <div className="flex-1 space-y-3 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/20 text-left">
                      <div className="p-3 rounded-lg bg-surface-container-low">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary">IntervAI</span>
                          <span className="text-[10px] text-secondary">10:14:02 AM</span>
                        </div>
                        <p className="text-sm text-on-surface">"Could you elaborate on the partitioning strategy you chose when PostgreSQL read operations started throttling during prime spikes?"</p>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-high/40">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-on-surface">You (Candidate)</span>
                          <span className="text-[10px] text-secondary">10:14:18 AM</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">"We decoupled write operations through an event-driven queue and provisioned multi-AZ read replicas with PgBouncer connection pooling..."</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Card with Animation */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-[92%] sm:w-[85%] max-w-4xl z-30">
                  <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary shadow-md flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">mic</span>
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface-container-lowest"></span>
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-1">Current Prompt Scenario</div>
                          <h4 className="text-base font-bold text-on-surface">Tell me about a time you optimized a mission-critical database.</h4>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        <span>System Design</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                       <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-tertiary-container mt-0.5">auto_awesome</span>
                          <div>
                            <div className="text-sm font-bold text-on-surface">Real-Time Evaluation</div>
                            <p className="text-sm text-secondary mt-0.5">High STAR alignment: Clear breakdown of Architecture & Performance tradeoffs.</p>
                          </div>
                       </div>
                       <div className="px-4 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed text-sm font-bold flex items-center whitespace-nowrap">
                          Pass Probability: 96%
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FEATURES GRID */}
      <section className="w-full bg-surface pt-32 pb-24 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12 text-left">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Built For Modern Tech Hiring</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Engineered to eliminate interview blind spots with surgical precision.</h2>
            <p className="text-base text-secondary mt-4 leading-relaxed">Traditional prep tools rely on generic question banks. IntervAI models real hiring managers, analyzing structural logic, tone modulation, and lexical relevancy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[26px]">document_scanner</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">Instant ATS Diagnostic</h3>
              <p className="text-sm text-secondary leading-relaxed mb-8">Unpack missing resume keywords, contextual semantic match ratios, and algorithmic parsing checks before your call.</p>
              <div className="pt-6 border-t border-outline-variant/20">
                <div className="flex justify-between text-sm font-bold mb-2 text-on-surface">
                  <span>Semantic Match Score</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container">
                  <div className="h-2 rounded-full bg-primary w-[92%]"></div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-tertiary mb-6">
                <span className="material-symbols-outlined text-[26px]">record_voice_over</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">Adaptive Voice Engine</h3>
              <p className="text-sm text-secondary leading-relaxed mb-8">Experience dynamic, multi-turn follow-ups based on the depth of your answers in real time with ultra-low vocal latency.</p>
              <div className="pt-6 border-t border-outline-variant/20 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="text-sm font-bold text-on-surface">Sub-50ms Conversational Turnaround</span>
                <span className="ml-auto px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container text-xs font-bold">Live</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container mb-6">
                <span className="material-symbols-outlined text-[26px]">analytics</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">Granular Rubric Feedback</h3>
              <p className="text-sm text-secondary leading-relaxed mb-8">Get scored on the STAR methodology, technical precision, filler-word frequency, and executive communication clarity.</p>
              <div className="pt-6 border-t border-outline-variant/20 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-bold">STAR Model</span>
                <span className="px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">Filler: 1.2%</span>
              </div>
            </div>
          </div>

          {/* Logo Strip */}
          <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-outline-variant/20">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Candidates hired by engineering teams at</span>
            <div className="flex flex-wrap justify-center items-center gap-8 text-on-surface/60">
              <span className="text-xl font-black tracking-tight">STRIPE</span>
              <span className="text-xl font-bold tracking-tight">DATADOG</span>
              <span className="text-xl font-black tracking-tighter">VERCEL</span>
              <span className="text-xl font-bold tracking-tight">AIRBNB</span>
              <span className="text-xl font-bold tracking-widest">FIGMA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary">© 2026 IntervAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-secondary hover:text-on-surface transition-colors cursor-pointer">Privacy</span>
            <span className="text-sm text-secondary hover:text-on-surface transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE SANDBOX MODAL (Try Demo) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
              <h3 className="text-xl font-extrabold text-on-surface">Live Engine Sandbox</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center bg-surface-container/10">
              <div className={`relative flex items-center justify-center w-24 h-24 rounded-full ${isProcessing ? 'bg-primary/20' : 'bg-surface-container-high'} shadow-inner mb-6 transition-colors duration-500`}>
                 {isProcessing && <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>}
                 <span className={`material-symbols-outlined text-[40px] ${isProcessing ? 'text-primary' : 'text-secondary'}`}>
                   {isProcessing ? 'graphic_eq' : 'mic'}
                 </span>
              </div>
              <p className="text-center text-on-surface-variant text-sm h-12 flex items-center justify-center px-4">
                {dialogue}
              </p>
            </div>
            
            <div className="p-6 border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-bold text-secondary">
                <span>Status</span>
                <span className={isProcessing ? "text-primary animate-pulse" : ""}>{engineStatus}</span>
              </div>
              <button
                onClick={handleSimulateSpeech}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                {isProcessing ? "Processing..." : "Speak Response"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;