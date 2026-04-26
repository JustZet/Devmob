"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, Copy, Check, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_EMAIL = "contact@devmob.app";

// Web3Forms access key — set NEXT_PUBLIC_WEB3FORMS_KEY in Cloudflare env vars.
// Get a free key at https://web3forms.com (250 free submissions / month).
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const requestRef = useRef<number>(0);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Pointer-driven sheen + orb parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mx", `${mx}px`);
        cardRef.current.style.setProperty("--my", `${my}px`);

        if (orbRef.current) {
          const xVal = (e.clientX / window.innerWidth - 0.5) * 30;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 30;
          gsap.to(orbRef.current, {
            x: xVal,
            y: yVal,
            ease: "power3.out",
            duration: 1.4,
          });
        }
      });
    };

    const card = cardRef.current;
    card?.addEventListener("mousemove", handleMove);
    return () => {
      card?.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".contact-eyebrow", { autoAlpha: 0, y: 20 });
      gsap.set(".contact-heading", { autoAlpha: 0, y: 40, scale: 0.95, filter: "blur(12px)" });
      gsap.set(".contact-sub", { autoAlpha: 0, y: 20 });
      gsap.set(".contact-card", { autoAlpha: 0, y: 60, scale: 0.96 });
      gsap.set(".contact-detail", { autoAlpha: 0, y: 20 });
      gsap.set(".contact-orb", { autoAlpha: 0, scale: 0.7 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(".contact-orb", { autoAlpha: 1, scale: 1, duration: 1.6 })
            .to(".contact-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=1.2")
            .to(".contact-heading", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 }, "-=0.6")
            .to(".contact-sub", { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.9")
            .to(".contact-card", { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, "-=0.7")
            .to(".contact-detail", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.7");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New project inquiry — devmob.app");
    formData.append("from_name", "Devmob Website");
    formData.append("replyto", String(formData.get("email") || ""));
    formData.append("botcheck", ""); // honeypot (Web3Forms convention)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          data.message ||
            "We couldn't send your message right now. Please email us directly.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your connection or email us directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-36 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background orb that follows pointer (subtle, refined) */}
      <div
        ref={orbRef}
        className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/[0.12] blur-[120px] animate-blob" />
        <div className="absolute inset-10 rounded-full bg-indigo-500/[0.10] blur-[100px] animate-blob [animation-delay:-4s]" />
        <div className="absolute inset-24 rounded-full bg-cyan-500/[0.06] blur-[80px] animate-blob [animation-delay:-8s]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <span className="contact-eyebrow inline-block text-xs uppercase tracking-[0.3em] font-semibold text-primary/90 mb-5">
          Contact
        </span>
        <h2 className="contact-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Let&apos;s build your next mobile app.
          </span>
        </h2>
        <p className="contact-sub text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
          Tell us about your project — Android (Java/Kotlin) or Flutter cross-platform.
          We&apos;ll get back within one business day.
        </p>

        {/* Refined glass card with email + form */}
        <div
          ref={cardRef}
          className="contact-card glass-surface relative mx-auto max-w-3xl rounded-3xl p-8 md:p-10 overflow-hidden group text-left"
          style={{
            backgroundImage:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), hsl(217 91% 60% / 0.08), transparent 40%)",
          }}
        >
          {/* Card sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), hsl(0 0% 100% / 0.05), transparent 40%)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-8">
            {/* Email block */}
            <div className="contact-detail flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center shadow-inner">
                <Mail className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-primary/80">
                  Email us at
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20%E2%80%94%20Devmob`}
                  className="group/email relative text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground hover:text-primary-foreground transition-colors break-all md:break-normal"
                >
                  <span className="relative">
                    {CONTACT_EMAIL}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-primary to-cyan-400 group-hover/email:w-full transition-all duration-500" />
                  </span>
                </a>
                <button
                  type="button"
                  onClick={onCopy}
                  aria-label="Copy email address"
                  className="mt-2 hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group/copy"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                      <span>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-60 group-hover/copy:opacity-100 transition-opacity" strokeWidth={2.5} />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile-only: mailto + copy buttons (opens phone's mail app) */}
            <div className="contact-detail flex md:hidden flex-col gap-3 w-full">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20%E2%80%94%20Devmob&body=Hi%20Devmob%20team%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20mobile%20app%20project%3A%0A%0A-%20Platform(s)%3A%20%0A-%20Brief%20description%3A%20%0A-%20Timeline%3A%20%0A%0AThanks%21`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-foreground text-background font-semibold text-sm shadow-[0_10px_30px_-5px_hsl(0_0%_100%/0.25)] active:translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                <Send className="w-4 h-4" strokeWidth={2.5} />
                Send us an email
                <ArrowUpRight className="w-4 h-4 opacity-70" strokeWidth={2.5} />
              </a>
              <button
                type="button"
                onClick={onCopy}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-border-strong text-foreground font-semibold text-sm backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" strokeWidth={2.5} />
                    Copy email
                  </>
                )}
              </button>
            </div>

            {/* Desktop-only: divider + Web3Forms message form */}
            <div className="contact-detail relative hidden md:flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground/60">
                or send a message
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
            </div>

            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="contact-detail hidden md:flex flex-col gap-4"
              noValidate
            >
              {/* Honeypot — hidden from real users, blocks bots */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    disabled={status === "sending"}
                    className="glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    disabled={status === "sending"}
                    className="glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your project — platform(s), timeline, budget range, what you want the app to do..."
                  disabled={status === "sending"}
                  className="glass-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-foreground text-background font-semibold text-sm shadow-[0_10px_30px_-5px_hsl(0_0%_100%/0.25)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_hsl(0_0%_100%/0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                      Message sent
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={2.5} />
                      Send message
                      <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-sm text-emerald-400 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-500">
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Thanks! We&apos;ll reply within 1 business day.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-sm text-red-400 flex items-start gap-2 animate-in fade-in slide-in-from-left-2 duration-500">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
                    <span>{errorMessage}</span>
                  </p>
                )}
              </div>
            </form>

            {/* Info pills footer */}
            <div className="contact-detail w-full pt-6 mt-2 border-t border-border-strong/30 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 mb-1">Response time</p>
                <p className="text-sm text-foreground/80">Within 1 business day</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 mb-1">Stack</p>
                <p className="text-sm text-foreground/80">Android · Java · Kotlin · Flutter</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-primary/70 mb-1">Engagements</p>
                <p className="text-sm text-foreground/80">From MVP to long-term builds</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-detail flex flex-col items-center gap-3 mt-10">
          <LogoMark size={28} className="text-foreground/30" />
          <p className="text-xs text-muted-foreground/70" suppressHydrationWarning>
            © {new Date().getFullYear()} Devmob — Mobile app development.
          </p>
        </div>
      </div>
    </section>
  );
}
