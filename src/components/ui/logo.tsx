import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** Size in px applied to width & height. Defaults to 48. */
  size?: number;
  /** Tailwind text-* class controls fill color via currentColor. */
  className?: string;
}

/**
 * Devmob logo mark — paper-plane geometric symbol.
 * Uses `currentColor`, so style it with `text-white`, `text-blue-400`, etc.
 */
export function LogoMark({ size = 48, className, ...rest }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      fill="currentColor"
      role="img"
      aria-label="Devmob logo"
      className={cn("inline-block shrink-0", className)}
      {...rest}
    >
      <path d="M435.451 564.919C441.558 557.993 458.233 544.95 465.876 538.495L519.371 492.764L666.575 366.406C694.099 342.61 723.761 317.995 749.917 293.082C747.97 298.63 742.802 308.612 740.033 314.166L726.479 341.699L688.049 420.171L603.709 591.051C594.34 609.93 585.203 629.308 575.603 648.032C548.615 631.788 521.671 612.943 494.567 596.63C481.974 589.051 468.33 579.156 455.05 573.125C450.36 570.295 440.344 566.181 435.166 563.96C440.299 568.899 445.379 573.894 450.747 578.575C471.573 597.102 492.625 615.374 513.899 633.386C496.654 659.02 478.682 684.113 462.325 710.361C457.935 717.406 453.401 725.156 448.481 731.788C448.235 710.244 445.185 683.512 443.348 661.671L435.451 564.919Z" />
      <path d="M746.01 294.004C746.401 294.343 746.236 294.11 746.357 294.786C741.563 299.888 727.786 308.204 721.5 312.185L694.316 329.616L618.14 379.103C543.246 428.363 468.692 480.752 394.375 531.09C369.593 516.178 344.21 501.75 319.25 487.081L273.657 461.416C282.798 457.502 299.96 452.258 310.168 448.666L382.145 422.865L633.044 333.761L706.413 307.973C719.319 303.452 733.382 298.905 746.01 294.004Z" />
    </svg>
  );
}

export interface LogoLockupProps {
  /** Show the wordmark "DEVMOB" next to the mark. Default: true. */
  showWordmark?: boolean;
  /** Mark size in px. Default: 48. */
  size?: number;
  /** Wordmark text. Default: "DEVMOB". */
  wordmark?: string;
  /** Layout: 'horizontal' (mark + wordmark side-by-side) or 'stacked'. Default: 'horizontal'. */
  layout?: "horizontal" | "stacked";
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}

/**
 * Brand lockup: mark + optional wordmark.
 * Used everywhere the brand identity needs to appear (header, hero card, etc).
 */
export function Logo({
  showWordmark = true,
  size = 48,
  wordmark = "DEVMOB",
  layout = "horizontal",
  className,
  markClassName,
  wordmarkClassName,
}: LogoLockupProps) {
  return (
    <div
      className={cn(
        "flex items-center select-none",
        layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2",
        className,
      )}
    >
      <LogoMark size={size} className={markClassName} />
      {showWordmark && (
        <span
          className={cn(
            "font-black tracking-tighter leading-none uppercase",
            wordmarkClassName,
          )}
          style={{ fontSize: `${size * 0.55}px` }}
        >
          {wordmark}
        </span>
      )}
    </div>
  );
}
