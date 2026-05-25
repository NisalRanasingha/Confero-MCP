export default function Footer({ onOpenModal }) {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.15)"/>
              <circle cx="7" cy="7" r="2" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-600 text-sm text-slate-400">Confero Summit 2026</span>
        </div>

        <p className="font-body text-xs text-slate-600 text-center">
          October 15th, 2026 · Colombo, Sri Lanka · Powered by Confero Global Media Group
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenModal}
            className="btn-primary px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white text-xs font-medium transition-colors duration-200"
          >
            Secure Pass →
          </button>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 font-body transition-colors duration-200">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
