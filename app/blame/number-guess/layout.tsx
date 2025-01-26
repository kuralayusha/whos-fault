import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number's Verdict | Who's Fault?",
  description:
    "Pick your numbers and let fate decide who's guilty! A fun number guessing game to resolve disputes.",
};

export default function NumberGuessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
