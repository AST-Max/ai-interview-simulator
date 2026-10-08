import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // React State for Auth Mode (Sign In vs Sign Up) and Password Visibility
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form Data States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Form Submission with Real Backend Integration
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    // Backend endpoint based on mode (Verify these match your Node.js routes)
    const endpoint = isSignIn ? '/api/auth/login' : '/api/auth/signup';
    
    // Create payload
    const payload = isSignIn 
      ? { email, password } 
      : { name: fullName, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend se aayi hui error message dikhana
        throw new Error(data.message || data.error || "Authentication failed. Please try again.");
      }

      // 🎯 SUCCESS: Token save karo aur Dashboard bhej do
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        throw new Error("Token not received from server.");
      }

    } catch (error) {
      console.error("Auth Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="w-full min-h-screen flex flex-col">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          
          {/* LEFT PANEL: Visual & Trust Showcase */}
          <div className="relative overflow-hidden bg-surface-container-low lg:col-span-5 xl:col-span-6 p-8 lg:p-14 flex flex-col justify-between">
            {/* Subtle Architectural SVG Grid Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none text-tertiary-container" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="48" id="grid-pattern" patternUnits="userSpaceOnUse" width="48">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.75"></path>
                  <circle cx="48" cy="48" fill="currentColor" r="1.5"></circle>
                </pattern>
              </defs>
              <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
            </svg>
            
            {/* Ambient Glow Spotlights */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-tertiary-fixed opacity-30 blur-2xl pointer-events-none"></div>
            
            {/* Top Branding */}
            <div className="relative z-10 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>mic_double</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">IntervAI</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-1"></span>
                </div>
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                Engine v2.4 Active
              </span>
            </div>
            
            {/* Middle Content: High-Impact Typography & Floating Simulation Card */}
            <div className="relative z-10 my-12 lg:my-auto max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/60 text-tertiary font-label-sm text-label-sm mb-6">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Adaptive Neural Interviewing</span>
              </div>
              <h1 className="font-display text-headline-lg lg:text-display text-on-surface leading-tight tracking-tight">
                Prepare for your dream role with <span className="text-primary italic">real-time</span> AI feedback.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-md">
                Simulate high-stakes technical and leadership loops. Receive surgical rubric breakdowns before facing hiring panels.
              </p>
              
              {/* Glassmorphism Interview Preview Widget */}
              <div className="mt-10 p-5 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">smart_toy</span>
                    </div>
                    <div>
                      <p className="font-headline-sm text-label-md text-on-surface">Ready to simulate: System Design &amp; Architecture</p>
                      <p className="font-body-sm text-body-sm text-secondary">FAANG Senior Staff Calibration Matrix</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                    Live Mock
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-primary rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-5 bg-primary/70 rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-2 bg-primary/40 rounded-full"></span>
                    <span className="w-1.5 h-6 bg-primary rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-3 bg-primary/60 rounded-full"></span>
                    <span className="font-body-sm text-label-sm text-on-surface-variant ml-2 font-medium">Sub-50ms Vocal Engine</span>
                  </div>
                  <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>94% Offer Correlation</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Trust Metrics */}
            <div className="relative z-10 pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  <img className="w-9 h-9 rounded-full object-cover shadow-sm" alt="Portrait 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgVJdFXfKWklwZ1IzLRNqfQMvqydach7fOW2nlgC_Y2rT-_mfsPnUHPX6gvOguxOsDVxbhsF-UzYy9MjQ12vrSBJXlxDLxpr58zYUe3A2oPVYrdWPVAx7YMj5pr-YJ8hNc8rSJPbhnZuFrfyYgbYdagYwU8JCXGRRb9nL1TLL2eFk71NXqRNAYBew_GtrG56mhWdkDh2dUKyLVJVXWjdk6p1OdbMAzL0leRDL-G-44VgXhtVJuQIYq" />
                  <img className="w-9 h-9 rounded-full object-cover shadow-sm" alt="Portrait 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdkDyD0szG0tS_H2jLtKtAb7pYeJPF7kKUdpqj9_dbwh5K-074JW9sRD1PFqmzezek0GLpM63rnbV5M3wlY7ABwEMSTO3Ik6bvWQY839xQ2lAdJ57bx5ix_FQeWNxjTZvFMkSMQ9_iVumSpLHrHI9923n62w_BRYFVLRHhtAqLTwQbhOvbzhmWdtdh8QRWrZLGy8Pc4mj3VhDgfT60uU-TkwrYZqWkIjPvERKp3HjUByVLvCfvcJKJ" />
                  <img className="w-9 h-9 rounded-full object-cover shadow-sm" alt="Portrait 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa6psKRJt0MAcmaD8g35KiYRSu2TEniDYxLZiVZvftUjJ8s8thP7N50jwE6KE-irbfR9wBRBOtTfgow7fac98cLJsKjQZ8qqWzpxMnpfBmNQ0B2hAdTJaU9zSTowOuKgfVLDd5Y2vET7FCu_780e74N3XQn5_5kr8ADKJXsZgMveHHMackGg9E4JieERGxwPkhNym4Wgv9miJ3xaFwhcP_1zxl3CJRRBL7NWGfldBzRc_nb3mbkZUu" />
                  <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-primary shadow-sm">
                    +10k
                  </div>
                </div>
                <div className="text-on-surface-variant font-body-sm text-body-sm">
                  <span className="font-semibold text-on-surface">Trusted by 10,000+ candidates</span>
                  <span className="block text-secondary">interviewing at OpenAI, Google, Stripe, and Apple.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Authentication Form */}
          <div className="bg-surface-container-lowest lg:col-span-7 xl:col-span-6 px-6 py-10 sm:px-12 lg:px-20 xl:px-24 flex flex-col justify-center items-center">
            <div className="w-full max-w-md mx-auto space-y-8">
              
              {/* Header Pill & Tab Switcher */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  Candidate Portal
                </span>
                
                <div className="flex bg-surface-container-low p-1 rounded-full shadow-inner">
                  <button 
                    onClick={() => { setIsSignIn(true); setErrorMsg(""); }}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-label-sm font-label-sm transition-all duration-200 cursor-pointer ${isSignIn ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-secondary hover:text-on-surface'}`}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setIsSignIn(false); setErrorMsg(""); }}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-label-sm font-label-sm transition-all duration-200 cursor-pointer ${!isSignIn ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-secondary hover:text-on-surface'}`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Title Block */}
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  {isSignIn ? "Welcome Back, Candidate" : "Create Candidate Account"}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  {isSignIn 
                    ? "Sign in to access your interview simulator, audio transcripts, and rubric feedback." 
                    : "Unlock custom telemetry, mock loops, and automated skill-gap analysis."}
                </p>
              </div>
              
              {/* Error Message Display */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-xl shrink-0">error</span>
                  <p className="text-sm font-medium text-error">{errorMsg}</p>
                </div>
              )}

              {/* Form Container */}
              <form className="space-y-5" onSubmit={handleAuthSubmit}>
                
                {/* Dynamic Extra Field for Sign Up Mode */}
                {!isSignIn && (
                  <div className="space-y-1.5 transition-all">
                    <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="fullName">
                      Full Legal Name
                    </label>
                    <div className="relative">
                      <input 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-surface-container-lowest text-on-surface rounded-DEFAULT shadow-sm placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none transition-all duration-150 border border-outline-variant/30 focus:border-primary" 
                        id="fullName" 
                        placeholder="Alex Chen" 
                        type="text" 
                      />
                      <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-secondary text-lg pointer-events-none">
                        badge
                      </span>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-lowest text-on-surface rounded-DEFAULT shadow-sm placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none transition-all duration-150 border border-outline-variant/30 focus:border-primary" 
                      id="email" 
                      placeholder="alex.chen@domain.com" 
                      type="email" 
                    />
                    <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-secondary text-lg pointer-events-none">
                      mail
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="password">
                      Password
                    </label>
                    {isSignIn && (
                      <a className="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-lowest text-on-surface rounded-DEFAULT shadow-sm placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none transition-all duration-150 border border-outline-variant/30 focus:border-primary pr-11" 
                      id="password" 
                      placeholder="••••••••••••" 
                      type={showPassword ? "text" : "password"} 
                    />
                    <button aria-label="Toggle password visibility" className="absolute right-3.5 top-3.5 text-secondary hover:text-on-surface flex items-center justify-center p-0.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} type="button">
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary bg-surface-container-low cursor-pointer border-outline-variant" type="checkbox" />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Remember me for 30 days</span>
                  </label>
                </div>

                {/* Primary CTA Button */}
                <button 
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-DEFAULT bg-inverse-surface hover:bg-on-background text-on-primary font-headline-sm text-label-md font-semibold tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                  type="submit"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <span>{isSignIn ? "Sign In to Dashboard" : "Create Free Account"}</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Centered OR Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full h-px bg-surface-container-high"></div>
                <span className="absolute bg-surface-container-lowest px-4 font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  Or continue with
                </span>
              </div>

              {/* Social Authentication Options */}
              <div className="grid grid-cols-2 gap-3.5">
                <button className="w-full py-2.5 px-4 rounded-DEFAULT bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 text-on-surface font-label-md text-label-md flex items-center justify-center gap-2.5 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer" type="button">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z" fill="#4285F4"></path>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                    <path d="M5.28 14.27a7.24 7.24 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z" fill="#FBBC05"></path>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z" fill="#EA4335"></path>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="w-full py-2.5 px-4 rounded-DEFAULT bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 text-on-surface font-label-md text-label-md flex items-center justify-center gap-2.5 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer" type="button">
                  <svg className="w-4 h-4 text-[#0077B5] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                  <span>LinkedIn</span>
                </button>
              </div>

              {/* Footer Callout & Legal Disclaimers */}
              <div className="pt-4 text-center space-y-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  <span>{isSignIn ? "Don't have an account?" : "Already have an account?"}</span>
                  <button 
                    className="font-semibold text-primary hover:underline ml-1 cursor-pointer" 
                    onClick={() => { setIsSignIn(!isSignIn); setErrorMsg(""); }} 
                    type="button"
                  >
                    {isSignIn ? "Sign up here" : "Sign in here"}
                  </button>
                </p>
                <p className="font-body-sm text-body-sm text-outline max-w-sm mx-auto leading-relaxed">
                  By proceeding, you agree to IntervAI's 
                  <a className="underline hover:text-on-surface ml-1 mr-1" href="#">Terms of Service</a> 
                  and 
                  <a className="underline hover:text-on-surface ml-1" href="#">Candidate Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;