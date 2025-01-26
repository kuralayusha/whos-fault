import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 p-2 sm:p-4">
      <Link
        href="https://linknots.com/kuralayusha"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-sm text-slate-400 hover:text-slate-300 transition-colors"
      >
        powered by Kuralayusha
      </Link>
    </footer>
  );
}
