import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "استبيان دودز كلوب — Dudes Club",
  description: "شاركنا رأيك في مجموعة دودز كلوب القادمة.",
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
