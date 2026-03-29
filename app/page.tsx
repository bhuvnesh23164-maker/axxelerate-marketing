"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Rocket, Clock, Code, BookOpen, Box, ArrowRight, Sparkles, Play, AlertCircle, Wifi, BatteryFull, Search, Moon, SlidersHorizontal, ChevronDown, Building2, TrendingUp, CheckCircle2, Mail, Activity} from "lucide-react";

import { FaLinkedin, FaInstagram } from "react-icons/fa";
// Import your custom logo component
import { LogoFull } from "../components/LogoFull";

// ── AGENT STEPS DATA ──
const howItWorksSteps = [
  {
    id: "step-1",
    tab: "Plan",
    shortTitle: "Plan",
    heading: "Tell us your goal",
    desc: "Paste a syllabus, topic, or simply describe what you want to learn — we’ll handle the rest.",
    videoPath: "https://res.cloudinary.com/dsgnnujgx/video/upload/v1774629063/step-1_ksak0q.mp4",
    glowColor: "from-[#00E5FF] via-[#8B5CF6] to-[#FF0080]"
  },
  {
    id: "step-2",
    tab: "Roadmap",
    shortTitle: "Roadmap",
    heading: "Get a clear, day-by-day roadmap",
    desc: "We turn your goal into a structured plan with daily tasks — so you always know what to do next.",
    videoPath: "https://res.cloudinary.com/dsgnnujgx/video/upload/v1774644704/step-2_cnr4ry.mp4",
    glowColor: "from-[#00E5FF] via-[#8B5CF6] to-[#FF0080]"
  },
  {
    id: "step-3",
    tab: "Learn",
    shortTitle: "Learn",
    heading: "Learn with your personal AI tutor",
    desc: "Each day comes with a dedicated tutor — with explanations, practice questions, and flashcards built in.",
    videoPath: "https://res.cloudinary.com/dsgnnujgx/video/upload/v1774645181/step-3_ybjlr2.mp4",
    glowColor: "from-[#00E5FF] via-[#8B5CF6] to-[#FF0080]"
  },
  {
    id: "step-4",
    tab: "Adapt",
    shortTitle: "Adapt",
    heading: "Stay on track with adaptive learning",
    desc: "Your roadmap adjusts based on your progress — helping you improve faster without falling behind.",
    videoPath: "https://res.cloudinary.com/dsgnnujgx/video/upload/v1774688649/step-4-final_c9ujki.mp4",
    glowColor: "from-[#00E5FF] via-[#8B5CF6] to-[#FF0080]"
  },
   {
    id: "step-5",
    tab: "Grow",
    shortTitle: "Growth",
    heading: "Get clarity on what to do next",
    desc: "Talk to your AI strategist to understand your progress, identify weak areas, and decide what to focus on next.",
    videoPath: "https://res.cloudinary.com/dsgnnujgx/video/upload/v1774646079/step-5_bjp4sd.mp4",
    glowColor: "from-[#00E5FF] via-[#8B5CF6] to-[#FF0080]"
  }
];

const faqs = [
  {
    question: "How is this different from ChatGPT or YouTube?",
    answer: "ChatGPT gives answers. AxxelerateAI builds a structured learning system — telling you what to learn, in what order, and helping you stay consistent every day."
  },
  {
    question: "What if I don't know what to study?",
    answer: "Just tell us your goal — we'll figure out the exact day-by-day roadmap for you. You don't need a syllabus to start."
  },
  {
    question: "Will the plan adapt to my pace?",
    answer: "Yes. Your roadmap adjusts dynamically based on your progress, strengths, and weak areas. If you need more time, the system recalibrates automatically."
  },
  {
    question: "Can beginners use this?",
    answer: "Absolutely. You can start completely from scratch — we build your roadmap accordingly to lay down the fundamentals first."
  },
  {
    question: "Can it actually read my messy university syllabus?",
    answer: "Yes! You can paste raw text or upload a PDF. Our system specializes in extracting chaotic academic modules and translating them into clean, actionable daily tasks."
  },
  {
    question: "Is the content provided by the AI Tutor accurate?",
    answer: "We utilize state-of-the-art, industry-leading AI models cross-referenced with your specific uploads. The Tutor acts as an elite guide, grounding its explanations in established documentation."
  }
];

// ── MOCK DATA FOR INSTANT DEMO ──
const MOCK_ROADMAPS: Record<string, any> = {
  "react": {
    subject: "React.js Mastery",
    brain: "CODING",
    days: [
      { day: 1, title: "Thinking in Components", topics: ["JSX Syntax", "Component Architecture", "Props & Data Flow"] },
      { day: 2, title: "State & Interactivity", topics: ["useState Hook", "Handling Events", "Conditional Rendering"] },
      { day: 3, title: "Side Effects & Fetching", topics: ["useEffect Hook", "API Integration", "Dependency Arrays"] }
    ]
  },
  "finance": {
    subject: "Personal Finance & Investing",
    brain: "FINANCE",
    days: [
      { day: 1, title: "Financial Foundations", topics: ["Budgeting 50/30/20", "Emergency Funds", "Debt Avalanche vs Snowball"] },
      { day: 2, title: "Market Mechanics", topics: ["Stocks vs Bonds", "Understanding Index Funds", "Compound Interest Math"] },
      { day: 3, title: "Building a Portfolio", topics: ["Asset Allocation", "Risk Tolerance", "Tax-Advantaged Accounts"] }
    ]
  },
  "business": {
    subject: "Business Strategies",
    brain: "GENERAL",
    days: [
      { day: 1, title: "Understanding Business Policy and Strategy", topics: ["Defining Business Policy and Strategy", "Importance of Policy", "Introduction to Strategic Management"] },
      { day: 2, title: "Analyzing Company's External Environment", topics: ["External Environment Analysis", "Michael E. Porter's 5 Forces Model", "Industry Analysis"] },
      { day: 3, title: "Internal Analysis and Competitiveness", topics: ["Internal Analysis", "Competitive Advantage and Core Competence", "Organisational Capabilities"] },
    ]
  }
};

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // ── DEMO STATE ─
  const [demoState, setDemoState] = useState<"idle" | "loading" | "revealed">("idle");
  const [input, setInput] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [visibleCards, setVisibleCards] = useState<number>(0);
  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);

  // ── PAGE STATE ──
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── LEAD CAPTURE MODAL STATE ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", learn: "" });
  const [formError, setFormError] = useState<string | null>(null);

  // ── VISUAL ENGINE: STARS & COMETS ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      length: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5;
        this.size = Math.random() * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.length = Math.random() * 5 + 2;
      }
      
      update() {
        this.y -= 0.2 * this.z;
        if (this.y < -this.length) {
          this.y = height + this.length;
          this.x = Math.random() * width;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y + this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
      }
    }

    const stars = Array.from({ length: 300 }, () => new Star());
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── DEMO FUNCTIONS ──
  const handleGenerate = (overrideInput?: string) => {
    const rawInput = overrideInput || input;
    const query = rawInput.toLowerCase();
    if (!query) return;

    setInput(rawInput);
    setDemoState("loading");

    // Pick the right mock data or generate a personalized fallback
    if (query.includes("react") || query.includes("web") || query.includes("code")) {
      setActiveRoadmap(MOCK_ROADMAPS["react"]);
    } else if (query.includes("finance") || query.includes("money") || query.includes("invest")) {
      setActiveRoadmap(MOCK_ROADMAPS["finance"]);
    } else if (query.includes("business") || query.includes("strategy")) {
      setActiveRoadmap(MOCK_ROADMAPS["business"]);
    } else {
      // Personalized dynamic fallback
      const capitalizedInput = rawInput.charAt(0).toUpperCase() + rawInput.slice(1);
      setActiveRoadmap({
        subject: `${capitalizedInput} Mastery`,
        brain: "GENERAL",
        days: [
          { day: 1, title: `${capitalizedInput} Fundamentals`, topics: ["Core Concepts", "Key Terminology", "Setting up your foundation"] },
          { day: 2, title: `Intermediate ${capitalizedInput}`, topics: ["Practical Application", "Common Pitfalls", "Hands-on Exercise"] },
          { day: 3, title: `Advanced ${capitalizedInput} Integration`, topics: ["Complex Scenarios", "Best Practices", "Final Project Planning"] }
        ]
      });
    }

    // Upgraded Loading Sequence
    setLoadingText("Understanding your goal...");
    setTimeout(() => setLoadingText("Mapping the fastest path..."), 800);
    setTimeout(() => setLoadingText("Designing your daily plan..."), 1600);
    
    // Reveal Sequence
    setTimeout(() => {
      setDemoState("revealed");
      setTimeout(() => setVisibleCards(1), 400); // Mission Header
      setTimeout(() => setVisibleCards(2), 800); // Day 1
      setTimeout(() => setVisibleCards(3), 1200); // Day 2
      setTimeout(() => setVisibleCards(4), 1600); // Day 3
      setTimeout(() => setVisibleCards(5), 2000); // Illusion Card + CTA
    }, 2200);
  };

  const getBrainStyle = (type: string) => {
    switch (type) {
      case "CODING": return { icon: <Code className="w-4 h-4" />, color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", label: "CODING", time: "60-90 min" };
      case "FINANCE": return { icon: <TrendingUp className="w-4 h-4" />, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", label: "FINANCE", time: "45-60 min" };
      default: return { icon: <BookOpen className="w-4 h-4" />, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", label: "GENERAL", time: "30-45 min" };
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setFormError(null);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setFormData({ name: "", email: "", learn: "" });
    setIsSuccess(false);
    setFormError(null);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mpqopynk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          learn: formData.learn
        })
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#e3e3e3] overflow-x-hidden font-sans selection:bg-white/20 pb-32">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.7)] p-6 space-y-4 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Request Early Access</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
            </div>
            {!isSuccess ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">What do you want to learn? (optional)</label>
                  <textarea
                    value={formData.learn}
                    onChange={(e) => setFormData({ ...formData, learn: e.target.value })}
                    rows={3}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]/60 resize-none"
                  />
                </div>
                {formError && (
                  <p className="text-xs text-red-400">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] ${
                    isSubmitting
                      ? "bg-white/20 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.01]"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Join the Waitlist"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center space-y-3 py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">You're on the list 🚀</h4>
                <p className="text-sm text-gray-300">We'll invite you soon.</p>
                <button
                  onClick={closeModal}
                  className="mt-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm text-white border border-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. TOP NAVIGATION */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-4 md:p-6 md:px-10">
        <div 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-white w-40 h-10"
        >
          <LogoFull />
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Interactive Demo</a>
          <a href="#pricing" className="hover:text-white transition-colors">How it works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={openModal}
            className="text-xs font-medium text-gray-300 hover:text-white transition-colors hidden sm:block"
          >
            Request Early Access
          </button>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] text-white px-3.5 py-1.5 text-[11px] sm:px-5 sm:py-2 sm:text-xs rounded-full font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02]"
          >
            Request Early Access
          </button>
        </div>
      </nav>

      {/* 2 & 3. HERO & INTERACTIVE DEMO (3D Side-by-Side Layout) */}
<div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[90vh] flex flex-col lg:flex-row items-center justify-between pt-32 lg:pt-24 pb-8 px-6 xl:px-12 gap-12 lg:gap-8 overflow-visible">
  
  {/* ======================================= */}
  {/* LEFT COLUMN: HERO TEXT                  */}
  {/* ======================================= */}
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[45%] max-w-2xl lg:max-w-none z-30 shrink-0">
  
  {/* Eyebrow (Reduced Size & Padding) */}
  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-sm">
    <span className="text-[10px] md:text-[11px] font-medium text-[#00E5FF] tracking-wide">
      For students who don't know what to study next
    </span>
  </div>

  {/* Headline (SEO Optimized) */}
  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[2.75rem] font-bold text-white mb-4 tracking-tight drop-shadow-xl leading-[1.2]">
    Stop guessing what to study.<br />
    Turn any goal into a{" "}
    <span className="relative inline-block mt-1 lg:mt-0">
      <span 
        className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] bg-clip-text text-transparent blur-sm opacity-40 select-none" 
        aria-hidden="true"
      >
        clear, structured learning plan.
      </span>
      <span className="relative bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] bg-clip-text text-transparent">
        clear, structured learning plan.
      </span>
    </span>
  </h1>

  {/* SEO CRAWLER TRAP: Hidden from users, visible to Google */}
  <p className="sr-only">
    AxxelerateAI is an AI-powered learning system and AI study planner that builds structured roadmaps to help you achieve your goals. Turn any syllabus into actionable daily tasks.
  </p>

  {/* Subheadline & Support Line */}
  <div className="flex flex-col gap-2.5 mb-7 max-w-[460px]">
    <h2 className="text-sm md:text-base xl:text-[17px] text-gray-200 font-medium leading-relaxed">
      Get a clear roadmap, daily tasks, and built-in consistency — so you always know what to do next.
    </h2>
    <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed font-normal">
      Paste a syllabus, describe your goal, or upload content. We turn it into structured daily tasks with explanations, practice, and progress tracking.
    </p>
  </div>

  {/* CTA Button */}
  <button
    onClick={openModal}
    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] text-white font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02]"
  >
    <span>Request Early Access</span>
    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
  </button>
</div>


  {/* ======================================= */}
  {/* RIGHT COLUMN: 3D INTERACTIVE DEMO       */}
  {/* ======================================= */}
  <div className="w-full lg:w-[60%] max-w-2xl lg:max-w-none flex justify-center lg:justify-end relative z-20 lg:translate-x-[15%] xl:translate-x-[20%] [perspective:2000px]">
    
    {/* Ambient Glow behind the window */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 via-[#8B5CF6]/15 to-[#FF0080]/10 blur-[120px] rounded-full pointer-events-none" />

    {/* THE APPLE MAC OS MOCKUP WINDOW */}
    <div 
      className="relative w-full h-[550px] sm:h-[650px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[-30px_30px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden group hover:border-white/20 transition-all duration-700 origin-left"
      style={{
        transform: "rotateY(-12deg) rotateX(4deg) rotateZ(-1deg)",
        transformStyle: "preserve-3d",
        WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)"
      }}
    >
      
      {/* Mockup Top Bar (macOS Menu Bar) */}
      <div className="h-8 border-b border-white/10 bg-black/80 flex items-center justify-between px-4 shrink-0 z-20 text-[#e3e3e3] text-[10px] font-medium tracking-wide shadow-sm">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-current mb-[2px] opacity-90 hover:opacity-100 cursor-pointer">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.3zM207.8 88.5c20.7-25.2 34.6-59 30.5-92-25.8 2-57.2 17.3-77.9 42.6-17.5 21.3-33.3 56.1-28.4 88.8 28.6 3.1 58.1-13.8 75.8-39.4z"/>
          </svg>
          <span className="font-bold cursor-default">Axxelerate</span>
          <span className="hidden sm:inline hover:text-white cursor-default opacity-80 hover:opacity-100">File</span>
          <span className="hidden sm:inline hover:text-white cursor-default opacity-80 hover:opacity-100">Edit</span>
          <span className="hidden sm:inline hover:text-white cursor-default opacity-80 hover:opacity-100">View</span>
          <span className="hidden sm:inline hover:text-white cursor-default opacity-80 hover:opacity-100">Window</span>
          <span className="hidden sm:inline hover:text-white cursor-default opacity-80 hover:opacity-100">Help</span>
        </div>
        <div className="flex items-center gap-2.5 opacity-80">
          <BatteryFull className="w-3.5 h-3.5 hidden sm:block" />
          <Wifi className="w-3.5 h-3.5 hidden sm:block" />
          <Search className="w-3 h-3 hidden sm:block" />
          <Moon className="w-3 h-3 hidden sm:block" />
          <SlidersHorizontal className="w-3 h-3 hidden sm:block" />
          <span className="cursor-default text-[9px] sm:text-[10px]">Tue Mar 24&nbsp;&nbsp;11:02 AM</span>
        </div>
      </div>

      {/* Demo Content Area */}
      <div className="flex-1 relative flex flex-col p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/40 to-[#050505]">

        {/* --- STATE 1: IDLE --- */}
        <div className={`w-full flex flex-col items-center justify-center h-[90%] transition-all duration-700 ease-in-out absolute inset-0 p-6 ${demoState !== "idle" ? "-translate-y-12 scale-90 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
          <div className="text-center mb-6 w-full">
            <h2 className="text-[9px] font-bold tracking-widest text-[#00E5FF] uppercase mb-2">Live Preview</h2>
            <p className="text-lg sm:text-xl font-bold text-white leading-tight">Tell us your goal.</p>
            <p className="text-xs text-gray-400 mt-1.5">Watch it turn into a structured plan.</p>
          </div>

          <div className="relative group/input shadow-2xl w-full max-w-sm">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] rounded-xl blur opacity-30 group-hover/input:opacity-60 transition duration-1000 group-hover/input:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-[#111111] border border-white/10 rounded-xl p-1.5 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g. Learn React from scratch"
                className="w-full bg-transparent border-none outline-none text-white text-xs py-2.5 pl-3 placeholder:text-gray-600"
              />
              <button 
                onClick={() => handleGenerate()}
                className="w-full sm:w-auto px-4 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-[11px] shadow-md"
              >
                Build My Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 mt-5 w-full max-w-sm">
            <span className="text-[9px] text-gray-500 w-full text-center mb-0.5">Try:</span>
            {["Business Strategies", "Personal Finance", "Crack DSA"].map((suggestion) => (
              <button 
                key={suggestion}
                onClick={() => { setInput(suggestion); handleGenerate(suggestion); }}
                className="px-2.5 py-1 rounded-full border border-white/10 bg-[#050505] text-gray-400 hover:text-white hover:border-[#8B5CF6]/50 transition-all text-[10px] shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* --- STATE 2 & 3: LOADING & REVEALED --- */}
        <div className={`w-full flex flex-col items-center transition-all duration-1000 ${demoState === "idle" ? "opacity-0 translate-y-12 pointer-events-none absolute" : "opacity-100 translate-y-0 relative"}`}>
          
          <div className="bg-[#111111] border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[10px] text-gray-300 mb-5 shrink-0 w-full max-w-sm overflow-hidden shadow-md">
            <Sparkles className="w-3 h-3 text-[#8B5CF6] shrink-0" />
            <span className="truncate">Goal: <strong className="text-white">{input}</strong></span>
          </div>

          {demoState === "loading" && (
            <div className="flex flex-col items-center justify-center h-40 animate-in fade-in zoom-in duration-500">
               <div className="flex gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#FF0080] rounded-full animate-bounce delay-200"></div>
                </div>
              <div className="text-xs font-mono text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse">
                {loadingText}
              </div>
            </div>
          )}

          {demoState === "revealed" && activeRoadmap && (
            <div className="w-full flex flex-col items-center pb-20"> 
              
              <div className="relative flex flex-col itemscenter w-full max-w-sm space-y-3">
                <div className={`relative w-full transition-all duration-700 transform ${visibleCards >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <div className="bg-[#111111] border border-white/10 rounded-xl p-3 flex flex-col items-center text-center shadow-md">
                    <div className="text-[8px] uppercase font-bold tracking-widest text-gray-500 mb-1">Mission Objective</div>
                    <h3 className="text-sm font-bold text-white">{activeRoadmap.subject}</h3>
                  </div>
                </div>

                {activeRoadmap.days.map((day: any, idx: number) => {
                  const isVisible = visibleCards >= idx + 2; 
                  const isFirstDay = idx === 0;
                  const style = getBrainStyle(activeRoadmap.brain);

                  return (
                    <div key={day.day} className={`relative w-full transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                      <div className="absolute -top-3 left-1/2 w-px h-3 bg-white/10 -translate-x-1/2"></div>
                      
                      <div className={`${style.bg} border ${isFirstDay ? 'border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : style.border} rounded-xl p-2.5 shadow-md`}>
                        <div className="flex justify-between items-center mb-1.5">
                            <div className={`text-[8px] uppercase font-bold tracking-widest ${style.color}`}>Day {day.day}</div>
                            <div className={`flex items-center gap-1 px-1 py-0.5 rounded flex bg-black/40 ${style.color} text-[7px] font-bold border border-white/5`}>
                                <Clock className="w-2 h-2" /> {style.time}
                            </div>
                        </div>
                        <div className="text-xs font-bold text-white mb-1.5 leading-tight">{day.title}</div>
                        <div className="flex flex-wrap gap-1 mt-1 border-t border-white/10 pt-1.5">
                            {day.topics.map((topic: string, i: number) => (
                              <span key={i} className="text-[8px] bg-black/40 text-gray-300 px-1.5 py-0.5 rounded border border-white/5 flex items-center gap-1">
                                  <div className={`w-1 h-1 rounded-full ${style.color.replace('text-', 'bg-')}`}></div> {topic}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* CTA inside the App Window */}
                <div className={`w-full flex flex-col items-center mt-6 transition-all duration-1000 transform ${visibleCards >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 font-medium mb-3 text-center tracking-wide">
                    You can start this right now — Day 1 is ready.
                  </p>
                  <button 
                    onClick={openModal}
                    className="w-full px-3 py-2 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 text-[11px]"
                  >
                    Request Early Access <ArrowRight className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => {
                      setDemoState("idle");
                      setInput("");
                      setVisibleCards(0);
                    }}
                    className="mt-3 text-[9px] text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                  >
                    ↺ Try another topic
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

{/* 4. TRUST SECTION (Real Credibility) */}
<div className="relative w-full py-16 flex flex-col items-center justify-center z-10 bg-black/20">
  
  {/* Heading */}
  <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-10 text-center px-4">
    Backed by programs from
  </h3>

  {/* Logos Container */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
    
    {/* Microsoft */}
    <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-base tracking-tight">Microsoft</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">
          for Startups
        </span>
      </div>
    </div>

    {/* GitHub */}
    <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 
        0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
        C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
        1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 
        3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
        0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
        0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 
        1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 
        3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
        1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 
        .42.36.81 1.096.81 2.22 
        0 1.606-.015 2.896-.015 3.286 
        0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297
        c0-6.627-5.373-12-12-12"/>
      </svg>
      <span className="font-semibold text-base tracking-tight">GitHub</span>
    </div>

  </div>

  {/* Supporting Line */}
  <p className="mt-8 text-xs text-gray-500 text-center max-w-md leading-relaxed">
    Selected in Microsoft for Startups and GitHub Developer Program
  </p>

</div>
      
      {/* 5. HOW IT WORKS */}
<div id="how-it-works" className="relative z-10 w-full max-w-6xl mx-auto pt-28 px-6 pb-20">
  
  {/* Heading */}
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
      From goal to progress — in minutes
    </h2>
    <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
      AxxelerateAI builds your entire learning system — from planning to execution.
    </p>
  </div>

  {/* Tabs */}
  <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 border-b border-white/5">
    {howItWorksSteps.map((step, idx) => {
      const isActive = activeStep === idx;

      return (
        <button
          key={step.id}
          onClick={() => {
            setActiveStep(idx);
            setProgress(0);
          }}
          className={`relative px-4 py-2.5 rounded-t-xl text-xs md:text-sm font-medium transition-colors duration-300 focus:outline-none ${
            isActive
              ? "text-white bg-white/5"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
          }`}
        >
          {/* ✅ CLEAN TAB TEXT */}
          <span className="relative z-10">{step.tab}</span>

          {/* Progress Bar */}
          {isActive && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${step.glowColor}`}
                style={{
                  width: `${progress}%`,
                  transition: "width 250ms linear",
                }}
              />
            </div>
          )}
        </button>
      );
    })}
  </div>

  {/* Dynamic Heading */}
  <div className="text-center max-w-2xl mx-auto mb-10 min-h-[90px] md:min-h-[70px]">
    <h3 className="text-xl font-bold text-white mb-2">
      {howItWorksSteps[activeStep]?.heading}
    </h3>
    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
      {howItWorksSteps[activeStep]?.desc}
    </p>
  </div>

  {/* Video Container */}
  <div className="relative w-full max-w-5xl mx-auto aspect-[19/9] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-500">

    {/* Top Bar */}
    <div className="h-7 border-b border-white/10 bg-black flex items-center justify-between px-3 shrink-0 z-20 text-[#e3e3e3] text-[10px] font-medium tracking-wide shadow-sm">
      <div className="flex itemscenter gap-3">
        <svg viewBox="0 0 384 512" className="w-3 h-3 fill-current mb-[2px] opacity-90">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.3zM207.8 88.5c20.7-25.2 34.6-59 30.5-92-25.8 2-57.2 17.3-77.9 42.6-17.5 21.3-33.3 56.1-28.4 88.8 28.6 3.1 58.1-13.8 75.8-39.4z"/>
        </svg>
        <span className="font-bold cursor-default">Axxelerate</span>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 opacity-80">
        <BatteryFull className="w-3.5 h-3.5 hidden sm:block" />
        <Wifi className="w-3.5 h-3.5 hidden sm:block" />
        <Search className="w-3 h-3 hidden sm:block" />
      </div>
    </div>

    {/* Video Area */}
    <div className="flex-1 relative bg-[#050505] overflow-hidden">
      {howItWorksSteps.map((step, idx) => {
        if (activeStep !== idx) return null;

        return (
          <div key={step.id} className="absolute inset-0 w-full h-full z-50 animate-in fade-in duration-500">
            <video
              src={step.videoPath}
              autoPlay
              muted
              playsInline

              onTimeUpdate={(e) => {
                const current = e.currentTarget.currentTime;
                const duration = e.currentTarget.duration;

                if (duration > 0) {
                  setProgress((current / duration) * 100);
                }
              }}

              onEnded={() => {
                setProgress(0);
                setActiveStep((prev) => {
                  const next = prev + 1;
                  return next >= howItWorksSteps.length ? 0 : next;
                });
              }}

              className="w-full h-full object-contain md:object-cover object-center bg-black md:bg-transparent"
            />
          </div>
        );
      })}
    </div>
  </div>
</div>

{/* 6. THE HEADQUARTERS (Bento Grid) */}
<div id="headquarters" className="relative z-10 w-full max-w-6xl mx-auto pt-28 px-6 pb-20 border-t border-white/5">
  
  <div className="text-center mb-14 relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
      Your entire learning system. In one place.
    </h2>
    <p className="max-w-xl mx-auto text-base text-gray-400 leading-relaxed mb-3">
      Plan your days, track your progress, stay consistent, and master concepts — without switching between tools.
    </p>
    {/* THE POWERFUL STRATEGIC LINE */}
    <p className="max-w-xl mx-auto text-sm font-medium text-[#00E5FF] tracking-wide">
      Everything works together — not as separate tools, but as one system.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
    
    <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
      
      {/* LEFT ROW 1: WEEKLY PLAN */}
      <div className="bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="relative bg-[#050505] overflow-hidden w-full">
          <video 
            src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774705754/Bhuvi_s_video_mbdouh.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="block w-full h-auto scale-100 group-hover:scale-105 transition-transform duration-700" 
          />
        </div>
        <div className="relative z-20 p-5 border-t border-white/5 bg-gradient-to-r from-blue-500/15 to-[#0a0a0a]">
          <h3 className="text-lg font-bold mb-1 text-blue-400">
            See your entire learning plan
          </h3>
          <p className="text-xs text-gray-400">Know exactly what to study each day — across all your subjects.</p>
        </div>
      </div>

      {/* LEFT ROW 2: DAY PLANNER & XP */}
      <div className="flex flex-col md:flex-row gap-5">
        
        {/* Planner */}
        <div className="flex-1 bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="relative bg-[#050505] overflow-hidden w-full">
            <video 
              src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774705754/Planner_fv6qi4.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="block w-full h-auto scale-95 group-hover:scale-100 transition-transform duration-700" 
            />
          </div>
          <div className="relative z-20 p-4 border-t border-white/5 bg-gradient-to-r from-emerald-500/15 to-[#0a0a0a]">
            <h3 className="text-base font-bold mb-1 text-emerald-400">
              Your day, automatically planned
            </h3>
            <p className="text-xs text-gray-400">Your schedule adapts based on your progress and workload.</p>
          </div>
        </div>
        
        {/* XP */}
        <div className="flex-1 bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="relative bg-[#050505] overflow-hidden w-full">
            <video 
              src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774705753/Xp_v4aorx.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="block w-full h-auto scale-95 group-hover:scale-100 transition-transform duration-700" 
            />
          </div>
          <div className="relative z-20 p-4 border-t border-white/5 bg-gradient-to-r from-purple-500/15 to-[#0a0a0a]">
            <h3 className="text-base font-bold mb-1 text-purple-400">
              Stay motivated with real progress
            </h3>
            <p className="text-xs text-gray-400">Earn XP, track consistency, and build momentum every day.</p>
          </div>
        </div>
      </div>

    </div>

    <div className="col-span-1 flex flex-col gap-5">
      
      {/* RIGHT TOP: FLASHCARDS */}
      <div className="flex-1 bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex-1 relative bg-[#050505] overflow-hidden min-h-[565px] md:min-h-0">
          <video 
            src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774717071/flashcards_sasvpv.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover object-center scale-90 group-hover:scale-95 transition-transform duration-700" 
          />
        </div>
        <div className="relative z-20 p-5 border-t border-white/5 bg-gradient-to-r from-yellow-500/15 to-[#0a0a0a]">
          <h3 className="text-lg font-bold mb-1 text-yellow-400">
            Practice and revise instantly
          </h3>
          <p className="text-xs text-gray-400">Get flashcards, quizzes, and questions generated for what you're learning.</p>
        </div>
      </div>

      {/* RIGHT BOTTOM: POMODORO */}
      <div className="flex-1 bg-[#111111] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex-1 relative bg-[#050505] overflow-hidden min-h-[565px] md:min-h-0">
          <video 
            src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774726491/pomodoroo_pcr7dz.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-contain object-center scale-140 group-hover:scale-145 transition-transform duration-700" 
          />
        </div>
        <div className="relative z-20 p-5 border-t border-white/5 bg-gradient-to-r from-red-500/15 to-[#0a0a0a]">
          <h3 className="text-lg font-bold mb-1 text-red-400">
            Stay focused without distractions
          </h3>
          <p className="text-xs text-gray-400">Built-in Pomodoro and focus tools to help you stay consistent.</p>
        </div>
      </div>

    </div>

  </div>
</div>

{/* 7. THE PROGRESSION SHOWCASE (Continue Courses) */}
<div id="continue-courses" className="relative z-10 w-full max-w-6xl mx-auto pt-28 px-6 border-t border-white/5">
  
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
      Never lose momentum. <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3B82F6]">
        Pick up exactly where you left off.
      </span>
    </h2>
    <p className="max-w-2xl mx-auto text-base text-gray-400 leading-relaxed mt-5">
      Your learning is always ready. Continue your roadmap, lessons, and tasks without thinking what to do next.
    </p>
  </div>

  <div className="relative w-full bg-[#111111] border border-white/10 rounded-[2rem] p-5 md:p-8 lg:p-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_100px_rgba(0,0,0,0.7)] group">
    
    <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#4F46E5]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
    <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

    <div className="relative z-10 mb-6 md:mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
        Continue instantly
      </h3>
      <p className="text-gray-400 text-sm max-w-lg">
        Your active roadmap, lessons, and progress are always in sync — just continue.
      </p>
    </div>

    <div className="relative z-10 w-full aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      <video 
        src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774705754/continue_uw0ymu.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover origin-center scale-[1.00] transition-transform duration-1000 group-hover:scale-[1.05]" 
      />
    </div>

  </div>
</div>

{/* 8. THE ANALYTICS SHOWCASE (Seamless Blitzit Style) */}
<div id="analytics" className="relative z-10 w-full max-w-6xl mx-auto pt-28 pb-28 px-6 border-t border-white/5">
  
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
      See how you’re actually improving <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">
        Track your progress. Improve faster.
      </span>
    </h2>
  </div>

  <div className="relative w-full bg-[#111111] border border-white/10 rounded-[2rem] p-5 md:p-8 lg:p-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_100px_rgba(0,0,0,0.7)] group">
    
    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#8B5CF6]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#00E5FF]/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

    <div className="relative z-10 mb-6 md:mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
        Track your real progress
      </h3>
      <p className="text-gray-400 text-sm max-w-lg mb-3">
        See your consistency, time spent, and learning patterns — so you know what’s working and what’s not.
      </p>
      {/* THE POWERFUL STRATEGIC LINE */}
      <p className="text-sm font-medium text-[#00E5FF] tracking-wide">
        Clarity creates consistency.
      </p>
    </div>

    <div className="relative z-10 w-full aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      <video 
        src="https://res.cloudinary.com/dsgnnujgx/video/upload/v1774712927/analysis_b6cait.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover origin-center scale-[1.08] transition-transform duration-1000 group-hover:scale-[1.10]" 
      />
    </div>

  </div>
</div>

      {/* 9. ALUMNI & PARTNERS MARQUEE */}
      <div className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden z-10 border-t border-white/5 bg-black/20">
        
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-8 text-center px-4">
          Join Professionals & Students From
        </h3>
        
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
        
        <div className="flex w-full overflow-hidden group">
          
          <div className="flex shrink-0 items-center justify-around w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {[
              { name: "SSCBS", src: "/logos/sscbs.png" },
              { name: "IIT Madras", src: "/logos/iit-madras.png" },
              { name: "IIT BHU", src: "/logos/iit-bhu.png" },
              { name: "FMS Delhi", src: "/logos/fms.png" },
              { name: "ISB", src: "/logos/isb.png" },
              { name: "Adobe", src: "/logos/adobe.png" },
              { name: "Bain & Company", src: "/logos/bain.png" }
            ].map((logo, i) => (
              <div key={i} className="mx-10 flex items-center justify-center cursor-pointer group/logo">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="h-16 md:h-20 w-auto object-contain opacity-60 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-500" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-around w-max animate-infinite-scroll group-hover:[animation-play-state:paused] aria-hidden">
            {[
              { name: "SSCBS", src: "/logos/sscbs.png" },
              { name: "IIT Madras", src: "/logos/iit-madras.png" },
              { name: "IIT BHU", src: "/logos/iit-bhu.png" },
              { name: "FMS Delhi", src: "/logos/fms.png" },
              { name: "ISB", src: "/logos/isb.png" },
              { name: "Adobe", src: "/logos/adobe.png" },
              { name: "Bain & Company", src: "/logos/bain.png" }
            ].map((logo, i) => (
              <div key={i + 'dup'} className="mx-10 flex items-center justify-center cursor-pointer group/logo">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="h-16 md:h-20 w-auto object-contain opacity-60 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-500" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>

        {/* MISSING ANIMATION CSS ADDED BACK HERE */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-infinite-scroll {
            animation: scroll 30s linear infinite;
            will-change: transform;
            transform: translateZ(0);
          }
        `}} />
      </div>

      {/* 10. FAQs */}
      <div id="faq" className="relative z-10 w-full max-w-3xl mx-auto pt-16 pb-24 px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Got Questions?</h2>
          <p className="text-gray-400 text-sm">Everything you need to know about AxxelerateAI.</p>
        </div>

        {/* The Accordion */}
        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/5 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : 'bg-[#0a0a0a]/50 hover:bg-white/5'}`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-200 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* ADDED: Human Touch / Contact Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-400">
            Don't see your answer? Get in touch with us directly.
          </p>
          <div className="flex items-center gap-3">
            <a 
              href="mailto:contact@axxelerate.app" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-400 text-xs font-medium transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" /> contact@axxelerate.app
            </a>
            <a 
              href="https://www.instagram.com/axxelerateai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-400 text-xs font-medium transition-all shadow-sm"
            >
              <FaInstagram className="w-3.5 h-3.5" /> Instagram
            </a>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={openModal}
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* 11. FAT FOOTER (Blitzit Style) */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-[#050505] pt-14 pb-6 px-6 md:px-12 mt-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Row: Logo & CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-5">
            <div className="w-36 hover:opacity-80 transition-opacity cursor-pointer">
              <LogoFull />
            </div>
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0080] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:scale-105"
            >
              Request Early Access
            </button>
          </div>

          {/* Main Grid: Updated to lg:grid-cols-6 to fit the 4 link columns + 2-span Connect column */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-6 border-b border-white/10 pb-12">
            
            {/* Column 1: Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Product</h4>
              {["Features", "How It Works", "Interactive Demo", "Pricing"].map((link) => (
                <a key={link} href="#" className="text-xs text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* Column 2: Use Cases (POWERFUL FOR SEO/CLARITY) */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Use Cases</h4>
              {["For Students", "For Self-Learners", "For Placements", "For Skill Building"].map((link) => (
                <a key={link} href="#" className="text-xs text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Company</h4>
              {["About", "Blog", "Careers", "Contact"].map((link) => (
                <a key={link} href="#" className="text-xs text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* Column 4: Resources */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Resources</h4>
              {[
                { label: "Help Center", href: "#" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" }
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors w-fit">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Column 5 & 6: Connect With Us */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col gap-3 lg:pl-8">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Connect With Us</h4>

              {/* Email Pill */}
              <a
                href="mailto:contact@axxelerate.app"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-all w-fit mb-1"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@axxelerate.app
              </a>

              {/* Social Circles */}
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/company/axxelerateai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all group"
                >
                  <FaLinkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/axxelerateai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all group"
                >
                  <FaInstagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>

            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-600 font-medium">
            <p>AxxelerateAI © {new Date().getFullYear()}. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> All systems operational</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}