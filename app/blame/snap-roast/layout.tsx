import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapRoast - AI Photo Roaster",
  description: "Upload your photo and let AI roast you with its witty analysis",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function SnapRoastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {children}
    </div>
  );
}
