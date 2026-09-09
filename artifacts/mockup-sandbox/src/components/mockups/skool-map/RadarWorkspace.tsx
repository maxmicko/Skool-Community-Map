import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  Filter,
  Globe2,
  Layers3,
  LockKeyhole,
  MessageCircleQuestion,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

type Relationship = "Direct" | "Adjacent" | "Emerging";

type Signal = {
  id: number;
  title: string;
  description: string;
  relationship: Relationship;
  community: string;
  source: string;
  date: string;
  kind: string;
  confidence: "Observed" | "Interpretation";
  accent: string;
};

const signals: Signal[] = [
  {
    id: 1,
    title: "Public promise now includes a paid tier",
    description:
      "The community shifted its public offer from one open plan to a free plan plus “Studio” at $39/month.",
    relationship: "Direct",
    community: "The School of Life Alumni",
    source: "theschooloflife.com/membership",
    date: "Jun 18, 2024",
    kind: "Offer change",
    confidence: "Observed",
    accent: "#c86f4d",
  },
  {
    id: 2,
    title: "Two new community spaces appeared",
    description:
      "A new host-led cohort and a members-only critique room are now listed in the public directory.",
    relationship: "Adjacent",
    community: "Makers Who Teach",
    source: "makerswhoteach.co/spaces",
    date: "Jun 14, 2024",
    kind: "Program shape",
    confidence: "Observed",
    accent: "#5f887b",
  },
  {
    id: 3,
    title: "The promise is becoming more outcome-specific",
    description:
      "Recent language emphasizes shipping a first workshop in 30 days rather than broad peer connection.",
    relationship: "Direct",
    community: "The Workshop Club",
    source: "theworkshopclub.com/about",
    date: "Jun 11, 2024",
    kind: "Positioning",
    confidence: "Interpretation",
    accent: "#8571a5",
  },
  {
    id: 4,
    title: "A small local network opened applications",
    description:
      "A five-city network for independent educators is accepting its first public applications this month.",
    relationship: "Emerging",
    community: "Common Practice",
    source: "commonpractice.network/join",
    date: "Jun 07, 2024",
    kind: "New entrant",
    confidence: "Observed",
    accent: "#c29a5f",
  },
];

const relationshipStyles: Record<Relationship, { text: string; bg: string; border: string }> = {
  Direct: { text: "#a04b34", bg: "#f8e8df", border: "#e9c9ba" },
  Adjacent: { text: "#47746a", bg: "#e3f0eb", border: "#c2ded4" },
  Emerging: { text: "#81683c", bg: "#f5eedb", border: "#e7d9b8" },
};

function RelationshipPill({ relationship }: { relationship: Relationship }) {
  const style = relationshipStyles[relationship];
  return (
    <span
      style={{
        color: style.text,
        background: style.bg,
        borderColor: style.border,
      }}
      className="rw-pill"
    >
      {relationship}
    </span>
  );
}

function SignalCard({ signal, saved, onSave }: { signal: Signal; saved: boolean; onSave: () => void }) {
  return (
    <article className="rw-signal">
      <div className="rw-signal-rule" style={{ background: signal.accent }} />
      <div className="rw-signal-main">
        <div className="rw-signal-topline">
          <span className="rw-kind">{signal.kind}</span>
          <span className="rw-date">
            <Clock3 size={12} /> {signal.date}
          </span>
        </div>
        <h3>{signal.title}</h3>
        <p>{signal.description}</p>
        <div className="rw-signal-meta">
          <span className="rw-community">
            <UsersRound size={14} />
            {signal.community}
          </span>
          <RelationshipPill relationship={signal.relationship} />
          <span className={signal.confidence === "Observed" ? "rw-confidence observed" : "rw-confidence interpreted"}>
            {signal.confidence === "Observed" ? <Check size={12} /> : <Sparkles size={12} />}
            {signal.confidence}
          </span>
        </div>
        <a className="rw-source" href={`https://${signal.source}`} target="_blank" rel="noreferrer">
          <Globe2 size={13} />
          {signal.source}
          <ExternalLink size={12} />
        </a>
      </div>
      <button className={`rw-save ${saved ? "is-saved" : ""}`} onClick={onSave} aria-label={saved ? "Remove saved signal" : "Save signal"}>
        <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      </button>
    </article>
  );
}

export function RadarWorkspace() {
  const [activeFilter, setActiveFilter] = useState<"All" | Relationship>("All");
  const [savedSignals, setSavedSignals] = useState<number[]>([2]);
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const visibleSignals = useMemo(
    () => (activeFilter === "All" ? signals : signals.filter((signal) => signal.relationship === activeFilter)),
    [activeFilter],
  );

  const toggleSaved = (id: number) => {
    setSavedSignals((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const askQuestion = () => {
    if (question.trim()) {
      setAskedQuestion(question.trim());
      setQuestion("");
    }
  };

  return (
    <div className="rw-shell">
      <style>{`
        :root {
          --rw-ink: #203b3c;
          --rw-ink-soft: #526665;
          --rw-paper: #f5f1e9;
          --rw-card: #fbf9f4;
          --rw-line: #dedbd1;
          --rw-teal: #386f6b;
          --rw-coral: #c86f4d;
          --rw-sand: #e8dfcf;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: #dfe7e1; }
        .rw-shell {
          min-height: 100vh;
          background: var(--rw-paper);
          color: var(--rw-ink);
          font-family: "DM Sans", "Trebuchet MS", sans-serif;
          letter-spacing: -0.01em;
          overflow-x: hidden;
        }
        .rw-shell button, .rw-shell input { font: inherit; }
        .rw-topbar {
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          border-bottom: 1px solid var(--rw-line);
          background: rgba(251,249,244,.82);
        }
        .rw-brand {
          display: flex; align-items: center; gap: 12px;
          font-family: "Space Mono", monospace;
          font-size: 14px; font-weight: 700; letter-spacing: -.06em;
        }
        .rw-mark {
          display: grid; place-items: center; width: 30px; height: 30px;
          border: 1px solid #87aaa0; border-radius: 50%; color: var(--rw-teal);
          background: #e5efea; position: relative;
        }
        .rw-mark:after { content: ""; width: 7px; height: 7px; background: var(--rw-coral); border-radius: 50%; }
        .rw-brand em { font-style: normal; color: var(--rw-coral); }
        .rw-top-actions { display:flex; align-items:center; gap: 20px; }
        .rw-private {
          display:flex; align-items:center; gap: 7px; color: #6b7c77;
          font-size: 11px; text-transform: uppercase; letter-spacing: .09em;
        }
        .rw-avatar { width: 32px; height:32px; display:grid; place-items:center; border-radius:50%; background:#d5e3dd; color:var(--rw-teal); font-size:12px; font-weight:700; }
        .rw-layout { display:grid; grid-template-columns: 248px minmax(0,1fr); min-height: calc(100vh - 74px); }
        .rw-sidebar { padding: 27px 19px 24px; border-right: 1px solid var(--rw-line); background: #edf1eb; }
        .rw-side-label { color:#83918a; text-transform:uppercase; letter-spacing:.12em; font-size:10px; padding:0 11px; margin-bottom: 10px; }
        .rw-nav { display:flex; flex-direction:column; gap:3px; }
        .rw-nav button { border:0; color:#5a6c67; background:transparent; text-align:left; display:flex; gap:11px; align-items:center; padding:11px; border-radius:8px; cursor:pointer; font-size:13px; }
        .rw-nav button:hover, .rw-nav button.active { background:#dfeae4; color:var(--rw-ink); }
        .rw-nav button.active { font-weight:700; }
        .rw-side-divider { height:1px; background:#d8e0d9; margin: 25px 10px 21px; }
        .rw-watch-head { display:flex; justify-content:space-between; align-items:center; padding:0 10px 10px; }
        .rw-watch-head h2 { margin:0; font-size:12px; font-weight:700; }
        .rw-icon-btn { border:0; background:transparent; color:#71827c; cursor:pointer; padding:3px; display:grid; place-items:center; border-radius:4px; }
        .rw-icon-btn:hover { background:#dbe7e0; color:var(--rw-teal); }
        .rw-watchlist { display:flex; flex-direction:column; gap:2px; }
        .rw-watch-item { display:flex; align-items:center; justify-content:space-between; padding:9px 10px; color:#61716c; font-size:12px; border-radius:7px; }
        .rw-watch-item:hover { background:#e3ebe5; }
        .rw-watch-item .dot { width:6px; height:6px; border-radius:50%; background:#ad7661; margin-right:8px; display:inline-block; }
        .rw-watch-item span:first-child { display:flex; align-items:center; }
        .rw-watch-item small { color:#9aa49e; font-size:10px; }
        .rw-side-note { border-left:2px solid #9bbbb0; margin:30px 10px 0; padding:2px 0 2px 12px; color:#72827b; font-size:11px; line-height:1.55; }
        .rw-content { padding: 31px 36px 44px; max-width: 1220px; width:100%; }
        .rw-breadcrumb { color:#788883; font-size:11px; display:flex; gap:8px; align-items:center; margin-bottom:14px; }
        .rw-breadcrumb span:last-child { color:var(--rw-ink); }
        .rw-heading-row { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; }
        .rw-heading-row h1 { font-family: Georgia, "Times New Roman", serif; font-weight:400; font-size: clamp(28px,3vw,41px); letter-spacing:-.045em; margin:0; line-height:1.05; }
        .rw-heading-row p { color:#6d7c76; margin:9px 0 0; font-size:13px; }
        .rw-date-stamp { color:#7b8982; font-family:"Space Mono", monospace; font-size:10px; letter-spacing:.02em; white-space:nowrap; padding-bottom:4px; }
        .rw-brief { margin-top:25px; display:grid; grid-template-columns: 1.2fr .8fr; border:1px solid #d6d4c9; border-radius:11px; background: #faf8f2; overflow:hidden; }
        .rw-brief-copy { padding:24px 25px 22px; border-right:1px solid #ddd9ce; }
        .rw-eyebrow { color:var(--rw-coral); font-size:10px; text-transform:uppercase; letter-spacing:.15em; font-weight:700; }
        .rw-brief h2 { margin:10px 0 8px; font-family:Georgia,serif; font-size:22px; font-weight:400; letter-spacing:-.035em; }
        .rw-brief-copy p { color:#52615d; font-size:13px; line-height:1.55; max-width: 610px; margin:0; }
        .rw-brief-side { display:flex; flex-direction:column; justify-content:center; gap:14px; padding:21px 24px; background:#f0f3eb; }
        .rw-brief-stat { display:flex; gap:11px; align-items:flex-start; }
        .rw-brief-stat strong { font-family:Georgia,serif; font-size:24px; line-height:1; font-weight:400; }
        .rw-brief-stat span { color:#6c7a73; font-size:11px; line-height:1.35; }
        .rw-brief-divider { width:1px; height:23px; background:#cfd9d1; margin-left:12px; }
        .rw-section-head { display:flex; justify-content:space-between; align-items:center; margin:29px 0 12px; }
        .rw-section-head h2 { font-family:Georgia,serif; font-weight:400; font-size:22px; letter-spacing:-.03em; margin:0; }
        .rw-filters { display:flex; align-items:center; gap:4px; }
        .rw-filter { border:1px solid transparent; color:#76847e; background:transparent; cursor:pointer; border-radius:20px; padding:7px 11px; font-size:11px; }
        .rw-filter:hover, .rw-filter.active { border-color:#ccd5ce; background:#edf2ec; color:var(--rw-ink); }
        .rw-filter.active { font-weight:700; }
        .rw-signal-list { display:flex; flex-direction:column; gap:8px; }
        .rw-signal { position:relative; display:flex; background:var(--rw-card); border:1px solid #dedbd1; border-radius:10px; min-height:145px; overflow:hidden; transition:transform .18s ease, box-shadow .18s ease; }
        .rw-signal:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(64,79,67,.08); }
        .rw-signal-rule { flex:0 0 4px; }
        .rw-signal-main { padding:16px 18px 15px; min-width:0; }
        .rw-signal-topline { display:flex; justify-content:space-between; gap:20px; margin-bottom:7px; }
        .rw-kind { color:#89938c; text-transform:uppercase; letter-spacing:.12em; font-size:9px; font-weight:700; }
        .rw-date { display:flex; align-items:center; gap:4px; color:#9aa49e; font-size:10px; white-space:nowrap; }
        .rw-signal h3 { margin:0; color:#294545; font-family:Georgia,serif; font-weight:400; font-size:18px; letter-spacing:-.025em; }
        .rw-signal p { color:#66746e; font-size:12px; line-height:1.45; margin:7px 0 12px; max-width:690px; }
        .rw-signal-meta { display:flex; align-items:center; flex-wrap:wrap; gap:8px; }
        .rw-community { display:flex; align-items:center; gap:5px; color:#536863; font-size:11px; font-weight:600; }
        .rw-pill { display:inline-flex; border:1px solid; border-radius:20px; padding:4px 8px; font-size:10px; font-weight:700; }
        .rw-confidence { display:inline-flex; align-items:center; gap:4px; padding:3px 7px; font-size:10px; border-radius:4px; }
        .rw-confidence.observed { color:#4e7469; background:#e8f1eb; }
        .rw-confidence.interpreted { color:#846d3e; background:#f5eedc; }
        .rw-source { display:flex; align-items:center; gap:5px; margin-top:10px; color:#7a8981; font-size:10px; text-decoration:none; width:max-content; border-bottom:1px solid #d2d9d1; padding-bottom:2px; }
        .rw-source:hover { color:var(--rw-teal); border-color:var(--rw-teal); }
        .rw-save { flex:0 0 auto; align-self:flex-start; margin:15px 15px 0 auto; padding:7px; background:transparent; border:0; border-radius:5px; color:#9aa49e; cursor:pointer; }
        .rw-save:hover, .rw-save.is-saved { color:var(--rw-coral); background:#f8ebe4; }
        .rw-empty { padding:38px; text-align:center; color:#718079; border:1px dashed #ced8d1; border-radius:10px; font-size:13px; background:#faf8f2; }
        .rw-question { margin-top:28px; border-top:1px solid #d8d8cc; padding-top:23px; }
        .rw-question-label { display:flex; justify-content:space-between; align-items:center; margin-bottom:9px; }
        .rw-question-label h2 { margin:0; font-family:Georgia,serif; font-size:18px; font-weight:400; }
        .rw-question-label span { color:#8b9790; font-size:10px; display:flex; gap:5px; align-items:center; }
        .rw-question-box { display:flex; align-items:center; gap:10px; background:#fbf9f4; border:1px solid #cecfc3; border-radius:8px; padding:7px 8px 7px 14px; }
        .rw-question-box:focus-within { border-color:#85a79c; box-shadow:0 0 0 3px rgba(134,171,158,.12); }
        .rw-question-box input { flex:1; min-width:0; border:0; outline:0; background:transparent; color:var(--rw-ink); font-size:12px; }
        .rw-question-box input::placeholder { color:#99a49d; }
        .rw-ask { display:flex; align-items:center; gap:6px; border:0; border-radius:6px; background:var(--rw-teal); color:#f5f1e9; cursor:pointer; padding:9px 13px; font-size:11px; font-weight:700; }
        .rw-ask:hover { background:#2b5d5a; }
        .rw-answer { margin-top:11px; border-left:2px solid var(--rw-teal); background:#e9f0ea; color:#586b64; padding:12px 15px; font-size:12px; line-height:1.5; }
        .rw-answer strong { color:var(--rw-ink); font-weight:700; }
        .rw-footnote { display:flex; align-items:center; justify-content:space-between; margin-top:22px; color:#91a098; font-size:10px; }
        .rw-footnote button { display:flex; align-items:center; gap:6px; border:0; background:transparent; color:#69827a; padding:0; cursor:pointer; font-size:10px; }
        .rw-footnote button:hover { color:var(--rw-teal); }
        .rw-source-drawer { margin-top:12px; background:#e9efea; border:1px solid #d3dfd7; padding:12px 14px; border-radius:8px; color:#64766f; font-size:10px; line-height:1.6; }
        @media (max-width: 760px) {
          .rw-topbar { padding:0 17px; height:62px; }
          .rw-private { display:none; }
          .rw-layout { display:block; }
          .rw-sidebar { display:none; }
          .rw-content { padding:24px 16px 35px; }
          .rw-heading-row { display:block; }
          .rw-date-stamp { margin-top:13px; }
          .rw-brief { grid-template-columns:1fr; }
          .rw-brief-copy { border-right:0; border-bottom:1px solid #ddd9ce; }
          .rw-section-head { align-items:flex-start; display:block; }
          .rw-filters { margin-top:12px; overflow:auto; }
          .rw-signal-topline { display:block; }
          .rw-date { margin-top:5px; }
          .rw-signal h3 { font-size:17px; }
          .rw-question-label span { display:none; }
        }
      `}</style>

      <header className="rw-topbar">
        <div className="rw-brand"><span className="rw-mark" /> skool <em>radar</em></div>
        <div className="rw-top-actions">
          <span className="rw-private"><LockKeyhole size={13} /> Public sources only</span>
          <span className="rw-avatar">MC</span>
        </div>
      </header>

      <div className="rw-layout">
        <aside className="rw-sidebar">
          <div className="rw-side-label">Workspace</div>
          <nav className="rw-nav">
            <button className="active"><Layers3 size={16} /> Radar workspace</button>
            <button onClick={() => setShowWatchlist(true)}><Bookmark size={16} /> Saved signals <small style={{ marginLeft: "auto", color: "#9aa49e" }}>2</small></button>
            <button onClick={() => setShowSources((open) => !open)}><Globe2 size={16} /> Source library</button>
          </nav>
          <div className="rw-side-divider" />
          <div className="rw-watch-head">
            <h2>Your watchlist</h2>
            <button className="rw-icon-btn" onClick={() => setShowWatchlist(true)} aria-label="Manage watchlist"><Plus size={15} /></button>
          </div>
          <div className="rw-watchlist">
            <div className="rw-watch-item"><span><i className="dot" />Community-led education</span><small>focus</small></div>
            <div className="rw-watch-item"><span><i className="dot" style={{ background: "#6a988c" }} />Membership models</span><small>focus</small></div>
            <div className="rw-watch-item"><span><i className="dot" style={{ background: "#c8a25d" }} />Independent creators</span><small>adjacent</small></div>
          </div>
          <div className="rw-side-note">
            Radar watches changes that are visible in public: sites, pricing pages, directories, and announcements.
          </div>
        </aside>

        <main className="rw-content">
          <div className="rw-breadcrumb"><span>My radar</span><ChevronDown size={12} /><span>Community-led education</span></div>
          <div className="rw-heading-row">
            <div>
              <h1>Community-led education</h1>
              <p>A considered read on the spaces around your work.</p>
            </div>
            <div className="rw-date-stamp">WEEK OF JUN 17–23, 2024</div>
          </div>

          <section className="rw-brief">
            <div className="rw-brief-copy">
              <span className="rw-eyebrow">Weekly category brief</span>
              <h2>The offer is getting more specific.</h2>
              <p>
                Across the category, public language is moving from belonging toward practical progress.
                Two groups have added structured rooms, while one direct peer now makes a paid path explicit.
                This looks like a shift in how value is being explained, not a rush to compete on features.
              </p>
            </div>
            <div className="rw-brief-side">
              <div className="rw-brief-stat"><strong>3</strong><span>material changes<br />observed this week</span></div>
              <div className="rw-brief-divider" />
              <div className="rw-brief-stat"><strong>2</strong><span>new public<br />communities</span></div>
              <div className="rw-brief-divider" />
              <div className="rw-brief-stat"><strong>High</strong><span>confidence in<br />the observed facts</span></div>
            </div>
          </section>

          <div className="rw-section-head">
            <h2>Observed changes <span style={{ color: "#9aa49e", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>04</span></h2>
            <div className="rw-filters">
              <Filter size={14} color="#8b9790" />
              {(["All", "Direct", "Adjacent", "Emerging"] as const).map((filter) => (
                <button key={filter} className={`rw-filter ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="rw-signal-list">
            {visibleSignals.length ? visibleSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} saved={savedSignals.includes(signal.id)} onSave={() => toggleSaved(signal.id)} />
            )) : <div className="rw-empty">No emerging changes in this view yet. Radar will keep watching public sources.</div>}
          </div>

          <section className="rw-question">
            <div className="rw-question-label">
              <h2>Ask a focused market question</h2>
              <span><CircleHelp size={13} /> Radar answers from the evidence above</span>
            </div>
            <div className="rw-question-box">
              <MessageCircleQuestion size={16} color="#78918a" />
              <input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && askQuestion()} placeholder="What are others promising before they introduce a paid tier?" />
              <button className="rw-ask" onClick={askQuestion}><Send size={13} /> Ask</button>
            </div>
            {askedQuestion && (
              <div className="rw-answer">
                <strong>On “{askedQuestion}”</strong><br />
                The clearest public pattern is a move toward specific outcomes before a paid path: structured rooms, critique, and a time-bound first result. That is an interpretation across 3 sources, not a statement of intent.
              </div>
            )}
          </section>
          <div className="rw-footnote">
            <span>Last checked Jun 21, 2024 at 08:42 UTC · 18 public sources in this radar</span>
            <button onClick={() => setShowSources((open) => !open)}><SlidersHorizontal size={12} /> Review source settings</button>
          </div>
          {showSources && (
            <div className="rw-source-drawer">
              <strong>Public source coverage</strong><br />
              Community websites · pricing pages · public directories · public announcements. Private groups, member lists, and private conversations are never monitored.
            </div>
          )}
        </main>
      </div>
      {showWatchlist && (
        <div onClick={() => setShowWatchlist(false)} style={{ position: "fixed", inset: 0, background: "rgba(32,59,60,.18)", display: "grid", placeItems: "center", zIndex: 5 }}>
          <div onClick={(event) => event.stopPropagation()} style={{ width: "min(440px, calc(100vw - 32px))", background: "#fbf9f4", border: "1px solid #d5d8cc", borderRadius: 12, padding: 24, boxShadow: "0 18px 50px rgba(40,70,63,.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><span className="rw-eyebrow">Your radar</span><h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, margin: "7px 0 0", fontSize: 24 }}>Watchlist</h2></div>
              <button className="rw-icon-btn" onClick={() => setShowWatchlist(false)} aria-label="Close watchlist"><X size={18} /></button>
            </div>
            <p style={{ color: "#66746e", fontSize: 12, lineHeight: 1.55, margin: "17px 0" }}>Keep the category and communities that help you read the market without turning it into a leaderboard.</p>
            {["Community-led education", "Membership models", "Independent creators"].map((item, index) => (
              <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid #e1ded4", color: "#455c57", fontSize: 13 }}>
                <span>{item}</span><span style={{ color: index === 2 ? "#927644" : "#598078", fontSize: 10 }}>{index === 2 ? "adjacent" : "watching"}</span>
              </div>
            ))}
            <button onClick={() => setShowWatchlist(false)} style={{ marginTop: 14, width: "100%", border: "1px solid #b5cec3", borderRadius: 6, background: "#e8f0eb", color: "#3f7068", padding: "10px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}