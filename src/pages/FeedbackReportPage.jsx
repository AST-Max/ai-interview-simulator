import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeedbackReportPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const questions = [
    { title: "Q1: DB Partitioning & Traffic (Analyzed)" },
    { title: "Q2: Distributed Locking with Redis" },
    { title: "Q3: Conflict Resolution in Microservices" }
  ];

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm print:hidden">
        <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 focus:outline-none">
            <span className="text-xl font-extrabold tracking-tight text-on-surface">IntervAI</span>
            <span className="h-2 w-2 rounded-full bg-primary inline-block translate-y-0.5"></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-sm font-medium text-secondary hover:text-on-surface transition-colors">Dashboard</Link>
            <span className="text-sm font-bold text-on-surface">Reports</span>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-inverse-surface text-inverse-on-surface text-xs font-bold hover:bg-on-surface transition-all shadow-sm">
              Dashboard
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 flex-1 bg-surface">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
          
          {/* Top Diagnostic Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wide uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  AI Diagnostic Report
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold shadow-sm">
                  Session #8492-X
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
                Interview Complete — Your Performance Report
              </h1>
              <p className="text-sm text-secondary flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="font-semibold text-on-surface">Senior Full-Stack Engineer</span>
                <span className="text-outline-variant">•</span>
                <span>Duration: 24m 12s</span>
                <span className="text-outline-variant">•</span>
                <span>Interviewer: Llama-3 (Local)</span>
                <span className="text-outline-variant">•</span>
                <span>Conducted: Today</span>
              </p>
            </div>
            
            {/* Quick Action CTAs */}
            <div className="flex items-center gap-3 self-start lg:self-auto shrink-0 print:hidden">
              <button 
                onClick={() => window.print()} 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all shadow-sm border border-outline-variant/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export PDF</span>
              </button>
              <button 
                onClick={() => navigate('/interview')} 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface hover:bg-on-surface text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Retake Interview</span>
              </button>
            </div>
          </div>

          {/* 3 Core Metric Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Aggregate Score</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl text-on-surface leading-none font-black">8.5</span>
                    <span className="text-sm text-secondary font-bold">/ 10</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </div>
              </div>
              <p className="text-xs text-secondary">Top <span className="font-bold text-primary">8%</span> of senior candidates.</p>
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Technical Accuracy</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl text-on-surface leading-none font-black">90%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </div>
              </div>
              <p className="text-xs text-secondary">Strong architectural rationale.</p>
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Communication</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl text-on-surface leading-none font-black">80%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                </div>
              </div>
              <p className="text-xs text-secondary">Structured STAR method used.</p>
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* Question Selector Tabs */}
          <div className="flex flex-col gap-4 print:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-on-surface font-bold">Question Drilldown &amp; Answers</h2>
              <span className="text-xs text-secondary font-bold">3 Questions</span>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {questions.map((q, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${activeTab === index ? 'bg-inverse-surface text-inverse-on-surface border-transparent shadow-sm' : 'bg-surface-container text-secondary border-outline-variant/30 hover:text-on-surface hover:bg-surface-container-high'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === index ? 'bg-primary' : 'bg-outline-variant'}`}></span>
                  <span>{q.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Question Banner */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary font-bold tracking-wider uppercase">Active Prompt</span>
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                  System Architecture
                </span>
              </div>
              <p className="text-base text-on-surface font-bold mt-1">
                "Tell me about a time you optimized a database."
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0 bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/20 shadow-inner">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-secondary font-bold uppercase">Score</span>
                <span className="text-base font-black text-on-surface">8.8 / 10</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
            </div>
          </div>

          {/* Split View Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface font-bold text-xs shadow-sm">
                      You
                    </div>
                    <div>
                      <h3 className="text-base text-on-surface font-bold">Your Response</h3>
                      <p className="text-xs text-secondary">1m 42s</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-xl p-4 text-sm text-on-surface leading-relaxed border border-outline-variant/20">
                  <p>
                    "We decoupled write operations with RabbitMQ and provisioned multi-AZ read replicas. We also set up PgBouncer..."
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">verified</span>
                    <p className="text-xs text-on-surface font-medium">Good context framing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className="text-base text-on-surface font-bold">AI Benchmark</h3>
                      <p className="text-xs text-secondary">L6 Level</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low/60 rounded-xl p-4 text-sm text-on-surface-variant leading-relaxed border border-outline-variant/20">
                  <p>
                    "I diagnosed connection saturation and read contention. First, I implemented PgBouncer... Second, introduced read replicas..."
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check</span>
                    <p className="text-xs text-on-surface font-medium">Exact Baseline Metrics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Areas to Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                </div>
                <h3 className="text-base text-on-surface font-bold">Strengths</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-on-surface-variant">
                <li className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Strong Architectural Precision
                </li>
                <li className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Quantifiable Impact
                </li>
              </ul>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                </div>
                <h3 className="text-base text-on-surface font-bold">To Improve</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-on-surface-variant">
                <li className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Quantify the Baseline Problem
                </li>
                <li className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Deepen Tradeoff Discussion
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <footer className="w-full bg-surface border-t border-outline-variant/30 py-6 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary font-medium">© 2026 IntervAI Simulator. Built by Ashish Singh Tomar.</p>
        </div>
      </footer>
    </div>
  );
};

export default FeedbackReportPage;