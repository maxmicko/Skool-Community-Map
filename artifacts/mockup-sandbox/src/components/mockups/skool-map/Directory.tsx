import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Community = {
  name: string;
  category: string;
  access: "Open" | "Application" | "Paid";
  location: string;
  checked: string;
  description: string;
  members: string;
  slug: string;
};

const communities: Community[] = [
  {
    name: "Agency Operators",
    category: "Business",
    access: "Application",
    location: "Remote",
    checked: "18 Mar 2024",
    description: "Peer-led working group for people building and running independent agencies.",
    members: "2.4k",
    slug: "agency-operators",
  },
  {
    name: "Creator Lab",
    category: "Creator economy",
    access: "Open",
    location: "Remote",
    checked: "11 Mar 2024",
    description: "A practical forum for creators sharing systems, experiments, and audience notes.",
    members: "5.8k",
    slug: "creator-lab",
  },
  {
    name: "Fitness Foundry",
    category: "Health & fitness",
    access: "Paid",
    location: "New York, NY",
    checked: "05 Mar 2024",
    description: "Strength and conditioning programming with coaching notes for committed trainees.",
    members: "1.1k",
    slug: "fitness-foundry",
  },
  {
    name: "The Copy Room",
    category: "Writing",
    access: "Open",
    location: "London, UK",
    checked: "26 Feb 2024",
    description: "A critique room for copywriters working on clear, useful commercial language.",
    members: "3.2k",
    slug: "the-copy-room",
  },
  {
    name: "Language Lab",
    category: "Education",
    access: "Application",
    location: "Berlin, Germany",
    checked: "19 Feb 2024",
    description: "Language learners exchanging study plans, practice prompts, and accountability.",
    members: "780",
    slug: "language-lab",
  },
  {
    name: "Indie Product Notes",
    category: "Business",
    access: "Open",
    location: "Remote",
    checked: "13 Feb 2024",
    description: "Small product builders documenting launches, research, and sustainable operations.",
    members: "1.9k",
    slug: "indie-product-notes",
  },
];

const categories = ["All categories", "Business", "Creator economy", "Education", "Health & fitness", "Writing"];
const accessModels = ["All access models", "Open", "Application", "Paid"];

function AccessPill({ access }: { access: Community["access"] }) {
  const tone = access === "Open" ? "open" : access === "Application" ? "application" : "paid";
  return <span className={`skool-access skool-access--${tone}`}>{access}</span>;
}

export function Directory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [access, setAccess] = useState("All access models");
  const [sortBy, setSortBy] = useState<"name" | "checked">("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredCommunities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return communities
      .filter((community) => {
        const matchesQuery =
          !normalizedQuery ||
          [community.name, community.category, community.location, community.description]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === "All categories" || community.category === category;
        const matchesAccess = access === "All access models" || community.access === access;
        return matchesQuery && matchesCategory && matchesAccess;
      })
      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : b.checked.localeCompare(a.checked)));
  }, [access, category, query, sortBy]);

  const hasFilters = Boolean(query) || category !== "All categories" || access !== "All access models";

  const resetFilters = () => {
    setQuery("");
    setCategory("All categories");
    setAccess("All access models");
  };

  return (
    <main className="skool-page">
      <style>{`
        .skool-page {
          --paper: #f4f1e9;
          --paper-deep: #e9e4d8;
          --ink: #1d2d33;
          --ink-soft: #506269;
          --line: #ccd2ca;
          --line-strong: #aab9b1;
          --copper: #aa5a3e;
          --copper-dark: #85432e;
          --teal: #316b68;
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: "DM Sans", "Segoe UI", sans-serif;
          letter-spacing: -0.01em;
          padding: 32px 42px 54px;
          position: relative;
          overflow: hidden;
        }
        .skool-page::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: .34;
          background-image: radial-gradient(#9b9a8a 0.55px, transparent 0.55px);
          background-size: 7px 7px;
          mix-blend-mode: multiply;
        }
        .skool-shell { max-width: 1240px; margin: 0 auto; position: relative; }
        .skool-topline {
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid var(--line-strong); padding-bottom: 14px;
          font-size: 11px; letter-spacing: .13em; text-transform: uppercase; color: var(--ink-soft);
        }
        .skool-mark { display: flex; align-items: center; gap: 9px; color: var(--teal); font-weight: 700; }
        .skool-mark-square { width: 13px; height: 13px; border: 2px solid var(--teal); display: inline-block; transform: rotate(45deg); }
        .skool-updated { display: flex; gap: 7px; align-items: center; }
        .skool-updated b { color: var(--ink); font-weight: 600; letter-spacing: .04em; text-transform: none; }
        .skool-heading { display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 50px; padding: 48px 0 39px; align-items: end; }
        .skool-kicker { color: var(--copper); font-size: 12px; text-transform: uppercase; letter-spacing: .16em; font-weight: 700; margin: 0 0 14px; }
        .skool-title { font-family: "Playfair Display", Georgia, serif; font-size: clamp(43px, 5.5vw, 76px); font-weight: 500; line-height: .98; letter-spacing: -.055em; margin: 0; max-width: 740px; }
        .skool-title em { font-style: italic; color: var(--copper); }
        .skool-intro { border-left: 2px solid var(--copper); padding: 3px 0 3px 19px; color: var(--ink-soft); font-size: 14px; line-height: 1.65; max-width: 280px; }
        .skool-intro strong { color: var(--ink); font-weight: 700; }
        .skool-rule { height: 1px; background: var(--ink); opacity: .8; }
        .skool-toolbar { display: flex; gap: 10px; align-items: center; padding: 19px 0 16px; }
        .skool-search { flex: 1; min-width: 190px; position: relative; }
        .skool-search svg { position: absolute; width: 17px; height: 17px; top: 13px; left: 14px; color: var(--ink-soft); }
        .skool-search input, .skool-select {
          border: 1px solid var(--line-strong); background: rgba(255,255,255,.25); color: var(--ink);
          height: 43px; border-radius: 2px; font: inherit; font-size: 13px;
        }
        .skool-search input { width: 100%; padding: 0 14px 0 41px; outline: none; }
        .skool-search input:focus, .skool-select:focus { border-color: var(--teal); box-shadow: 0 0 0 2px rgba(49,107,104,.12); }
        .skool-select { padding: 0 34px 0 13px; appearance: none; min-width: 159px; }
        .skool-select-wrap { position: relative; }
        .skool-select-wrap svg { pointer-events: none; position: absolute; width: 15px; right: 11px; top: 14px; color: var(--ink-soft); }
        .skool-filter-button, .skool-clear {
          height: 43px; border: 1px solid var(--line-strong); background: transparent; padding: 0 13px;
          color: var(--ink); font: inherit; font-size: 12px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 2px;
        }
        .skool-filter-button { display: none; }
        .skool-clear { border-color: transparent; color: var(--copper-dark); }
        .skool-filter-button:hover, .skool-clear:hover { background: rgba(255,255,255,.48); }
        .skool-toolbar-meta { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding: 13px 0 11px; color: var(--ink-soft); font-size: 12px; }
        .skool-toolbar-meta strong { color: var(--ink); font-size: 13px; }
        .skool-sort { display: inline-flex; align-items: center; gap: 7px; cursor: pointer; border: 0; background: transparent; font: inherit; font-size: 12px; color: var(--ink-soft); padding: 4px 0; }
        .skool-sort:hover { color: var(--teal); }
        .skool-table-wrap { border-top: 2px solid var(--ink); overflow-x: auto; }
        .skool-table { width: 100%; border-collapse: collapse; min-width: 820px; }
        .skool-table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: .13em; color: var(--ink-soft); font-weight: 700; padding: 12px 13px 10px; white-space: nowrap; }
        .skool-table th:first-child, .skool-table td:first-child { padding-left: 0; }
        .skool-table th:last-child, .skool-table td:last-child { padding-right: 0; text-align: right; }
        .skool-table td { border-top: 1px solid var(--line); padding: 17px 13px 16px; vertical-align: top; font-size: 12px; }
        .skool-table tbody tr { transition: background-color .18s ease; }
        .skool-table tbody tr:hover { background: rgba(255,255,255,.32); }
        .skool-community { min-width: 235px; }
        .skool-community-name { display: flex; gap: 9px; align-items: baseline; color: var(--ink); font-family: "Playfair Display", Georgia, serif; font-size: 19px; letter-spacing: -.025em; }
        .skool-community-name svg { color: var(--copper); width: 13px; height: 13px; flex: 0 0 auto; }
        .skool-description { color: var(--ink-soft); line-height: 1.5; max-width: 305px; margin-top: 6px; }
        .skool-category { color: var(--teal); font-weight: 700; font-size: 11px; line-height: 1.35; max-width: 110px; }
        .skool-location { color: var(--ink-soft); white-space: nowrap; }
        .skool-location span { display: block; color: var(--ink); margin-bottom: 3px; }
        .skool-access { display: inline-flex; align-items: center; min-height: 23px; padding: 0 8px; border: 1px solid; border-radius: 2px; font-size: 11px; white-space: nowrap; }
        .skool-access--open { color: #306761; border-color: #9cbab0; background: #e8f0eb; }
        .skool-access--application { color: #8b5b2e; border-color: #d4b896; background: #f3eadc; }
        .skool-access--paid { color: #805044; border-color: #d5aaa0; background: #f3e3dd; }
        .skool-checked { color: var(--ink-soft); white-space: nowrap; }
        .skool-members { color: var(--ink); font-family: "DM Mono", monospace; font-size: 12px; white-space: nowrap; }
        .skool-row-action { border: 0; background: transparent; color: var(--copper-dark); cursor: pointer; font: inherit; font-size: 11px; padding: 0; white-space: nowrap; text-decoration: underline; text-decoration-color: #d2aa9c; text-underline-offset: 3px; }
        .skool-row-action:hover { color: var(--teal); text-decoration-color: var(--teal); }
        .skool-footer { display: flex; justify-content: space-between; gap: 24px; border-top: 1px solid var(--line-strong); margin-top: 26px; padding-top: 17px; color: var(--ink-soft); font-size: 11px; line-height: 1.5; }
        .skool-footer p { margin: 0; max-width: 600px; }
        .skool-footer-mark { color: var(--teal); font-weight: 700; white-space: nowrap; }
        .skool-empty { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); text-align: center; padding: 58px 20px; }
        .skool-empty svg { color: var(--copper); margin: 0 auto 13px; }
        .skool-empty h2 { font: 500 26px "Playfair Display", Georgia, serif; margin: 0 0 7px; }
        .skool-empty p { color: var(--ink-soft); margin: 0 auto 18px; font-size: 13px; }
        .skool-empty button { border: 1px solid var(--teal); background: transparent; color: var(--teal); padding: 9px 13px; font: inherit; font-size: 12px; cursor: pointer; border-radius: 2px; }
        .skool-modal-backdrop { position: fixed; inset: 0; background: rgba(29,45,51,.26); display: grid; place-items: center; z-index: 10; padding: 20px; }
        .skool-modal { background: var(--paper); border: 1px solid var(--line-strong); box-shadow: 8px 10px 0 rgba(29,45,51,.1); width: min(480px, 100%); padding: 26px; position: relative; }
        .skool-modal-close { border: 0; background: transparent; cursor: pointer; position: absolute; right: 16px; top: 16px; color: var(--ink-soft); padding: 4px; }
        .skool-modal-kicker { color: var(--copper); text-transform: uppercase; letter-spacing: .14em; font-size: 10px; font-weight: 700; margin: 0 0 8px; }
        .skool-modal h2 { margin: 0 0 8px; font: 500 28px "Playfair Display", Georgia, serif; }
        .skool-modal p { color: var(--ink-soft); font-size: 13px; line-height: 1.55; margin: 0 0 18px; }
        .skool-modal textarea { width: 100%; min-height: 100px; border: 1px solid var(--line-strong); background: rgba(255,255,255,.35); padding: 11px; resize: vertical; font: inherit; font-size: 13px; box-sizing: border-box; color: var(--ink); outline: none; }
        .skool-modal textarea:focus { border-color: var(--teal); }
        .skool-modal-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 15px; }
        .skool-modal-actions button { padding: 9px 13px; font: inherit; font-size: 12px; cursor: pointer; border: 1px solid var(--line-strong); background: transparent; color: var(--ink); }
        .skool-modal-actions button:last-child { background: var(--teal); border-color: var(--teal); color: #f4f1e9; }
        .skool-success { display: flex; gap: 9px; align-items: center; color: var(--teal); font-size: 13px; margin-top: 15px; }
        @media (max-width: 760px) {
          .skool-page { padding: 22px 18px 40px; }
          .skool-topline { align-items: flex-start; gap: 10px; flex-direction: column; }
          .skool-updated { align-self: flex-start; }
          .skool-heading { display: block; padding: 35px 0 28px; }
          .skool-intro { margin-top: 23px; max-width: 100%; }
          .skool-toolbar { flex-wrap: wrap; }
          .skool-search { flex-basis: 100%; }
          .skool-select-wrap { display: none; }
          .skool-filter-button { display: inline-flex; }
          .skool-filter-button.is-open { background: var(--paper-deep); }
          .skool-filter-panel { display: flex; width: 100%; gap: 8px; }
          .skool-filter-panel .skool-select-wrap { display: block; flex: 1; }
          .skool-filter-panel .skool-select { width: 100%; min-width: 0; }
          .skool-footer { display: block; }
          .skool-footer-mark { display: block; margin-top: 12px; }
        }
        @media (min-width: 761px) { .skool-filter-panel { display: contents; } }
      `}</style>

      <div className="skool-shell">
        <div className="skool-topline">
          <div className="skool-mark"><span className="skool-mark-square" /> Skool community map <span style={{ opacity: 0.5 }}>/</span> Directory</div>
          <div className="skool-updated"><span>Index status</span><b>183 communities · checked 21 Mar 2024</b></div>
        </div>

        <header className="skool-heading">
          <div>
            <p className="skool-kicker">Public directory · v1.4</p>
            <h1 className="skool-title">Find a community.<br /><em>See what is public.</em></h1>
          </div>
          <p className="skool-intro">A searchable index of public Skool communities. Browse by <strong>topic</strong>, compare access models, and check when each entry was last reviewed.</p>
        </header>

        <div className="skool-rule" />

        <section aria-label="Directory filters">
          <div className="skool-toolbar">
            <label className="skool-search">
              <Search aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search communities, topics, places…" aria-label="Search communities" />
            </label>
            <button className={`skool-filter-button${isFilterOpen ? " is-open" : ""}`} onClick={() => setIsFilterOpen((current) => !current)} aria-expanded={isFilterOpen}>
              <SlidersHorizontal size={15} /> Filters <span style={{ fontFamily: "DM Mono" }}>{hasFilters ? "·" : ""}</span>
            </button>
            <div className="skool-filter-panel">
              <label className="skool-select-wrap">
                <select className="skool-select" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown />
              </label>
              <label className="skool-select-wrap">
                <select className="skool-select" value={access} onChange={(event) => setAccess(event.target.value)} aria-label="Filter by access model">
                  {accessModels.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown />
              </label>
            </div>
            {hasFilters && <button className="skool-clear" onClick={resetFilters}><X size={14} /> Clear</button>}
          </div>
          <div className="skool-toolbar-meta">
            <span><strong>{filteredCommunities.length}</strong> of 183 listed communities</span>
            <button className="skool-sort" onClick={() => setSortBy((current) => current === "name" ? "checked" : "name")}><ArrowUpDown size={14} /> Sort: {sortBy === "name" ? "name" : "recently checked"}</button>
          </div>
        </section>

        {filteredCommunities.length > 0 ? (
          <div className="skool-table-wrap">
            <table className="skool-table">
              <thead>
                <tr>
                  <th scope="col">Community</th>
                  <th scope="col">Category</th>
                  <th scope="col">Access</th>
                  <th scope="col">Location</th>
                  <th scope="col">Last checked</th>
                  <th scope="col">Members</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredCommunities.map((community) => (
                  <tr key={community.slug}>
                    <td className="skool-community">
                      <div className="skool-community-name"><MapPin aria-hidden="true" />{community.name}</div>
                      <div className="skool-description">{community.description}</div>
                    </td>
                    <td><div className="skool-category">{community.category}</div></td>
                    <td><AccessPill access={community.access} /></td>
                    <td className="skool-location"><span>{community.location}</span>{community.location === "Remote" ? "online" : "listed location"}</td>
                    <td className="skool-checked">{community.checked}</td>
                    <td className="skool-members">{community.members}</td>
                    <td><button className="skool-row-action" onClick={() => { setSelectedCommunity(community); setSubmitted(false); }}>suggest an update</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="skool-empty">
            <Filter size={24} />
            <h2>No communities match those filters.</h2>
            <p>Try a broader topic or remove one of the access-model filters.</p>
            <button onClick={resetFilters}>Show all communities</button>
          </div>
        )}

        <footer className="skool-footer">
          <p>Public fields are compiled from community pages and open submissions. Descriptions are editorial summaries, not endorsements. <button className="skool-row-action" onClick={() => setSelectedCommunity({ name: "the directory", category: "Public index", access: "Open", location: "Online", checked: "21 Mar 2024", description: "", members: "—", slug: "directory" })}>Suggest a correction</button></p>
          <span className="skool-footer-mark">Open data, carefully maintained.</span>
        </footer>
      </div>

      {selectedCommunity && (
        <div className="skool-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCommunity(null); }}>
          <section className="skool-modal" role="dialog" aria-modal="true" aria-labelledby="update-title">
            <button className="skool-modal-close" onClick={() => setSelectedCommunity(null)} aria-label="Close update form"><X size={18} /></button>
            <p className="skool-modal-kicker">Neutral correction channel</p>
            <h2 id="update-title">Suggest an update</h2>
            <p>Share a source or note about <strong>{selectedCommunity.name}</strong>. This does not send a message to the community; it helps keep this public index current.</p>
            {!submitted ? (
              <>
                <textarea placeholder="What should be checked or changed? Include a public source if available." aria-label="Update details" />
                <div className="skool-modal-actions">
                  <button onClick={() => setSelectedCommunity(null)}>Cancel</button>
                  <button onClick={() => setSubmitted(true)}>Submit note</button>
                </div>
              </>
            ) : (
              <>
                <div className="skool-success"><Check size={17} /> Note queued for the next directory review.</div>
                <div className="skool-modal-actions"><button onClick={() => setSelectedCommunity(null)}>Close</button></div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}