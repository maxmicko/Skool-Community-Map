import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CircleHelp,
  Compass,
  Crosshair,
  Info,
  Layers3,
  MapPin,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Category = "All" | "Business" | "Creator" | "Health & Fitness" | "Writing";
type SizeBand = "Small" | "Growing" | "Large";

type Community = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  members: number;
  size: SizeBand;
  description: string;
  location: string;
  updated: string;
  x: number;
  y: number;
  accent: string;
};

const communities: Community[] = [
  {
    id: "agency-operators",
    name: "Agency Operators",
    category: "Business",
    members: 1840,
    size: "Large",
    description: "A peer group for people building and running independent agencies.",
    location: "Global · English",
    updated: "18 Jun 2024",
    x: 67,
    y: 28,
    accent: "#bd654d",
  },
  {
    id: "creator-lab",
    name: "Creator Lab",
    category: "Creator",
    members: 970,
    size: "Growing",
    description: "A practical studio for creators learning the business behind their work.",
    location: "Global · English",
    updated: "15 Jun 2024",
    x: 45,
    y: 46,
    accent: "#6b8e79",
  },
  {
    id: "fitness-foundry",
    name: "Fitness Foundry",
    category: "Health & Fitness",
    members: 620,
    size: "Growing",
    description: "Coaches and curious athletes sharing routines, programming, and support.",
    location: "North America · English",
    updated: "11 Jun 2024",
    x: 25,
    y: 64,
    accent: "#c49353",
  },
  {
    id: "the-copy-room",
    name: "The Copy Room",
    category: "Writing",
    members: 310,
    size: "Small",
    description: "A quiet room for sharper copy, generous critique, and better briefs.",
    location: "Global · English",
    updated: "05 Jun 2024",
    x: 79,
    y: 69,
    accent: "#81769a",
  },
  {
    id: "product-people",
    name: "Product People",
    category: "Business",
    members: 2480,
    size: "Large",
    description: "Product builders comparing notes from discovery through launch.",
    location: "Global · English",
    updated: "28 May 2024",
    x: 55,
    y: 77,
    accent: "#bd654d",
  },
  {
    id: "indie-makers",
    name: "Indie Makers North",
    category: "Creator",
    members: 420,
    size: "Small",
    description: "Independent makers shipping small, useful things in public.",
    location: "Europe · English",
    updated: "24 May 2024",
    x: 32,
    y: 31,
    accent: "#6b8e79",
  },
  {
    id: "strength-study",
    name: "Strength Study",
    category: "Health & Fitness",
    members: 1260,
    size: "Growing",
    description: "Evidence-led strength training without the noise.",
    location: "Global · English",
    updated: "19 May 2024",
    x: 84,
    y: 42,
    accent: "#c49353",
  },
];

const categoryStyles: Record<Exclude<Category, "All">, { color: string; soft: string }> = {
  Business: { color: "#bd654d", soft: "#f4e5df" },
  Creator: { color: "#6b8e79", soft: "#e4eee8" },
  "Health & Fitness": { color: "#ae7c3c", soft: "#f4ecdc" },
  Writing: { color: "#81769a", soft: "#ebe7f1" },
};

const sizeStyles: Record<SizeBand, { label: string; color: string; width: number }> = {
  Small: { label: "Under 500", color: "#9c8d7c", width: 10 },
  Growing: { label: "500–1,499", color: "#ae7c3c", width: 16 },
  Large: { label: "1,500+", color: "#bd654d", width: 22 },
};

function formatMembers(members: number) {
  return new Intl.NumberFormat("en-US").format(members);
}

export function PublicMap() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [size, setSize] = useState<SizeBand | "All">("All");
  const [selectedId, setSelectedId] = useState("agency-operators");
  const [showFilters, setShowFilters] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return communities.filter((community) => {
      const matchesQuery =
        !normalized ||
        community.name.toLowerCase().includes(normalized) ||
        community.category.toLowerCase().includes(normalized) ||
        community.location.toLowerCase().includes(normalized);
      const matchesCategory = category === "All" || community.category === category;
      const matchesSize = size === "All" || community.size === size;
      return matchesQuery && matchesCategory && matchesSize;
    });
  }, [category, query, size]);

  const selected = communities.find((community) => community.id === selectedId) ?? filtered[0];

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSize("All");
  };

  return (
    <main className="skool-map">
      <style>{`
        .skool-map {
          --paper: #f5f3ee;
          --paper-deep: #ebe8df;
          --panel: #fbfaf7;
          --ink: #253430;
          --muted: #6d7771;
          --line: #d9ddd5;
          --sage: #4e6d5d;
          --rust: #bd654d;
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: "Trebuchet MS", "Avenir Next", sans-serif;
          letter-spacing: -0.01em;
          overflow-x: hidden;
        }
        .skool-map * { box-sizing: border-box; }
        .skool-map button, .skool-map input { font: inherit; }
        .skool-header {
          border-bottom: 1px solid var(--line);
          background: rgba(251,250,247,.92);
          padding: 20px clamp(18px, 4vw, 56px) 18px;
        }
        .skool-topline {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          max-width: 1500px; margin: 0 auto;
        }
        .skool-wordmark { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .skool-mark {
          width: 34px; height: 34px; border: 1px solid #8fa497; border-radius: 50%;
          display: grid; place-items: center; color: var(--sage); background: #edf2ed;
        }
        .skool-name { font: 600 16px/1.1 Georgia, serif; letter-spacing: -.025em; }
        .skool-subname { color: var(--muted); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; margin-top: 4px; }
        .skool-header-actions { display: flex; align-items: center; gap: 14px; color: var(--muted); font-size: 12px; }
        .skool-about {
          border: 0; background: transparent; color: var(--muted); cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px; padding: 8px 0;
        }
        .skool-about:hover { color: var(--ink); }
        .skool-updated { border-left: 1px solid var(--line); padding-left: 14px; white-space: nowrap; }
        .skool-intro { max-width: 1500px; margin: 28px auto 0; display: flex; justify-content: space-between; gap: 28px; align-items: end; }
        .skool-kicker { color: var(--sage); text-transform: uppercase; letter-spacing: .16em; font-size: 10px; font-weight: 700; margin: 0 0 10px; }
        .skool-title { font: 400 clamp(30px, 4vw, 48px)/.98 Georgia, serif; letter-spacing: -.045em; margin: 0; max-width: 720px; }
        .skool-summary { max-width: 430px; color: var(--muted); font-size: 13px; line-height: 1.6; margin: 0 0 2px; }
        .skool-shell { max-width: 1500px; margin: 24px auto 0; padding: 0 clamp(18px, 4vw, 56px) 48px; }
        .skool-toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
        .skool-search {
          height: 42px; flex: 1; min-width: 160px; display: flex; align-items: center; gap: 9px;
          padding: 0 13px; background: var(--panel); border: 1px solid var(--line); border-radius: 5px; color: var(--muted);
        }
        .skool-search:focus-within { border-color: #9aad9f; box-shadow: 0 0 0 3px rgba(78,109,93,.08); }
        .skool-search input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--ink); font-size: 13px; }
        .skool-search input::placeholder { color: #9ca39d; }
        .skool-filter-button, .skool-clear {
          height: 42px; border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 5px;
          padding: 0 13px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px;
        }
        .skool-filter-button:hover, .skool-clear:hover { background: var(--paper-deep); }
        .skool-filter-button.is-active { border-color: #9aad9f; background: #edf2ed; color: var(--sage); }
        .skool-filter-drawer { border: 1px solid var(--line); background: var(--panel); padding: 15px; margin: -4px 0 14px; display: flex; flex-wrap: wrap; gap: 20px; align-items: end; }
        .skool-filter-group { display: flex; flex-direction: column; gap: 7px; }
        .skool-filter-label { color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: .11em; font-weight: 700; }
        .skool-select { border: 1px solid var(--line); border-radius: 4px; background: #f7f6f1; color: var(--ink); padding: 8px 32px 8px 9px; font-size: 12px; appearance: auto; }
        .skool-filter-count { font-size: 12px; color: var(--muted); margin-left: auto; padding-bottom: 8px; }
        .skool-layout { display: grid; grid-template-columns: minmax(320px, 420px) minmax(0, 1fr); border: 1px solid var(--line); background: var(--panel); min-height: 650px; }
        .skool-list-panel { border-right: 1px solid var(--line); display: flex; flex-direction: column; min-width: 0; }
        .skool-list-head { padding: 16px 18px 13px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .skool-list-head strong { font: 600 15px Georgia, serif; }
        .skool-list-head span { color: var(--muted); font-size: 11px; }
        .skool-list { overflow: auto; max-height: 620px; }
        .skool-community {
          width: 100%; border: 0; border-bottom: 1px solid #e6e7e2; background: transparent; color: var(--ink);
          cursor: pointer; text-align: left; padding: 16px 18px; transition: background .18s ease, transform .18s ease;
        }
        .skool-community:hover { background: #f3f4ef; }
        .skool-community.is-selected { background: #edf2ed; box-shadow: inset 3px 0 0 var(--sage); }
        .skool-community-top { display: flex; justify-content: space-between; gap: 12px; align-items: start; }
        .skool-community-name { font: 600 15px Georgia, serif; letter-spacing: -.02em; }
        .skool-size-pill { color: var(--muted); background: #eeece6; padding: 4px 6px; border-radius: 3px; font-size: 10px; white-space: nowrap; }
        .skool-community-description { color: var(--muted); font-size: 11px; line-height: 1.45; margin: 7px 0 11px; max-width: 330px; }
        .skool-community-meta { display: flex; align-items: center; gap: 7px; color: var(--muted); font-size: 10px; }
        .skool-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        .skool-map-panel { min-width: 0; display: flex; flex-direction: column; }
        .skool-map-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 16px; border-bottom: 1px solid var(--line); }
        .skool-map-label { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 11px; }
        .skool-map-label strong { color: var(--ink); font-size: 12px; }
        .skool-map-tools { display: flex; gap: 5px; }
        .skool-icon-button { width: 30px; height: 30px; border: 1px solid var(--line); background: #f7f6f1; color: var(--muted); display: grid; place-items: center; cursor: pointer; border-radius: 4px; }
        .skool-icon-button:hover { color: var(--ink); background: var(--paper-deep); }
        .skool-map-canvas {
          flex: 1; min-height: 430px; position: relative; overflow: hidden; background-color: #e7ece6;
          background-image: linear-gradient(31deg, transparent 47%, rgba(97,126,106,.13) 48%, rgba(97,126,106,.13) 49%, transparent 50%),
            linear-gradient(150deg, transparent 44%, rgba(97,126,106,.1) 45%, rgba(97,126,106,.1) 46%, transparent 47%),
            radial-gradient(ellipse at 75% 25%, rgba(255,255,255,.65), transparent 40%);
          background-size: 240px 210px, 310px 260px, auto;
        }
        .skool-map-canvas:before, .skool-map-canvas:after { content: ""; position: absolute; pointer-events: none; border: 1px solid rgba(97,126,106,.22); border-radius: 50%; transform: rotate(-12deg); }
        .skool-map-canvas:before { width: 72%; height: 58%; left: 16%; top: 19%; }
        .skool-map-canvas:after { width: 48%; height: 36%; left: 26%; top: 31%; border-color: rgba(97,126,106,.15); }
        .skool-map-grid { position: absolute; inset: 0; opacity: .27; background-image: linear-gradient(rgba(97,126,106,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(97,126,106,.2) 1px, transparent 1px); background-size: 42px 42px; }
        .skool-map-note { position: absolute; left: 18px; top: 16px; color: #6f8477; font: italic 12px Georgia, serif; }
        .skool-map-scale { position: absolute; bottom: 15px; left: 16px; color: #6f8477; font-size: 10px; border-top: 2px solid #799181; width: 64px; padding-top: 4px; }
        .skool-marker { position: absolute; transform: translate(-50%,-50%); border: 0; background: transparent; padding: 0; cursor: pointer; z-index: 2; }
        .skool-marker-pin { width: 21px; height: 21px; border: 3px solid rgba(251,250,247,.95); border-radius: 50% 50% 50% 2px; transform: rotate(-45deg); display: grid; place-items: center; box-shadow: 0 2px 4px rgba(48,69,57,.22); }
        .skool-marker-pin span { width: 5px; height: 5px; background: #fbfaf7; border-radius: 50%; }
        .skool-marker.is-selected { z-index: 4; }
        .skool-marker.is-selected .skool-marker-pin { width: 28px; height: 28px; border-width: 4px; box-shadow: 0 0 0 5px rgba(78,109,93,.14), 0 3px 7px rgba(48,69,57,.25); }
        .skool-marker-label { position: absolute; left: 18px; top: -8px; background: rgba(251,250,247,.95); border: 1px solid rgba(185,194,184,.9); padding: 5px 7px; white-space: nowrap; font-size: 10px; color: var(--ink); border-radius: 3px; opacity: 0; transform: translateX(-3px); transition: opacity .18s ease, transform .18s ease; pointer-events: none; }
        .skool-marker:hover .skool-marker-label, .skool-marker.is-selected .skool-marker-label { opacity: 1; transform: translateX(0); }
        .skool-map-legend { padding: 13px 16px 15px; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; align-items: center; gap: 12px 19px; background: #f8f7f3; }
        .skool-legend-title { color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: .1em; font-weight: 700; margin-right: 2px; }
        .skool-legend-item { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 10px; }
        .skool-legend-dot { width: 9px; height: 9px; border-radius: 50%; }
        .skool-detail { border-top: 1px solid var(--line); padding: 16px; background: #f5f3ee; display: grid; grid-template-columns: 1fr auto; gap: 10px 18px; align-items: start; }
        .skool-detail-kicker { color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: .12em; }
        .skool-detail h2 { margin: 5px 0 5px; font: 600 20px Georgia, serif; letter-spacing: -.03em; }
        .skool-detail p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.45; max-width: 520px; }
        .skool-inspect { align-self: center; border: 1px solid #9aafa1; background: #edf2ed; color: var(--sage); padding: 9px 11px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; font-size: 11px; white-space: nowrap; }
        .skool-inspect:hover { background: #e2ebe3; }
        .skool-about-card { max-width: 1500px; margin: 0 auto 24px; padding: 0 clamp(18px, 4vw, 56px); }
        .skool-about-inner { border: 1px solid var(--line); background: #edf2ed; padding: 18px 20px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px; }
        .skool-about-inner h3 { font: 600 15px Georgia, serif; margin: 0 0 4px; }
        .skool-about-inner p { color: var(--muted); font-size: 11px; line-height: 1.5; margin: 0; max-width: 740px; }
        .skool-about-close { background: transparent; border: 0; cursor: pointer; color: var(--muted); }
        .skool-empty { padding: 48px 20px; text-align: center; color: var(--muted); }
        .skool-empty strong { display: block; font: 600 16px Georgia, serif; color: var(--ink); margin-bottom: 7px; }
        @media (max-width: 800px) {
          .skool-header { padding-top: 16px; }
          .skool-header-actions { gap: 9px; }
          .skool-updated { display: none; }
          .skool-intro { display: block; margin-top: 24px; }
          .skool-summary { margin-top: 12px; }
          .skool-layout { grid-template-columns: 1fr; }
          .skool-list-panel { border-right: 0; border-bottom: 1px solid var(--line); }
          .skool-list { max-height: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .skool-community:nth-child(odd) { border-right: 1px solid #e6e7e2; }
          .skool-map-panel { order: -1; }
          .skool-map-canvas { min-height: 360px; }
          .skool-detail { grid-template-columns: 1fr; }
          .skool-inspect { justify-self: start; }
          .skool-about-inner { grid-template-columns: auto 1fr; }
          .skool-about-close { grid-column: 2; grid-row: 1; justify-self: end; }
        }
        @media (max-width: 510px) {
          .skool-list { display: block; }
          .skool-community:nth-child(odd) { border-right: 0; }
          .skool-toolbar { align-items: stretch; }
          .skool-filter-button { padding: 0 10px; }
          .skool-filter-button span { display: none; }
          .skool-map-head { padding-left: 12px; padding-right: 12px; }
          .skool-map-legend { gap: 10px 14px; }
        }
      `}</style>

      <header className="skool-header">
        <div className="skool-topline">
          <div className="skool-wordmark">
            <div className="skool-mark" aria-hidden="true"><Compass size={18} strokeWidth={1.5} /></div>
            <div>
              <div className="skool-name">Skool Community Map</div>
              <div className="skool-subname">An unofficial public atlas</div>
            </div>
          </div>
          <div className="skool-header-actions">
            <button className="skool-about" onClick={() => setShowAbout((open) => !open)} aria-expanded={showAbout}>
              <CircleHelp size={14} /> About this map
            </button>
            <span className="skool-updated">Last updated 21 Jun 2024</span>
          </div>
        </div>
        <div className="skool-intro">
          <div>
            <p className="skool-kicker">Browse the open directory</p>
            <h1 className="skool-title">Find your corner of the Skool ecosystem.</h1>
          </div>
          <p className="skool-summary">A calm, community-maintained index of public communities. Search by name, browse category clusters, and inspect the public details behind each pin.</p>
        </div>
      </header>

      {showAbout && (
        <div className="skool-about-card">
          <div className="skool-about-inner">
            <Info size={19} color="#4e6d5d" />
            <div>
              <h3>How to read this directory</h3>
              <p>Entries are examples of publicly visible communities and their approximate member bands. This map does not collect private information or imply endorsement. The directory is for orientation, not ranking.</p>
            </div>
            <button className="skool-about-close" onClick={() => setShowAbout(false)} aria-label="Close about note"><X size={16} /></button>
          </div>
        </div>
      )}

      <section className="skool-shell" aria-label="Community directory">
        <div className="skool-toolbar">
          <label className="skool-search">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search communities, categories, or regions" aria-label="Search communities" />
          </label>
          <button className={`skool-filter-button ${showFilters ? "is-active" : ""}`} onClick={() => setShowFilters((open) => !open)} aria-expanded={showFilters}>
            <SlidersHorizontal size={15} /><span>Filters</span>
          </button>
          {(query || category !== "All" || size !== "All") && <button className="skool-clear" onClick={resetFilters}>Clear</button>}
        </div>

        {showFilters && (
          <div className="skool-filter-drawer">
            <label className="skool-filter-group">
              <span className="skool-filter-label">Category</span>
              <select className="skool-select" value={category} onChange={(event) => setCategory(event.target.value as Category)}>
                <option>All</option><option>Business</option><option>Creator</option><option>Health & Fitness</option><option>Writing</option>
              </select>
            </label>
            <label className="skool-filter-group">
              <span className="skool-filter-label">Member size</span>
              <select className="skool-select" value={size} onChange={(event) => setSize(event.target.value as SizeBand | "All")}>
                <option>All</option><option>Small</option><option>Growing</option><option>Large</option>
              </select>
            </label>
            <span className="skool-filter-count">{filtered.length} of {communities.length} communities shown</span>
          </div>
        )}

        <div className="skool-layout">
          <aside className="skool-list-panel">
            <div className="skool-list-head"><strong>Public communities</strong><span>{filtered.length} indexed</span></div>
            <div className="skool-list">
              {filtered.length === 0 ? (
                <div className="skool-empty"><strong>No communities found</strong><span>Try a broader search or reset your filters.</span></div>
              ) : filtered.map((community) => (
                <button key={community.id} className={`skool-community ${selected?.id === community.id ? "is-selected" : ""}`} onClick={() => setSelectedId(community.id)} aria-pressed={selected?.id === community.id}>
                  <div className="skool-community-top">
                    <span className="skool-community-name">{community.name}</span>
                    <span className="skool-size-pill">{community.size}</span>
                  </div>
                  <p className="skool-community-description">{community.description}</p>
                  <div className="skool-community-meta"><span className="skool-dot" style={{ background: categoryStyles[community.category].color }} />{community.category}<span>·</span>{formatMembers(community.members)} members</div>
                </button>
              ))}
            </div>
          </aside>

          <section className="skool-map-panel" aria-label="Map of public Skool communities">
            <div className="skool-map-head">
              <div className="skool-map-label"><MapPin size={14} color="#4e6d5d" /><span><strong>Map view</strong> · approximate locations</span></div>
              <div className="skool-map-tools" aria-label="Map controls">
                <button className="skool-icon-button" onClick={() => setMapZoom((zoom) => Math.min(1.2, zoom + .1))} aria-label="Zoom in"><Plus size={14} /></button>
                <button className="skool-icon-button" onClick={() => setMapZoom((zoom) => Math.max(.8, zoom - .1))} aria-label="Zoom out"><Minus size={14} /></button>
                <button className="skool-icon-button" onClick={() => setMapZoom(1)} aria-label="Reset map view"><Crosshair size={14} /></button>
              </div>
            </div>
            <div className="skool-map-canvas">
              <div className="skool-map-grid" style={{ transform: `scale(${mapZoom})` }} />
              <span className="skool-map-note">A living index, not a complete census.</span>
              {communities.map((community) => {
                const isVisible = filtered.some((item) => item.id === community.id);
                if (!isVisible) return null;
                return (
                  <button key={community.id} className={`skool-marker ${selected?.id === community.id ? "is-selected" : ""}`} style={{ left: `${community.x}%`, top: `${community.y}%` }} onClick={() => setSelectedId(community.id)} aria-label={`Inspect ${community.name}`}>
                    <div className="skool-marker-pin" style={{ background: categoryStyles[community.category].color }}><span /></div>
                    <span className="skool-marker-label">{community.name}</span>
                  </button>
                );
              })}
              <div className="skool-map-scale">approx. 1,000 km</div>
            </div>
            <div className="skool-map-legend">
              <span className="skool-legend-title"><Layers3 size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} /> Legend</span>
              {(Object.keys(categoryStyles) as Exclude<Category, "All">[]).map((item) => <span key={item} className="skool-legend-item"><i className="skool-legend-dot" style={{ background: categoryStyles[item].color }} />{item}</span>)}
              <span className="skool-legend-item"><i className="skool-legend-dot" style={{ background: "#9c8d7c" }} />pin size = member band</span>
            </div>
            {selected && (
              <div className="skool-detail">
                <div>
                  <div className="skool-detail-kicker">{selected.category} · public listing</div>
                  <h2>{selected.name}</h2>
                  <p>{selected.description} {selected.location}. Visible member count: <strong>{formatMembers(selected.members)}</strong> · last observed {selected.updated}.</p>
                </div>
                <button className="skool-inspect" onClick={() => setShowAbout(true)}>Inspect community <ArrowUpRight size={14} /></button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}