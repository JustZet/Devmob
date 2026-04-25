"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, Copy, Check, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_EMAIL = "devmobplatform@gmail.com";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [copied, setCopied] = useState(false);

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
            .to(".contact-detail", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.7");
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-36 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background orb that follows pointer */}
      <div
        ref={orbRef}
        className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[120px] animate-blob" />
        <div className="absolute inset-10 rounded-full bg-indigo-500/15 blur-[100px] animate-blob [animation-delay:-4s]" />
        <div className="absolute inset-24 rounded-full bg-cyan-500/10 blur-[80px] animate-blob [animation-delay:-8s]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <span className="contact-eyebrow inline-block text-xs uppercase tracking-[0.3em] font-bold text-blue-400 mb-5">
          Contact
        </span>
        <h2 className="contact-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Let&apos;s build your next mobile app.
          </span>
        </h2>
        <p className="contact-sub text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
          Tell us about your project — Android (Java/Kotlin) or Flutter cross-platform.
          We&apos;ll get back within one business day.
        </p>

        {/* Glass card with email */}
        <div
          ref={cardRef}
          className="contact-card relative mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 md:p-12 backdrop-blur-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden group"
          style={{
            backgroundImage:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.10), transparent 40%)",
          }}
        >
          {/* Card sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.06), transparent 40%)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-700/10 border border-blue-400/30 flex items-center justify-center shadow-inner">
              <Mail className="w-7 h-7 text-blue-300" strokeWidth={2} />
            </div>

            <div className="contact-detail flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-blue-300/80">
                Email us at
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20%E2%80%94%20Devmob`}
                className="group/email relative text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white hover:text-blue-200 transition-colors break-all md:break-normal"
              >
                <span className="relative">
                  {CONTACT_EMAIL}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover/email:w-full transition-all duration-500" />
                </span>
              </a>
            </div>

            <div className="contact-detail flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20%E2%80%94%20Devmob&body=Hi%20Devmob%20team%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20mobile%20app%20project%3A%0A%0A-%20Platform(s)%3A%20%0A-%20Brief%20description%3A%20%0A-%20Timeline%3A%20%0A%0AThanks%21`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-semibold text-sm md:text-base shadow-[0_10px_30px_-5px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
              >
                <Send className="w-4 h-4" strokeWidth={2.5} />
                Send us an email
                <ArrowUpRight className="w-4 h-4 opacity-70" strokeWidth={2.5} />
              </a>
              <button
                type="button"
                onClick={onCopy}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-sm md:text-base backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
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

            <div className="contact-detail w-full pt-6 mt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-blue-300/70 mb-1">Response time</p>
                <p className="text-sm text-white/80">Within 1 business day</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-blue-300/70 mb-1">Stack</p>
                <p className="text-sm text-white/80">Android · Java · Kotlin · Flutter</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-blue-300/70 mb-1">Engagements</p>
                <p className="text-sm text-white/80">From MVP to long-term builds</p>
              </div>
            </div>
          </div>
        </div>

        <p className="contact-detail text-xs text-muted-foreground/70 mt-10" suppressHydrationWarning>
          © {new Date().getFullYear()} Devmob — Mobile app development.
        </p>
      </div>
    </section>
  );
}
