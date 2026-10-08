import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturesPage = () => {
  const navigate = useNavigate();
  
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "How quickly can I begin running technical simulations?",
      answer: "Immediately. You can upload a target resume or pick an interview track and start speaking with the AI evaluator in under 60 seconds with no complex configuration required."
    },
    {
      id: 2,
      question: "How realistic are the AI interviewer follow-ups?",
      answer: "The interview model is tuned on thousands of real L5–L7 system design and behavioral transcripts. It dynamically listens to your specific architecture choices, detects hand-wavy claims, asks for edge-case failure modes, and pushes on tradeoffs exactly as an experienced hiring committee member would."
    },
    {
      id: 3,
      question: "Can I customize the interview to a specific job description?",
      answer: "Absolutely. You can paste any target job description or company profile. IntervAI will immediately adjust its rubric criteria, technical domain focus, and behavioral expectations to match that specific organization's engineering culture."
    }
  ];

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
    <Link to="/" className="flex items-center gap-2 group">
      <span className="w-2.5 h-2.5 rounded-full bg-primary-container transition-transform group-hover:scale-125"></span>
      <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Interv<span className="text-primary">AI</span></span>
    </Link>
    <nav className="hidden md:flex items-center gap-6 px-4 py-1.5 bg-surface-container-low rounded-full">
      <Link to="/" className="px-4 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors rounded-full">Product</Link>
      <Link to="/features" className="px-4 py-1.5 font-label-md transition-colors bg-secondary-container text-on-secondary-fixed rounded-full">Features</Link>
      <Link to="/dashboard" className="px-4 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors rounded-full">Dashboard</Link>
    </nav>
    <div className="flex items-center gap-3">
      <Link to="/login" className="hidden sm:inline-flex px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">Sign In</Link>
      <Link to="/login" className="px-4 py-2 rounded-full bg-inverse-surface text-inverse-on-surface font-label-md text-label-md hover:bg-on-surface transition-colors shadow-sm">Get Started</Link>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
      </div>
    </div>
  </div>
</header>

      <main className="w-full pt-16 flex-1 bg-surface">
        <div className="flex flex-col w-full">
          
          {/* Interactive Background Glow Element */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/30 to-transparent blur-3xl pointer-events-none rounded-full"></div>
            
            {/* Header & Hero Intro */}
            <section className="relative max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(0,97,148,0.06)] mb-6 border border-outline-variant/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">Platform Capabilities &amp; Architecture</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg md:text-[3rem] md:leading-[3.5rem] text-on-surface tracking-tight mb-5 max-w-3xl mx-auto">
                Engineered for mastery. <br className="hidden sm:inline" /><span className="text-primary">Built for momentum.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                Everything you need to calibrate technical depth, polish executive communication, and land offers at top-tier engineering organizations.
              </p>
            </section>

            {/* Capabilities / Feature Grid */}
            <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold">System Capabilities</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface mt-1">High-fidelity simulation infrastructure</h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                  Calibrated against L5–L7 Staff benchmarks
                </div>
              </div>

              {/* 3-Column Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                
                {/* Card 1: ATS Resume Scanning */}
                <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-6">
                      <span className="material-symbols-outlined text-[26px]">document_scanner</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">Instant ATS Diagnostic</h3>
                    <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">
                      Unpack missing resume keywords, contextual semantic match ratios, and algorithmic parsing checks before your application hits the recruiter's desk.
                    </p>
                  </div>
                  <div>
                    <div className="p-4 rounded-xl bg-surface-container-low mb-6 border border-outline-variant/20">
                      <div className="flex items-center justify-between mb-3 text-secondary">
                        <span className="font-label-sm text-label-sm uppercase font-semibold">Semantic Match</span>
                        <span className="font-label-sm text-label-sm font-bold text-primary">94% Fit</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface text-label-sm font-medium shadow-sm">
                          <span className="material-symbols-outlined text-[14px] text-tertiary">check</span> Distributed Systems
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface text-label-sm font-medium shadow-sm">
                          <span className="material-symbols-outlined text-[14px] text-tertiary">check</span> PostgreSQL
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-lowest text-secondary text-label-sm font-medium opacity-75">
                          <span className="material-symbols-outlined text-[14px] text-primary">add</span> Raft Consensus
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-secondary border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm font-semibold tracking-wide text-on-surface-variant">94% Match Accuracy</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-secondary">FAANG Parsing</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Adaptive Voice AI */}
                <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-6">
                      <span className="material-symbols-outlined text-[26px]">graphic_eq</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">Adaptive Voice Engine</h3>
                    <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">
                      Experience dynamic, multi-turn follow-ups based on the depth of your answers in real time with sub-50ms ultra-low vocal latency.
                    </p>
                  </div>
                  <div>
                    <div className="p-4 rounded-xl bg-surface-container-low mb-6 border border-outline-variant/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Acoustic Feed</span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest text-label-sm font-bold text-primary shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span> 28ms Latency
                        </span>
                      </div>
                      <div className="h-10 flex items-center justify-center gap-1.5 px-2 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                        <span className="w-1 h-3 rounded-full bg-primary animate-pulse"></span>
                        <span className="w-1 h-6 rounded-full bg-primary-container"></span>
                        <span className="w-1 h-8 rounded-full bg-primary animate-pulse"></span>
                        <span className="w-1 h-4 rounded-full bg-secondary-fixed-dim"></span>
                        <span className="w-1 h-7 rounded-full bg-primary"></span>
                        <span className="w-1 h-5 rounded-full bg-primary"></span>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary">Natural cadence</span>
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">Zero-Interrupt</span>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-secondary border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm font-semibold tracking-wide text-on-surface-variant">WebRTC 28ms</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-secondary">Real-Time Synthesis</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Granular Rubric Feedback */}
                <div className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-6">
                      <span className="material-symbols-outlined text-[26px]">analytics</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2.5">Granular Rubric Feedback</h3>
                    <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">
                      Get scored on the STAR methodology, technical accuracy, tradeoff evaluation, filler-word frequency, and communication conciseness.
                    </p>
                  </div>
                  <div>
                    <div className="p-4 rounded-xl bg-surface-container-low mb-6 space-y-3 border border-outline-variant/20">
                      <div>
                        <div className="flex justify-between text-label-sm font-semibold mb-1 text-on-surface">
                          <span>Technical Accuracy</span>
                          <span className="text-primary font-bold">90%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-surface-container">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-label-sm font-semibold mb-1 text-on-surface">
                          <span>STAR Alignment</span>
                          <span className="text-tertiary-container font-bold">85%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-surface-container">
                          <div className="h-1.5 rounded-full bg-tertiary-container" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-label-sm text-label-sm text-secondary">Vocal Cadence</span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-md bg-surface-container-lowest text-on-surface font-semibold shadow-sm border border-outline-variant/10">142 wpm</span>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-secondary border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm font-semibold tracking-wide text-on-surface-variant">STAR Framework</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-secondary">L6+ Bar Calibration</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Visual Divider */}
            <div className="max-w-4xl mx-auto px-6 w-full">
              <div className="h-px w-full bg-surface-container-high"></div>
            </div>

            {/* FAQ Accordion Section */}
            <section className="max-w-3xl mx-auto px-6 py-16 w-full">
              <div className="text-center mb-10">
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold">FREQUENTLY ASKED QUESTIONS</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">Get your answers</h3>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30">
                    <button 
                      onClick={() => toggleFaq(faq.id)} 
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors text-base font-semibold">
                        {faq.question}
                      </span>
                      <span className={`material-symbols-outlined text-secondary transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {openFaq === faq.id && (
                      <div className="mt-3 text-secondary font-body-md text-body-md leading-relaxed pr-6 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom CTA Card */}
            <section className="max-w-5xl mx-auto px-6 pb-20 w-full">
              <div className="p-8 md:p-12 rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Ready to calibrate your performance?</h3>
                  <p className="font-body-md text-body-md text-secondary mt-1">Begin your first full-length diagnostic simulation in under 60 seconds.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link to="/login" className="px-6 py-3 rounded-full bg-inverse-surface text-inverse-on-surface font-label-md text-label-md hover:bg-on-surface transition-colors shadow-sm font-semibold">
                    Start Free Diagnostic
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-label-md text-label-md text-on-surface-variant">© 2026 IntervAI Simulator. Built by Ashish Singh Tomar.</span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;