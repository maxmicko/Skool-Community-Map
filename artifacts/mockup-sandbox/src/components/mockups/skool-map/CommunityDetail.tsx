import { useState, type FormEvent } from "react";
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileText,
  Globe2,
  Link2,
  MapPin,
  Send,
  X,
} from "lucide-react";

const nearbyCommunities = [
  {
    name: "The Copy Cabin",
    category: "Writing & Marketing",
    distance: "14 km north",
    members: "500–1,000 members",
  },
  {
    name: "Build in Public Club",
    category: "Business & Entrepreneurship",
    distance: "22 km east",
    members: "2,500–5,000 members",
  },
  {
    name: "Quietly Ambitious",
    category: "Personal Development",
    distance: "31 km southwest",
    members: "100–500 members",
  },
];

const sources = [
  { label: "Public community page", detail: "skool.com/the-productive-village", icon: Globe2 },
  { label: "Community about page", detail: "Public description and access details", icon: FileText },
  { label: "Map record", detail: "Checked 14 February 2025", icon: Archive },
];

export function CommunityDetail() {
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard?.writeText("https://www.skool.com/the-productive-village");
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    }
  };

  const submitCorrection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="community-page">
      <style>{`
        .community-page {
          --ink: #26352f;
          --muted: #69756e;
          --line: #d8ddd4;
          --paper: #f5f4ee;
          --card: #fbfaf6;
          --sage: #dce6da;
          --moss: #486156;
          --clay: #a36f52;
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 84% 6%, rgba(206, 221, 207, .52), transparent 25rem),
            linear-gradient(115deg, #f3f2ec 0%, #f8f7f1 44%, #edf1ea 100%);
          font-family: "DM Sans", "Trebuchet MS", sans-serif;
          letter-spacing: .005em;
        }
        .community-page * { box-sizing: border-box; }
        .community-page button, .community-page a, .community-page input, .community-page textarea { font: inherit; }
        .community-shell { width: min(1120px, calc(100% - 40px)); margin: 0 auto; padding: 25px 0 72px; }
        .community-topbar { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-bottom: 27px; border-bottom: 1px solid var(--line); }
        .wordmark { display: inline-flex; align-items: center; gap: 11px; color: var(--ink); text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
        .wordmark-mark { display: grid; place-items: center; width: 30px; height: 30px; border: 1px solid #83978a; border-radius: 9px 9px 9px 2px; color: var(--moss); background: #e1e9df; }
        .top-note { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 12px; }
        .top-note svg { color: var(--moss); }
        .breadcrumb { display: flex; align-items: center; gap: 8px; margin: 30px 0 20px; color: #7a837d; font-size: 12px; }
        .breadcrumb a { color: inherit; text-decoration: none; }
        .breadcrumb a:hover { color: var(--moss); }
        .breadcrumb strong { color: var(--ink); font-weight: 600; }
        .hero { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 56px; align-items: end; padding: 2px 0 42px; }
        .eyebrow { display: flex; align-items: center; gap: 8px; margin: 0 0 17px; color: var(--clay); font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .eyebrow::before { display: block; width: 28px; height: 1px; background: var(--clay); content: ""; }
        .hero h1 { max-width: 720px; margin: 0; color: #293a32; font-family: Georgia, "Times New Roman", serif; font-size: clamp(42px, 6vw, 73px); font-weight: 400; letter-spacing: -.055em; line-height: .98; }
        .hero-intro { max-width: 610px; margin: 25px 0 0; color: #66736b; font-size: 16px; line-height: 1.7; }
        .hero-meta { margin-top: 28px; }
        .public-url { display: inline-flex; align-items: center; gap: 9px; max-width: 100%; color: var(--moss); font-size: 13px; text-decoration: none; }
        .public-url span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .public-url:hover { color: #30483c; text-decoration: underline; text-underline-offset: 4px; }
        .copy-button { display: inline-flex; align-items: center; gap: 7px; margin-left: 13px; padding: 7px 10px; border: 1px solid #cbd5ca; border-radius: 5px; color: #52645a; background: rgba(255,255,255,.38); font-size: 11px; cursor: pointer; }
        .copy-button:hover { background: #fffdf7; }
        .record-card { padding: 22px 22px 20px; border: 1px solid #cbd5cb; border-radius: 3px; background: rgba(253,252,247,.7); box-shadow: 0 16px 40px rgba(65, 78, 65, .07); }
        .record-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; color: #79857c; font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
        .record-pin { color: var(--moss); }
        .record-map { position: relative; height: 112px; overflow: hidden; margin-bottom: 20px; border: 1px solid #d8ded5; background-color: #e8eee5; background-image: linear-gradient(#d5dfd4 1px, transparent 1px), linear-gradient(90deg, #d5dfd4 1px, transparent 1px); background-size: 25px 25px; }
        .record-map::before, .record-map::after { position: absolute; background: #cad8ca; content: ""; }
        .record-map::before { width: 140%; height: 14px; top: 43px; left: -20%; transform: rotate(-17deg); }
        .record-map::after { width: 120%; height: 9px; top: 76px; left: -10%; transform: rotate(26deg); background: #d7e0d4; }
        .map-dot { position: absolute; z-index: 1; top: 47px; left: 51%; width: 14px; height: 14px; border: 3px solid #f8faf3; border-radius: 50%; background: var(--clay); box-shadow: 0 0 0 5px rgba(163,111,82,.2); }
        .map-label { position: absolute; z-index: 1; top: 70px; left: calc(51% - 35px); color: #596a5e; font-size: 10px; font-weight: 700; letter-spacing: .03em; }
        .record-name { margin: 0 0 6px; font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-weight: 400; }
        .record-status { display: inline-flex; align-items: center; gap: 6px; color: #637369; font-size: 11px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #7c9a78; }
        .facts-section { padding: 27px 0 40px; border-top: 1px solid var(--line); }
        .section-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; margin-bottom: 24px; }
        .section-heading h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: 25px; font-weight: 400; letter-spacing: -.025em; }
        .section-heading p { margin: 0; color: var(--muted); font-size: 12px; }
        .fact-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .fact { min-height: 108px; padding: 20px 22px 19px 0; border-right: 1px solid var(--line); }
        .fact:not(:first-child) { padding-left: 22px; }
        .fact:last-child { border-right: 0; }
        .fact-label { margin-bottom: 11px; color: #849087; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
        .fact-value { color: #37483e; font-size: 14px; line-height: 1.4; }
        .fact-value em { color: #77837a; font-size: 12px; font-style: normal; }
        .content-grid { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(310px, .88fr); gap: 62px; padding-top: 14px; }
        .content-column { min-width: 0; }
        .content-block { padding: 28px 0; border-bottom: 1px solid var(--line); }
        .content-block:first-child { padding-top: 18px; }
        .content-block h3 { margin: 0 0 13px; font-family: Georgia, "Times New Roman", serif; font-size: 22px; font-weight: 400; letter-spacing: -.02em; }
        .content-block p { max-width: 630px; margin: 0; color: #647169; font-size: 14px; line-height: 1.75; }
        .reason-list { display: grid; gap: 13px; margin: 0; padding: 0; list-style: none; }
        .reason-list li { display: flex; gap: 12px; align-items: flex-start; color: #647169; font-size: 13px; line-height: 1.55; }
        .reason-list svg { flex: none; margin-top: 2px; color: var(--moss); }
        .aside-panel { margin-top: 18px; padding: 23px; border: 1px solid #d4dcd3; border-radius: 3px; background: rgba(231,238,228,.52); }
        .aside-panel h3 { margin-bottom: 9px; font-size: 18px; }
        .aside-panel p { font-size: 12px; line-height: 1.65; }
        .update-button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; width: 100%; margin-top: 19px; padding: 12px 16px; border: 1px solid #597363; border-radius: 4px; color: #eff5ee; background: #4d6959; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .2s ease, background .2s ease; }
        .update-button:hover { transform: translateY(-1px); background: #3e584a; }
        .nearby-list { display: grid; gap: 1px; margin: 0; padding: 0; list-style: none; background: var(--line); }
        .nearby-item { display: grid; grid-template-columns: 1fr auto; gap: 15px; padding: 17px 15px; background: var(--paper); text-decoration: none; }
        .nearby-item:hover { background: #fbfaf5; }
        .nearby-name { margin: 0 0 5px; color: #3d5145; font-size: 13px; font-weight: 700; }
        .nearby-category, .nearby-distance { color: #7a867e; font-size: 11px; }
        .nearby-right { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 8px; }
        .nearby-members { color: #617168; font-size: 11px; text-align: right; white-space: nowrap; }
        .nearby-arrow { color: #8a9a8e; }
        .source-list { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
        .source-link { display: flex; align-items: center; gap: 12px; padding: 12px 0; color: inherit; text-decoration: none; }
        .source-link:hover .source-title { color: var(--moss); }
        .source-icon { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border: 1px solid #d2dbd1; border-radius: 4px; color: #718179; background: #eff3ec; }
        .source-copy { min-width: 0; flex: 1; }
        .source-title { margin-bottom: 3px; color: #45564b; font-size: 12px; font-weight: 700; }
        .source-detail { overflow: hidden; color: #818b84; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
        .source-link > svg { color: #94a097; }
        .disclaimer { display: flex; align-items: flex-start; gap: 11px; margin-top: 36px; padding: 17px 18px; border: 1px solid #dedfd6; color: #737b74; background: rgba(246,245,239,.7); font-size: 11px; line-height: 1.65; }
        .disclaimer svg { flex: none; margin-top: 1px; color: #9a8667; }
        .disclaimer strong { color: #5b675f; font-weight: 700; }
        .correction-backdrop { position: fixed; z-index: 10; inset: 0; display: flex; justify-content: flex-end; background: rgba(36, 50, 43, .26); }
        .correction-sheet { width: min(430px, 100%); height: 100%; overflow-y: auto; padding: 29px 28px; color: var(--ink); background: #f8f7f1; box-shadow: -18px 0 45px rgba(35, 49, 41, .14); animation: slide-in .25s ease both; }
        @keyframes slide-in { from { opacity: .4; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        .sheet-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 28px; }
        .sheet-kicker { margin: 0 0 8px; color: var(--clay); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .sheet-top h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: 28px; font-weight: 400; }
        .close-sheet { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid #d5dbd3; border-radius: 50%; color: #68776d; background: transparent; cursor: pointer; }
        .close-sheet:hover { background: #edf1ea; }
        .sheet-copy { margin: 0 0 22px; color: #6d786f; font-size: 13px; line-height: 1.65; }
        .correction-form { display: grid; gap: 16px; }
        .correction-form label { display: grid; gap: 7px; color: #536258; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
        .correction-form input, .correction-form textarea { width: 100%; border: 1px solid #cfd8cf; border-radius: 3px; padding: 11px 12px; outline: none; color: #3e5045; background: #fdfcf8; font-size: 13px; letter-spacing: 0; text-transform: none; }
        .correction-form textarea { min-height: 110px; resize: vertical; line-height: 1.5; }
        .correction-form input:focus, .correction-form textarea:focus { border-color: #7f9a86; box-shadow: 0 0 0 3px rgba(127,154,134,.14); }
        .send-correction { display: inline-flex; align-items: center; justify-content: center; gap: 9px; margin-top: 3px; padding: 12px 15px; border: 0; border-radius: 3px; color: #eff5ee; background: #4d6959; font-size: 12px; font-weight: 700; cursor: pointer; }
        .send-correction:hover { background: #3e584a; }
        .success-note { padding: 14px; border: 1px solid #cbdcc9; color: #536b58; background: #e8f0e5; font-size: 12px; line-height: 1.55; }
        @media (max-width: 800px) {
          .community-shell { width: min(100% - 28px, 650px); padding-top: 17px; }
          .top-note { display: none; }
          .hero { grid-template-columns: 1fr; gap: 28px; padding-bottom: 32px; }
          .record-card { max-width: 420px; }
          .fact-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .fact:nth-child(2) { border-right: 0; }
          .fact:nth-child(n+3) { border-top: 1px solid var(--line); }
          .content-grid { grid-template-columns: 1fr; gap: 0; }
          .aside-panel { margin-top: 6px; }
        }
        @media (max-width: 480px) {
          .community-shell { width: min(100% - 24px, 650px); }
          .breadcrumb { margin-top: 22px; }
          .hero h1 { font-size: 48px; }
          .hero-intro { font-size: 14px; }
          .copy-button { display: flex; margin: 13px 0 0; }
          .fact { padding-right: 14px; }
          .fact:not(:first-child) { padding-left: 14px; }
          .section-heading { display: block; }
          .section-heading p { margin-top: 7px; }
          .nearby-item { grid-template-columns: minmax(0, 1fr) auto; }
        }
      `}</style>

      <div className="community-shell">
        <header className="community-topbar">
          <a className="wordmark" href="#map" aria-label="Skool Community Map home">
            <span className="wordmark-mark"><MapPin size={15} strokeWidth={1.8} /></span>
            <span>Skool Community Map</span>
          </a>
          <div className="top-note"><Archive size={14} strokeWidth={1.7} /> An unofficial public index</div>
        </header>

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="#map">Community map</a>
          <ChevronRight size={13} />
          <a href="#business">Business &amp; Entrepreneurship</a>
          <ChevronRight size={13} />
          <strong>Community record</strong>
        </nav>

        <section className="hero" aria-labelledby="community-title">
          <div>
            <p className="eyebrow">Community record · 0427</p>
            <h1 id="community-title">The Productive Village</h1>
            <p className="hero-intro">
              A public community for independent builders sharing practical systems,
              weekly working sessions, and the quieter parts of making something of your own.
            </p>
            <div className="hero-meta">
              <a className="public-url" href="https://www.skool.com/the-productive-village" target="_blank" rel="noreferrer">
                <Link2 size={15} strokeWidth={1.8} />
                <span>skool.com/the-productive-village</span>
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </a>
              <button className="copy-button" type="button" onClick={copyUrl}>
                {isCopied ? <Check size={13} /> : <Link2 size={13} />}
                {isCopied ? "Copied" : "Copy public URL"}
              </button>
            </div>
          </div>
          <aside className="record-card" aria-label="Record status">
            <div className="record-label"><span>Map reference</span><MapPin className="record-pin" size={15} /></div>
            <div className="record-map" aria-hidden="true">
              <span className="map-dot" />
              <span className="map-label">PUBLIC LISTING</span>
            </div>
            <p className="record-name">The Productive Village</p>
            <span className="record-status"><span className="status-dot" /> Last checked 14 Feb 2025</span>
          </aside>
        </section>

        <section className="facts-section" aria-labelledby="facts-title">
          <div className="section-heading">
            <h2 id="facts-title">At a glance</h2>
            <p>What this public record currently shows</p>
          </div>
          <div className="fact-grid">
            <div className="fact"><div className="fact-label">Category</div><div className="fact-value">Business &amp; Entrepreneurship</div></div>
            <div className="fact"><div className="fact-label">Access model</div><div className="fact-value">Public community <em>· join request</em></div></div>
            <div className="fact"><div className="fact-label">Visible member band</div><div className="fact-value">1,000–2,500 members</div></div>
            <div className="fact"><div className="fact-label">Record checked</div><div className="fact-value">14 February 2025</div></div>
          </div>
        </section>

        <div className="content-grid">
          <div className="content-column">
            <section className="content-block">
              <h3>Why it appears in the map</h3>
              <ul className="reason-list">
                <li><Check size={15} strokeWidth={1.8} /><span>A public Skool community page was available to review.</span></li>
                <li><Check size={15} strokeWidth={1.8} /><span>The page describes a focused space for independent builders and creators.</span></li>
                <li><Check size={15} strokeWidth={1.8} /><span>The access model and approximate member band were visible without signing in.</span></li>
              </ul>
            </section>
            <section className="content-block">
              <h3>Nearby communities</h3>
              <p style={{ marginBottom: "17px" }}>Other public listings in a similar part of the map. Proximity is a map convenience, not an endorsement.</p>
              <div className="nearby-list">
                {nearbyCommunities.map((community) => (
                  <a className="nearby-item" href="#community-detail" key={community.name}>
                    <div>
                      <p className="nearby-name">{community.name}</p>
                      <span className="nearby-category">{community.category}</span>
                    </div>
                    <div className="nearby-right">
                      <span className="nearby-members">{community.members}</span>
                      <span className="nearby-distance">{community.distance} <ChevronRight className="nearby-arrow" size={13} /></span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>

          <aside className="content-column">
            <section className="content-block">
              <h3>Sources</h3>
              <ul className="source-list">
                {sources.map(({ label, detail, icon: Icon }) => (
                  <li key={label}>
                    <a className="source-link" href="https://www.skool.com/the-productive-village" target="_blank" rel="noreferrer">
                      <span className="source-icon"><Icon size={15} strokeWidth={1.7} /></span>
                      <span className="source-copy"><span className="source-title">{label}</span><span className="source-detail">{detail}</span></span>
                      <ExternalLink size={13} strokeWidth={1.7} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="aside-panel">
              <h3>See something to correct?</h3>
              <p>Owners and members can suggest an update. We will review it against public information before changing the record.</p>
              <button className="update-button" type="button" onClick={() => { setSubmitted(false); setIsCorrectionOpen(true); }}>
                Suggest an update <ArrowUpRight size={14} strokeWidth={1.8} />
              </button>
            </section>
          </aside>
        </div>

        <div className="disclaimer">
          <CircleHelp size={15} strokeWidth={1.7} />
          <span><strong>Public information, carefully summarized.</strong> This listing is based only on details visible on public community pages. It does not represent private knowledge, member activity, or an assessment of the community.</span>
        </div>
      </div>

      {isCorrectionOpen && (
        <div className="correction-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCorrectionOpen(false); }}>
          <aside className="correction-sheet" role="dialog" aria-modal="true" aria-labelledby="correction-title">
            <div className="sheet-top">
              <div><p className="sheet-kicker">Record correction</p><h2 id="correction-title">Suggest an update</h2></div>
              <button className="close-sheet" type="button" onClick={() => setIsCorrectionOpen(false)} aria-label="Close correction form"><X size={16} /></button>
            </div>
            {submitted ? (
              <div className="success-note">Thanks. Your note is ready for review. The public listing will only change after it can be checked against visible information.</div>
            ) : (
              <>
                <p className="sheet-copy">A small correction is welcome. Share the detail that is different and, where possible, a public page that supports it.</p>
                <form className="correction-form" onSubmit={submitCorrection}>
                  <label>What should change?
                    <textarea required placeholder="For example: the member band is now visible as 2,500–5,000." />
                  </label>
                  <label>Public source link
                    <input type="url" placeholder="https://..." />
                  </label>
                  <label>Your email <span style={{ fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>(optional)</span>
                    <input type="email" placeholder="name@example.com" />
                  </label>
                  <button className="send-correction" type="submit"><Send size={14} strokeWidth={1.8} /> Send for review</button>
                </form>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}