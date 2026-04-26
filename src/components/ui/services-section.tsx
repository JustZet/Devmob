"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Layers, Zap, ShieldCheck, Code2, Rocket } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: Smartphone,
    title: "Pure Android — Java",
    body: "Production Android apps written in Java, leveraging the Android SDK directly for maximum control and stability on legacy and modern devices.",
    accent: "from-blue-500/20 to-blue-700/5 border-blue-400/30 text-blue-600 dark:text-blue-300",
  },
  {
    icon: Code2,
    title: "Pure Android — Kotlin",
    body: "Modern, idiomatic Kotlin with Coroutines, Flow and Jetpack Compose — concise code, safer null handling, and first-class Android tooling.",
    accent: "from-violet-500/20 to-violet-700/5 border-violet-400/30 text-violet-600 dark:text-violet-300",
  },
  {
    icon: Layers,
    title: "Cross-Platform — Flutter",
    body: "One codebase, two stores. Flutter apps for iOS and Android with pixel-perfect UI, smooth 60fps animations, and rapid release cycles.",
    accent: "from-cyan-500/20 to-cyan-700/5 border-cyan-400/30 text-cyan-600 dark:text-cyan-300",
  },
  {
    icon: Zap,
    title: "Performance-First",
    body: "Profiled, optimized builds — fast cold starts, low memory pressure, and smooth scrolling. We measure before we ship.",
    accent: "from-amber-500/20 to-amber-700/5 border-amber-400/30 text-amber-600 dark:text-amber-300",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    body: "Encrypted storage, certificate pinning, secure auth flows, and Play Store / App Store compliance baked in from day one.",
    accent: "from-emerald-500/20 to-emerald-700/5 border-emerald-400/30 text-emerald-600 dark:text-emerald-300",
  },
  {
    icon: Rocket,
    title: "From Idea to Store",
    body: "Discovery, design, build, beta, release. We handle the full delivery pipeline — Play Console and App Store Connect included.",
    accent: "from-pink-500/20 to-pink-700/5 border-pink-400/30 text-pink-600 dark:text-pink-300",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".service-card", { autoAlpha: 0, y: 40 });
      gsap.set(".services-heading", { autoAlpha: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(".services-heading", {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
          });
          gsap.to(".service-card", {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            delay: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* Subtle grid backdrop — uses theme foreground so it adapts */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 35%, transparent) 1px, transparent 1px)",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="services-heading text-center mb-16 md:mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
            What we build
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Native Android &amp; <span className="text-primary">Cross-Platform</span> apps
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Devmob delivers mobile apps end-to-end — pure Android in Java or Kotlin when you need
            full platform power, and Flutter when you need to ship to iOS and Android in one go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={i}
                className="service-card group relative rounded-2xl border border-border-strong/40 bg-card p-6 md:p-7 backdrop-blur-sm transition-all duration-500 hover:border-border-strong hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_hsl(var(--foreground)/0.25)]"
              >
                <div
                  className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} border flex items-center justify-center mb-5 shadow-inner`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
                <div
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
