import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative gradient-mesh overflow-hidden border-b border-surfaceBorder">
        <div className="max-w-5xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-heading leading-[1.1] mb-6 tracking-tight">
            Interview practice that gets harder
            <br />
            as you get better
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your resume, see exactly how it stacks up against the role you want, then
            answer questions from an interviewer that adjusts to you — easier when you're
            finding your footing, tougher when you're not.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/dashboard">
              <Button className="px-6 py-3 text-base">Start practicing</Button>
            </Link>
            <a href="#how-it-works" className="text-muted hover:text-heading text-sm font-medium transition">
              See how it works ↓
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-heading mb-12 text-center">
          From resume to ready, in three steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            step="1"
            title="Upload your resume"
            description="Drop in your PDF and pick the role you're targeting. We check it against what recruiters and ATS systems actually look for."
          />
          <StepCard
            step="2"
            title="Talk to your interviewer"
            description="A voice-driven mock interview built from your resume. Answer out loud or type — your call."
          />
          <StepCard
            step="3"
            title="Get sharper each round"
            description="Struggle with a question and the next one eases up. Nail it, and the next one pushes harder — same as a real interview."
          />
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-surfaceBorder bg-darker">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-heading mb-3">
                Your resume, scored the way ATS software scores it
              </h3>
              <p className="text-muted leading-relaxed">
                Missing keywords, weak sections, formatting that trips up parsers — see the
                gaps before a recruiter's software finds them first.
              </p>
            </div>
            <FeatureCard>
              <ScoreRing score={92} />
            </FeatureCard>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FeatureCard className="md:order-2">
              <DifficultyPreview />
            </FeatureCard>
            <div className="md:order-1">
              <h3 className="text-2xl font-bold text-heading mb-3">
                An interviewer that reads the room
              </h3>
              <p className="text-muted leading-relaxed">
                Give a shaky answer and the next question meets you where you are. Answer
                well, and it digs deeper — the same instinct a sharp human interviewer has.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - small avatar photos, realistic credibility */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-heading mb-12 text-center">
          Built by students, for students
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            initials="AS"
            name="Ashish"
            role="B.Tech CSE, BBDU"
            quote="Practicing with adaptive difficulty helped me handle follow-up questions I used to freeze on."
          />
          <TestimonialCard
            initials="RK"
            name="Riya K."
            role="Final year student"
            quote="The ATS score caught keyword gaps I never would have noticed on my own."
          />
          <TestimonialCard
            initials="MP"
            name="Manish P."
            role="Placement aspirant"
            quote="Feels like an actual interviewer — not just a chatbot asking generic questions."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-surfaceBorder">
        <div className="grid grid-cols-3 gap-8 text-center">
          <Stat value="5" label="questions per session" />
          <Stat value="2" label="scores: content & delivery" />
          <Stat value="24/7" label="no scheduling needed" />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-surfaceBorder">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-heading mb-4">Ready for the next round?</h2>
          <p className="text-muted mb-8">
            Your first mock interview is a few minutes away.
          </p>
          <Link to="/dashboard">
            <Button className="px-6 py-3 text-base">Start practicing</Button>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-surfaceBorder bg-darker">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-semibold text-heading mb-2">Interview Simulator</h3>
              <p className="text-sm text-muted max-w-sm leading-relaxed">
                An AI-powered mock interview platform built as a B.Tech CSE major project at
                Babu Banarasi Das University, Lucknow.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-heading mb-3">Get in touch</h3>
              <div className="space-y-2 text-sm text-muted">
                <p>
                  Email:{" "}
                  <a href="mailto:contact@interviewsimulator.com" className="text-heading hover:text-primary transition">
                    contact@interviewsimulator.com
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/AST-Max/ai-interview-simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-heading hover:text-primary transition"
                  >
                    AST-Max/ai-interview-simulator
                  </a>
                </p>
                <p>Location: Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-surfaceBorder text-center text-xs text-muted">
            © 2026 Interview Simulator. Built as a college major project.
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="relative pl-14">
      <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-sm font-semibold text-heading">
        {step}
      </div>
      <h3 className="font-semibold text-heading mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({ children, className = "" }) {
  return (
    <div className={`bg-surface border border-surfaceBorder rounded-2xl p-8 flex items-center justify-center min-h-[220px] ${className}`}>
      {children}
    </div>
  );
}

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2444" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>
      <p className="text-2xl font-bold text-heading -mt-20">{score}%</p>
      <p className="mt-20 text-sm text-muted">ATS match score</p>
    </div>
  );
}

function DifficultyPreview() {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 font-medium text-xs">EASY</span>
        <span className="text-muted">"What does REST API mean?"</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-medium text-xs">MEDIUM</span>
        <span className="text-muted">"Walk me through your database schema."</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-medium text-xs">HARD</span>
        <span className="text-muted">"How would this scale to 1M users?"</span>
      </div>
    </div>
  );
}

function TestimonialCard({ initials, name, role, quote }) {
  return (
    <div className="bg-surface border border-surfaceBorder rounded-2xl p-6">
      <p className="text-sm text-muted leading-relaxed mb-5">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-heading">{name}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-4xl font-bold gradient-text mb-1">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
