import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SurveyForm } from "@/components/SurveyForm";

export default function SurveyPage() {
  return (
    <div className="grain relative flex min-h-screen flex-col overflow-x-hidden">
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Image
          src="/assets/logo_transparent_background.png"
          alt="Dudes"
          width={110}
          height={44}
          className="logo-mark"
        />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center">
        <SurveyForm />
      </main>
    </div>
  );
}
