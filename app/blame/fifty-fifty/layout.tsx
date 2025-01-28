import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wheel of Fate | Who's Fault?",
  description:
    "Let the wheel of fate decide who's to blame! A fun and random way to resolve disputes with friends.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function FiftyFiftyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
