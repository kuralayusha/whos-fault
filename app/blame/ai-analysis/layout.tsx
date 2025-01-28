import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Judge | Who's Fault?",
  description:
    "Let our AI judge analyze your stories and deliver a ruthless verdict. Get a psychological analysis of who's really to blame!",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function AIAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
