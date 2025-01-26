import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Judge | Who's Fault?",
  description:
    "Let our AI judge analyze your stories and deliver a ruthless verdict. Get a psychological analysis of who's really to blame!",
};

export default function AIAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
