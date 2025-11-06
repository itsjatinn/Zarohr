export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="text-sm text-slate-500 text-center md:text-left">
          © {year} <span className="font-semibold text-slate-800">Zaro HR</span> — Cutting through Clutter.
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="/comingsoon"
            className="text-slate-500 hover:text-slate-950 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="/comingsoon"
            className="text-slate-500 hover:text-slate-950 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="/comingsoon"
            className="text-slate-500 hover:text-slate-950 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
