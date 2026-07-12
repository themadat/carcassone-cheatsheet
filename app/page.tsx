"use client";

import { useState } from "react";

type Expansion = {
  id: string;
  number: string;
  name: string;
  short: string;
  icon: string;
  color: string;
  setup: string;
  play: string[];
  score: string[];
  end: string;
};

const expansions: Expansion[] = [
  {
    id: "inns",
    number: "1",
    name: "Inns & Cathedrals",
    short: "Big meeple · premium roads & cities",
    icon: "♜",
    color: "#9e2f2b",
    setup: "Add 18 tiles. Each player takes 1 large meeple; use 50/100 point tiles after a lap.",
    play: [
      "Large meeple places normally and counts as strength 2 for majority.",
      "An inn affects its entire connected road; a cathedral affects its entire city.",
    ],
    score: [
      "Completed inn road: 2 points per tile.",
      "Completed cathedral city: 3 points per tile and coat of arms.",
    ],
    end: "Incomplete inn roads and cathedral cities score 0. Large farmers count as 2.",
  },
  {
    id: "traders",
    number: "2",
    name: "Traders & Builders",
    short: "Goods · double turns · boosted farms",
    icon: "⚒",
    color: "#b86f21",
    setup: "Add 24 tiles and goods. Each player takes a builder and pig.",
    play: [
      "Completing a goods city gives its goods to the tile placer, regardless of city control.",
      "Place builder on your occupied road/city. Extend it for one extra full turn (never chains).",
      "Place pig only in a field containing your farmer; neither pig nor builder adds strength.",
    ],
    score: [
      "City scores normally, then award all depicted goods.",
      "Most of each goods type scores 10 points; ties each score 10.",
    ],
    end: "A pig makes your winning/tied field worth 4 per completed city instead of 3.",
  },
  {
    id: "dragon",
    number: "3",
    name: "Princess & Dragon",
    short: "Dragon · fairy · portals",
    icon: "♞",
    color: "#6c3d86",
    setup: "Add 30 tiles. Fairy begins aside; dragon enters on the first volcano.",
    play: [
      "Volcano: move dragon there; no figure placement. Dragon icon: players move it 6 unique orthogonal steps, eating figures.",
      "Princess may remove 1 knight from the continued city; doing so skips your figure placement.",
      "Portal places a valid meeple-like figure on any unoccupied, unfinished feature. Instead of placing, move fairy beside your meeple.",
    ],
    score: [
      "Fairy: +1 at the start of your turn; blocks dragon from its tile.",
      "When its protected figure’s feature scores, its owner gets +3 even without majority.",
    ],
    end: "Fairy bonuses apply to final feature and field scoring.",
  },
  {
    id: "tower",
    number: "4",
    name: "The Tower",
    short: "Capture · ransom · protection",
    icon: "♖",
    color: "#4d5961",
    setup: "Add 18 foundation tiles; distribute tower floors by player count.",
    play: [
      "Instead of a figure: add a floor to any open tower, or cap an open tower with your meeple.",
      "A placed floor captures 1 eligible figure on the tower tile or up to tower height spaces away orthogonally.",
      "Mutual prisoners exchange immediately. On your turn, buy back one prisoner for 3 points.",
    ],
    score: ["Tower figures score nothing and stay until captured."],
    end: "A meeple capping a tower remains there and scores 0 if never captured.",
  },
  {
    id: "abbey",
    number: "5",
    name: "Abbey & Mayor",
    short: "Wild tile · mayor · barn · wagon",
    icon: "♛",
    color: "#386b47",
    setup: "Each player takes 1 abbey, mayor, barn, and wagon; add 12 tiles.",
    play: [
      "Instead of drawing, an abbey fills a 4-sided orthogonal hole; it fits every edge and scores as a monastery.",
      "Mayor only enters an empty city; strength equals that city’s coats of arms (0 is possible).",
      "Barn enters an all-field 4-tile corner, even with farmers. Wagon enters any non-field feature.",
    ],
    score: [
      "Barn placement: score existing farmers 3/city, then return them. Later-connected farmers score 1/city.",
      "After wagon scores, move it to an adjacent unoccupied unfinished feature or return it.",
    ],
    end: "Barn scores 4 per completed city. Mayor uses arms for strength; wagon scores normally.",
  },
  {
    id: "count",
    number: "6",
    name: "Count, King & Robber",
    short: "Carcassonne city · records · shrines",
    icon: "♔",
    color: "#305f86",
    setup: "Use any modules: River II; 2×2 City + Count; King/Robber; 5 shrine tiles.",
    play: [
      "If an opponent scores from your completion and you score 0, place 1 meeple in a City district; then move Count.",
      "Before scoring, players clockwise move district meeples into the matching completed feature. Count blocks his district.",
      "A shrine beside a monastery creates a race: first completed scores 9; the other scores 0. Simultaneous = both 9.",
    ],
    score: [
      "King goes to completer of the largest city; Robber to largest road completer.",
      "Market→fields, castle→cities, blacksmith→roads, cathedral→monasteries/shrines.",
    ],
    end: "King: +1/completed city. Robber: +1/completed road. Unresolved shrine races score normally.",
  },
  {
    id: "bridges",
    number: "7",
    name: "Bridges, Castles & Bazaars",
    short: "Road overlays · delayed scoring · auctions",
    icon: "⌒",
    color: "#94522a",
    setup: "Add 12 tiles. Give 3 bridges/castles each (2–4 players) or 2 each (5–6).",
    play: [
      "After tile placement, bridge the new tile or a neighbor: field-to-field, orthogonal, max 1 per tile. It is a road and does not split fields/cities.",
      "Instead of scoring an occupied 2-tile city, its controller may cover it with a castle.",
      "Bazaar: auction one revealed tile/player, then buyers place in purchase order. Bazaar tiles won do not chain auctions.",
    ],
    score: [
      "Castle copies the full value of the first completed feature in its 6-tile neighborhood, then returns its meeple.",
      "If you also control that feature, score it twice.",
    ],
    end: "Untriggered castle scores 0, but every castle counts as 4 points when scoring a field.",
  },
  {
    id: "hills",
    number: "8",
    name: "Hills & Sheep",
    short: "Push-your-luck flocks · tie breakers",
    icon: "♈",
    color: "#62813a",
    setup: "Add 18 tiles. Sheep/wolves go in bag; each player takes a shepherd.",
    play: [
      "Place shepherd in a shepherd-free field (farmers allowed), then draw. Wolf ends it; sheep starts flock.",
      "When you extend its field, after figure placement choose grow (draw) or stable (score all sheep, return shepherd).",
      "Hill: tuck a blind tile underneath. A tied player with a meeple on that feature’s hill wins the tie alone.",
    ],
    score: [
      "Stable scores the total sheep shown; wolf scores 0. A completed enclosed field forces stable scoring.",
      "Each vineyard around a completed monastery adds 3 points.",
    ],
    end: "Unbanked sheep score 0. Hills still break ties. Vineyards do not boost incomplete monasteries.",
  },
  {
    id: "circus",
    number: "9",
    name: "Under the Big Top",
    short: "Circus aura · acrobats · ringmaster",
    icon: "♢",
    color: "#b33d55",
    setup: "Add 20 tiles. Stack animal tokens; each player takes a ringmaster.",
    play: [
      "First circus gets a face-down animal + Big Top. Each new circus scores the old Top, then moves it with a new token.",
      "Acrobat placement can use the new tile or an adjacent Acrobat tile. Stack a 3rd acrobat to complete a pyramid.",
      "Instead of placing a figure, score any complete pyramid: 5 points per acrobat, then return all 3.",
    ],
    score: [
      "Circus: reveal value; each eligible meeple on its tile or 8 neighbors scores that value and stays.",
      "Ringmaster scores normally, plus 2 per adjacent/on Circus or Acrobat tile.",
    ],
    end: "Score circus once more. Every unscored acrobat = 5. Ringmaster still gets its tile bonuses.",
  },
];

const phases = [
  ["1", "PLACE A TILE", "Draw and place with matching edges. Resolve tile effects: hill tuck, volcano/dragon, princess, bridge, builder extra turn."],
  ["2", "PLACE A FIGURE", "Place one legal meeple-like figure on the new tile—or use an expansion alternative: fairy, tower, acrobat, shepherd, barn."],
  ["3", "SCORE", "Score every completed road, city, monastery/shrine, circus or castle trigger. Majority ties normally score in full."],
  ["4", "AFTER SCORING", "Return figures; move wagon; award goods; resolve barn farmers; move Big Top; then run any bazaar auction."],
];

export default function Home() {
  const [activeId, setActiveId] = useState("inns");
  const active = expansions.find((item) => item.id === activeId) ?? expansions[0];

  return (
    <main className="app-shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">THE TABLE-SIDE COMPANION</p>
          <h1>CARCASSONNE</h1>
        </div>
        <div className="title-rule" aria-hidden="true"><span>◆</span></div>
        <div className="mast-meta">
          <span>BIG EXPANSIONS</span>
          <strong>ONE-PAGE CHEAT SHEET</strong>
        </div>
      </header>

      <section className="turn-strip" aria-label="Turn sequence">
        <div className="section-label"><span>TURN</span><strong>SEQUENCE</strong></div>
        {phases.map(([n, title, copy]) => (
          <article className={`phase phase-${n}`} key={n}>
            <b>{n}</b>
            <div><h2>{title}</h2><p>{copy}</p></div>
          </article>
        ))}
      </section>

      <section className="reference-grid">
        <aside className="expansion-index">
          <div className="panel-heading">
            <div><small>CHOOSE AN</small><h2>EXPANSION</h2></div>
            <span>9 classics</span>
          </div>
          <div className="expansion-buttons">
            {expansions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === activeId ? "active" : ""}
                style={{ "--accent": item.color } as React.CSSProperties}
                onClick={() => setActiveId(item.id)}
                aria-pressed={item.id === activeId}
              >
                <span className="exp-number">{item.number}</span>
                <span className="exp-icon" aria-hidden="true">{item.icon}</span>
                <span className="exp-name"><strong>{item.name}</strong><small>{item.short}</small></span>
                <span className="exp-arrow">›</span>
              </button>
            ))}
          </div>
        </aside>

        <article className="rule-card" style={{ "--accent": active.color } as React.CSSProperties}>
          <div className="rule-title">
            <div className="rule-emblem" aria-hidden="true">{active.icon}</div>
            <div><p>EXPANSION {active.number}</p><h2>{active.name}</h2><span>{active.short}</span></div>
            <div className="tile-mark">C</div>
          </div>

          <div className="rule-section setup-section">
            <h3><span>⚑</span> SETUP</h3><p>{active.setup}</p>
          </div>
          <div className="rule-section play-section">
            <h3><span>➊</span> DURING PLAY</h3>
            <ul>{active.play.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </div>
          <div className="rule-section score-section">
            <h3><span>★</span> SCORING</h3>
            <ul>{active.score.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </div>
          <div className="end-ribbon"><strong>FINAL SCORING</strong><span>{active.end}</span></div>
        </article>

        <aside className="core-panel">
          <div className="panel-heading"><div><small>BASE GAME</small><h2>CORE VALUES</h2></div><span>quick math</span></div>
          <div className="score-table">
            <div className="score-row"><span className="feature-icon road">═</span><div><strong>ROAD</strong><small>1 / tile</small></div><b>1×</b></div>
            <div className="score-row"><span className="feature-icon city">♜</span><div><strong>CITY</strong><small>tile + arms</small></div><b>2×</b></div>
            <div className="score-row"><span className="feature-icon cloister">⌂</span><div><strong>MONASTERY</strong><small>itself + neighbors</small></div><b>1–9</b></div>
            <div className="score-row"><span className="feature-icon field">♣</span><div><strong>FIELD</strong><small>per completed city</small></div><b>3×</b></div>
          </div>
          <div className="majority-note"><strong>MAJORITY</strong><p>Most figure strength scores the full feature. A normal tie gives every tied player full points.</p></div>
          <div className="figure-key">
            <h3>FIGURE STRENGTH</h3>
            <div><span className="meeple normal">♟</span><p><strong>Regular / wagon</strong><small>1 strength</small></p></div>
            <div><span className="meeple large">♟</span><p><strong>Large meeple</strong><small>2 strength</small></p></div>
            <div><span className="meeple mayor">♟</span><p><strong>Mayor</strong><small>= city arms</small></p></div>
            <div><span className="meeple special">◆</span><p><strong>Special figures</strong><small>not meeples; no majority</small></p></div>
          </div>
          <p className="source-note">Condensed from the official expansion rulebooks. Edge cases still defer to the full rules.</p>
        </aside>
      </section>
    </main>
  );
}
