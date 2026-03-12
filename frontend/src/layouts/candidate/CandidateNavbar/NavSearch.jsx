// navbar/NavSearch.jsx
import { useState, useRef, useEffect } from "react";
import { IconSearch, IconClock, IconTrending } from "./NavIcons";

const RECENT = [
  "Full Stack Developer jobs",
  "React internships Kolkata",
  "Remote Python roles",
];

const TRENDING = [
  "HireNexon Contests 2026",
  "AI Engineer openings",
  "Frontend jobs ₹20L+",
];

const NavSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = query.trim()
    ? [...RECENT, ...TRENDING].filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <div ref={ref} className="relative flex-1 max-w-[340px] hidden md:block">

      {/* ── Input ──────────────────────────────────────────────── */}
      <div
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        className={`flex items-center gap-2 px-4 py-[7px] rounded-full
          border-[1.5px] bg-slate-50 cursor-text transition-all duration-200
          ${open
            ? "border-brand-500 bg-white shadow-[0_0_0_3px_rgba(99,102,241,0.12)]"
            : "border-border-base hover:border-brand-300"
          }`}
      >
        <span className="text-slate-400 shrink-0"><IconSearch size={14} /></span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search jobs, people, companies…"
          className="w-full bg-transparent text-[13.5px] text-slate-700
            placeholder:text-slate-400 outline-none font-jakarta"
        />
      </div>

      {/* ── Dropdown ───────────────────────────────────────────── */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-50
          bg-surface-card rounded-2xl border border-border-subtle
          shadow-dropdown overflow-hidden animate-drop-in">

          {filtered ? (
            /* Filtered results */
            filtered.length > 0 ? (
              <div className="p-2.5 flex flex-col gap-0.5">
                {filtered.map((s, i) => (
                  <SuggestionRow key={i} text={s} type="history"
                    onClick={() => { setQuery(s); setOpen(false); }} />
                ))}
              </div>
            ) : (
              <p className="py-5 text-center text-[13px] text-slate-400 font-jakarta">
                No results for "{query}"
              </p>
            )
          ) : (
            <>
              {/* Recent */}
              <div className="p-2.5 pb-1.5">
                <p className="text-[10.5px] font-bold tracking-[0.07em] uppercase
                  text-slate-400 px-1 mb-2">Recent</p>
                <div className="flex flex-col gap-0.5">
                  {RECENT.map((s, i) => (
                    <SuggestionRow key={i} text={s} type="history"
                      onClick={() => { setQuery(s); setOpen(false); }} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-border-subtle mx-3" />

              {/* Trending */}
              <div className="p-2.5 pt-1.5">
                <p className="text-[10.5px] font-bold tracking-[0.07em] uppercase
                  text-slate-400 px-1 mb-2">Trending</p>
                <div className="flex flex-col gap-0.5">
                  {TRENDING.map((s, i) => (
                    <SuggestionRow key={i} text={s} type="trending"
                      onClick={() => { setQuery(s); setOpen(false); }} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ── Row subcomponent ─────────────────────────────────────────────
const SuggestionRow = ({ text, type, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl
      border-none bg-transparent cursor-pointer text-left
      font-jakarta text-[13px] font-medium text-slate-600
      hover:bg-slate-100 hover:text-brand-500 transition-all duration-100"
  >
    <span className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center shrink-0
      ${type === "trending" ? "bg-amber-50 text-amber-500" : "bg-slate-100 text-slate-400"}`}>
      {type === "trending" ? <IconTrending size={13} /> : <IconClock size={13} />}
    </span>
    {text}
  </button>
);

export default NavSearch;
