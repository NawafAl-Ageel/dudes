import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دودز كلوب — Dudes Club",
  description: "براند ملابس رياضية سعودي للشباب. لسنا مجرد ملابس، نحن استراتيجية.",
};

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
