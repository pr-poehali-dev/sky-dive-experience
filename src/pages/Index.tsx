import { Hero } from "@/components/Hero";
import { useState } from "react";

const players = [
  {
    id: 1,
    nick: "xinto",
    role: "Star Player",
    faceitLvl: 10,
    hltvRating: "1.00",
    avatar: "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/files/65932cd8-dc6d-4025-8fc7-8425db3fccfc.jpg",
    color: "text-yellow-400",
    border: "border-yellow-400/40 hover:border-yellow-400",
  },
  {
    id: 2,
    nick: "fla1",
    role: "AWP",
    faceitLvl: 7,
    hltvRating: "1.00",
    avatar: "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/files/f099da76-cd4d-4261-8927-ee74f8a3e5d3.jpg",
    color: "text-blue-400",
    border: "border-blue-400/40 hover:border-blue-400",
  },
  {
    id: 3,
    nick: "Ba7ka",
    role: "IGL",
    faceitLvl: 5,
    hltvRating: "1.00",
    avatar: "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/files/1a884592-48c2-4617-8223-3a0be66ae4c0.jpg",
    color: "text-red-400",
    border: "border-red-400/40 hover:border-red-400",
  },
  {
    id: 4,
    nick: "mef0mu",
    role: "Rifler",
    faceitLvl: 5,
    hltvRating: "1.00",
    avatar: "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/files/d3336216-2198-4c7a-84bb-005affd1115f.jpg",
    color: "text-green-400",
    border: "border-green-400/40 hover:border-green-400",
  },
  {
    id: 5,
    nick: "grommer",
    role: "Support",
    faceitLvl: 7,
    hltvRating: "1.00",
    avatar: "https://cdn.poehali.dev/projects/5a2ada7f-2d95-4a5c-9824-584c30954f7f/files/23411552-9589-4ee1-9021-6bca23e12bba.jpg",
    color: "text-purple-400",
    border: "border-purple-400/40 hover:border-purple-400",
  },
];

function FaceitBadge({ lvl }: { lvl: number }) {
  const color =
    lvl === 10
      ? "bg-yellow-400 text-black"
      : lvl >= 7
      ? "bg-orange-500 text-white"
      : "bg-zinc-600 text-white";
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-bold ${color}`}>
      FACEIT LVL {lvl}
    </span>
  );
}

function PlayerCard({ player }: { player: typeof players[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer border ${player.border} bg-white/5 rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:bg-white/10 hover:scale-105`}
      >
        <img
          src={player.avatar}
          alt={player.nick}
          className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
        />
        <div className="text-center">
          <div className={`text-xl font-bold font-mono ${player.color}`}>{player.nick}</div>
          <div className="text-xs uppercase tracking-widest text-foreground/50 mt-1">{player.role}</div>
        </div>
        <FaceitBadge lvl={player.faceitLvl} />
        <div className="text-xs font-mono text-foreground/40">
          HLTV RATING <span className="text-foreground/80">{player.hltvRating}</span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className={`bg-zinc-900 border ${player.border} rounded-2xl p-8 max-w-sm w-full flex flex-col items-center gap-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={player.avatar}
              alt={player.nick}
              className="w-32 h-32 rounded-full object-cover border-2 border-white/20"
            />
            <div className={`text-3xl font-bold font-mono ${player.color}`}>{player.nick}</div>
            <div className="text-sm uppercase tracking-widest text-foreground/50">{player.role}</div>
            <FaceitBadge lvl={player.faceitLvl} />
            <div className="text-sm font-mono text-foreground/60">
              HLTV RATING <span className="text-white font-bold">{player.hltvRating}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-xs font-mono text-foreground/40 hover:text-foreground/80 transition-colors uppercase tracking-widest"
            >
              [Закрыть]
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Index() {
  return (
    <>
      <Hero />

      {/* ROSTER */}
      <section id="roster" className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Команда</p>
          <h2 className="text-4xl md:text-5xl font-sentient">Наш состав</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {players.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>

      <div className="h-px bg-white/10 max-w-5xl mx-auto" />

      {/* MATCHES */}
      <section id="matches" className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Расписание</p>
          <h2 className="text-4xl md:text-5xl font-sentient">Матчи</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 border border-white/10 rounded-xl bg-white/5">
          <div className="text-6xl mb-4">🎮</div>
          <p className="font-mono text-foreground/40 text-sm uppercase tracking-widest">Матчи скоро будут добавлены</p>
        </div>
      </section>

      <div className="h-px bg-white/10 max-w-5xl mx-auto" />

      {/* NEWS */}
      <section id="news" className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Клан</p>
          <h2 className="text-4xl md:text-5xl font-sentient">Новости</h2>
        </div>
        <div className="border border-primary/30 bg-primary/5 rounded-xl p-8 md:p-10">
          <div className="flex items-start gap-4">
            <div className="text-primary font-mono text-xs uppercase tracking-widest pt-1 whitespace-nowrap">01 Mar 2026</div>
            <div>
              <h3 className="text-xl font-bold mb-3">Состав Natus Ventures сформирован!</h3>
              <p className="text-foreground/60 font-mono text-sm leading-relaxed">
                Рады объявить, что наш состав официально сформирован. К нам пришли сильные игроки, готовые бороться за победу на каждом турнире. Каждый из них прошёл жёсткий отбор и доказал свой уровень. Мы готовы к старту — следите за нашими матчами!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-white/10 max-w-5xl mx-auto" />

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Трофеи</p>
          <h2 className="text-4xl md:text-5xl font-sentient">Достижения</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="border border-yellow-400/40 bg-yellow-400/5 rounded-xl p-8 flex flex-col items-center gap-3 flex-1 max-w-sm">
            <div className="text-5xl">🥈</div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400 font-mono">DuoCup SaemArena</div>
              <div className="text-sm text-foreground/50 mt-1 uppercase tracking-widest font-mono">2-е место</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 text-center font-mono text-xs text-foreground/20 uppercase tracking-widest border-t border-white/10">
        © 2026 Natus Ventures. All rights reserved.
      </footer>
    </>
  );
}
