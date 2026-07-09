"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const SESSION_KEY = "dudes-intro-shown";
const DURATION_MS = 1800;

export function IntroSplash({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) {
      setShowIntro(false);
      return;
    }
    setShowIntro(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShowIntro(false);
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro === null) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src="/dudes_logo_transparent.png"
                alt="Dudes Company"
                width={120}
                height={120}
                priority
              />
            </motion.div>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-zinc-200">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: DURATION_MS / 1000, ease: "easeInOut" }}
                className="h-full w-full bg-zinc-900"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
