import { Hero } from "@/components/Hero";
import { useState } from "react";

const SILHOUETTE = "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/bucket/935ba231-6cc6-4387-8094-d923135d6be7.jpg";

const players = [
  { id: 1, nick: "xinto", role: "Star Player", faceitLvl: 10, hltvRating: "1.00", color: "text-yellow-400", glow: "shadow-yellow-400/30", border: "border-yellow-400/40 hover:border-yellow-400", nominations: ["MVP", "Top Fragger"] },
  { id: 2, nick: "fla1", role: "AWP", faceitLvl: 7, hltvRating: "1.00", color: "text-blue-400", glow: "shadow-blue-400/30", border: "border-blue-400/40 hover:border-blue-400", nominations: ["Best AWPer"] },
  { id: 3, nick: "Ba7ka", role: "IGL", faceitLvl: 5, hltvRating: "1.00", color: "text-red-400", glow: "shadow-red-400/30", border: "border-red-400/40 hover:border-red-400", nominations: ["Best IGL"] },
  { id: 4, nick: "mef0mu", role: "Rifler", faceitLvl: 5, hltvRating: "1.00", color: "text-green-400", glow: "shadow-green-400/30", border: "border-green-400/40 hover:border-green-400", nominations: ["EVP"] },
  { id: 5, nick: "grommer", role: "Support", faceitLvl: 7, hltvRating: "1.00", color: "text-purple-400", glow: "shadow-purple-400/30", border: "border-purple-400/40 hover:border-purple-400", nominations: ["Best Support"] },
];

const nominationColors: Record<string, string> = {
  MVP: "bg-yellow-400 text-black",
  EVP: "bg-orange-500 text-white",
  "Top Fragger": "bg-red-500 text-white",
  "Best AWPer": "bg-blue-500 text-white",
  "Best IGL": "bg-red-600 text-white",
  "Best Support": "bg-purple-500 text-white",
};

interface Match {
  id: number;
  opponent: string;
  score: string;
  result: "win" | "loss" | "draw";
  date: string;
  map?: string;
}

const defaultMatches: Match[] = [
  { id: 1, opponent: "No Name", score: "13:7", result: "win", date: "28 Feb 2026", map: "de_mirage" },
  { id: 2, opponent: "Sigma Junior", score: "2:0", result: "win", date: "01 Mar 2026", map: "bo2" },
];

function FaceitBadge({ lvl }: { lvl: number }) {
  const color = lvl === 10 ? "bg-yellow-400 text-black" : lvl >= 7 ? "bg-orange-500 text-white" : "bg-zinc-600 text-white";
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-bold ${color}`}>FACEIT LVL {lvl}</span>;
}

function PlayerCard({ player }: { player: typeof players[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer border ${player.border} bg-white/5 rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:bg-white/10 hover:scale-105`}
      >
        <div className="relative">
          <img src={SILHOUETTE} alt={player.nick} className={`w-24 h-24 rounded-full object-cover object-top border-2 border-white/10 shadow-lg ${player.glow}`} />
          {player.nominations.includes("MVP") && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono">MVP</span>
          )}
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold font-mono ${player.color}`}>{player.nick}</div>
          <div className="text-xs uppercase tracking-widest text-foreground/50 mt-1">{player.role}</div>
        </div>
        <FaceitBadge lvl={player.faceitLvl} />
        <div className="text-xs font-mono text-foreground/40">HLTV <span className="text-foreground/80">{player.hltvRating}</span></div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className={`bg-zinc-950 border ${player.border} rounded-2xl p-8 max-w-sm w-full flex flex-col items-center gap-5`} onClick={(e) => e.stopPropagation()}>
            <img src={SILHOUETTE} alt={player.nick} className="w-36 h-36 rounded-full object-cover object-top border-2 border-white/10" />
            <div className="text-center">
              <div className={`text-3xl font-bold font-mono ${player.color}`}>{player.nick}</div>
              <div className="text-sm uppercase tracking-widest text-foreground/40 mt-1">{player.role}</div>
            </div>
            <FaceitBadge lvl={player.faceitLvl} />
            <div className="text-sm font-mono text-foreground/60">HLTV RATING <span className="text-white font-bold">{player.hltvRating}</span></div>
            <div className="w-full">
              <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest text-center mb-3">Номинации</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {player.nominations.map((nom) => (
                  <span key={nom} className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${nominationColors[nom] ?? "bg-zinc-700 text-white"}`}>{nom}</span>
                ))}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="mt-1 text-xs font-mono text-foreground/30 hover:text-foreground/70 transition-colors uppercase tracking-widest">[Закрыть]</button>
          </div>
        </div>
      )}
    </>
  );
}

type Section = "about" | "roster" | "matches" | "news" | "achievements" | "soon";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("roster");
  const [matches, setMatches] = useState<Match[]>(defaultMatches);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ opponent: "", score: "", result: "win" as "win" | "loss" | "draw", date: "", map: "" });

  const navItems: { label: string; id: Section; disabled?: boolean }[] = [
    { label: "О клубе", id: "about" },
    { label: "Состав", id: "roster" },
    { label: "Матчи", id: "matches" },
    { label: "Новости", id: "news" },
    { label: "Достижения", id: "achievements" },
    { label: "Скоро", id: "soon", disabled: true },
  ];

  function addMatch() {
    if (!form.opponent || !form.score) return;
    setMatches((prev) => [{ id: Date.now(), ...form }, ...prev]);
    setForm({ opponent: "", score: "", result: "win", date: "", map: "" });
    setShowForm(false);
  }

  return (
    <>
      <Hero />

      {/* NAV */}
      <div className="relative z-10 sticky top-0 bg-black/80 backdrop-blur-md border-b border-white/10 py-3">
        <div className="flex justify-center flex-wrap gap-1 sm:gap-2 px-4">
          {navItems.map((item) =>
            item.disabled ? (
              <span key={item.id} className="font-mono text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-lg text-foreground/20 cursor-not-allowed select-none">
                {item.label}
              </span>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`font-mono text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id ? "bg-primary text-black font-bold" : "text-foreground/50 hover:text-foreground/90"
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 min-h-[60vh]">

        {/* О КЛУБЕ */}
        {activeSection === "about" && (
          <div>
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">История</p>
              <h2 className="text-4xl md:text-5xl font-sentient">О клубе</h2>
            </div>
            <div className="border border-primary/20 bg-white/5 rounded-2xl p-8 md:p-12 space-y-6 max-w-2xl mx-auto">
              <p className="text-foreground/80 font-mono text-sm leading-relaxed">
                Мы — начинающая команда <span className="text-primary font-bold">Natus Ventures</span>. Наша цель — пробиться в <span className="text-white font-bold">HLTV</span> и <span className="text-white font-bold">ESEA League</span>.
              </p>
              <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                Сейчас мы активно тренируемся, чтобы становиться сильнее с каждым днём. Каждый матч — это шаг вперёд на пути к большой сцене.
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Последние матчи</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-green-400/5 border border-green-400/20 rounded-xl px-5 py-3">
                    <span className="text-green-400 font-bold font-mono text-sm w-10">WIN</span>
                    <span className="text-foreground/80 font-mono text-sm flex-1">Natus Ventures VS No Name</span>
                    <span className="text-white font-bold font-mono">13:7</span>
                  </div>
                  <div className="flex items-center gap-3 bg-green-400/5 border border-green-400/20 rounded-xl px-5 py-3">
                    <span className="text-green-400 font-bold font-mono text-sm w-10">WIN</span>
                    <span className="text-foreground/80 font-mono text-sm flex-1">VS Sigma Junior</span>
                    <span className="text-white font-bold font-mono">2:0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* СОСТАВ */}
        {activeSection === "roster" && (
          <div>
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Команда</p>
              <h2 className="text-4xl md:text-5xl font-sentient">Наш состав</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {players.map((p) => <PlayerCard key={p.id} player={p} />)}
            </div>
          </div>
        )}

        {/* МАТЧИ */}
        {activeSection === "matches" && (
          <div>
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Результаты</p>
              <h2 className="text-4xl md:text-5xl font-sentient">Матчи</h2>
            </div>

            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowForm((v) => !v)}
                className="font-mono text-xs uppercase tracking-widest bg-primary text-black font-bold px-5 py-2 rounded-lg hover:bg-primary/80 transition-all"
              >
                {showForm ? "Отмена" : "+ Добавить матч"}
              </button>
            </div>

            {showForm && (
              <div className="border border-primary/30 bg-white/5 rounded-xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1 block">Соперник *</label>
                  <input
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
                    placeholder="No Name"
                    value={form.opponent}
                    onChange={(e) => setForm({ ...form, opponent: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1 block">Счёт *</label>
                  <input
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
                    placeholder="13:7"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1 block">Результат</label>
                  <select
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
                    value={form.result}
                    onChange={(e) => setForm({ ...form, result: e.target.value as "win" | "loss" | "draw" })}
                  >
                    <option value="win">Победа</option>
                    <option value="loss">Поражение</option>
                    <option value="draw">Ничья</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1 block">Карта / Формат</label>
                  <input
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
                    placeholder="de_mirage"
                    value={form.map}
                    onChange={(e) => setForm({ ...form, map: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1 block">Дата</label>
                  <input
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary"
                    placeholder="02 Mar 2026"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={addMatch}
                    className="w-full bg-primary text-black font-bold font-mono text-sm uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {matches.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 border border-white/10 rounded-xl bg-white/5">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="font-mono text-foreground/40 text-sm uppercase tracking-widest">Матчи пока не добавлены</p>
                </div>
              )}
              {matches.map((m) => {
                const colorClass = m.result === "win" ? "text-green-400 border-green-400/20 bg-green-400/5" : m.result === "loss" ? "text-red-400 border-red-400/20 bg-red-400/5" : "text-yellow-400 border-yellow-400/20 bg-yellow-400/5";
                const label = m.result === "win" ? "WIN" : m.result === "loss" ? "LOSS" : "DRAW";
                return (
                  <div key={m.id} className={`flex items-center gap-4 border rounded-xl px-6 py-4 ${colorClass}`}>
                    <span className={`font-bold font-mono text-sm w-10 ${colorClass.split(" ")[0]}`}>{label}</span>
                    <div className="flex-1">
                      <div className="font-mono text-white font-bold text-sm">Natus Ventures <span className="text-foreground/40">vs</span> {m.opponent}</div>
                      {(m.map || m.date) && <div className="text-xs font-mono text-foreground/30 mt-0.5">{[m.map, m.date].filter(Boolean).join(" · ")}</div>}
                    </div>
                    <span className="font-bold font-mono text-lg text-white">{m.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* НОВОСТИ */}
        {activeSection === "news" && (
          <div>
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Клан</p>
              <h2 className="text-4xl md:text-5xl font-sentient">Новости</h2>
            </div>
            <div className="space-y-5">
              <div className="border border-primary/30 bg-primary/5 rounded-xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="text-primary font-mono text-xs uppercase tracking-widest pt-1 whitespace-nowrap">02 Mar 2026</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Первый прак — и мы победили!</h3>
                    <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                      Сыграли первый официальный прак — и самое главное, победили его! Каждый игрок отыграл отлично, была отличная коммуникация и чёткое взаимодействие. Это только начало — следите за нами, впереди большие дела!
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="text-foreground/30 font-mono text-xs uppercase tracking-widest pt-1 whitespace-nowrap">01 Mar 2026</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Состав Natus Ventures сформирован!</h3>
                    <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                      Рады объявить, что наш состав официально сформирован. Каждый игрок прошёл жёсткий отбор и доказал свой уровень. Мы готовы к старту!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ДОСТИЖЕНИЯ */}
        {activeSection === "achievements" && (
          <div>
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Трофеи</p>
              <h2 className="text-4xl md:text-5xl font-sentient">Достижения</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <div className="border border-yellow-400/40 bg-yellow-400/5 rounded-xl p-8 flex flex-col items-center gap-3 flex-1 max-w-sm mx-auto">
                <div className="text-5xl">🏆</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400 font-mono">Mintex Tournament</div>
                  <div className="text-sm text-foreground/50 mt-1 uppercase tracking-widest font-mono">Топ 1 — Победа</div>
                </div>
              </div>
              <div className="border border-zinc-500/40 bg-zinc-500/5 rounded-xl p-8 flex flex-col items-center gap-3 flex-1 max-w-sm mx-auto">
                <div className="text-5xl">🥈</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-zinc-300 font-mono">DuoCup SaemArena</div>
                  <div className="text-sm text-foreground/50 mt-1 uppercase tracking-widest font-mono">2-е место</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <footer className="relative z-10 py-10 text-center font-mono text-xs text-foreground/20 uppercase tracking-widest border-t border-white/10">
        © 2026 Natus Ventures. All rights reserved.
      </footer>
    </>
  );
}
