import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { ServicesSection } from "@/components/ui/services-section";
import { ContactSection } from "@/components/ui/contact-section";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen bg-background">
      <ThemeToggle />
      <CinematicHero />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
