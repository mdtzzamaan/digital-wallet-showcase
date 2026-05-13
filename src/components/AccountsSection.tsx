import { ArrowUpRight, Plus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Account = {
  id: string | number;
  nickname: string;
  holder: string;
  currency: "USD" | "BDT";
  balance: number;
  available: number;
  masked: string;
  type: "PERSONAL" | "BUSINESS";
};

const accounts: Account[] = [
  {
    id: 1152,
    nickname: "USD Account",
    holder: "Mr. Alex",
    currency: "USD",
    balance: 2180.31,
    available: 2180.31,
    masked: "101056 •••• 7482",
    type: "PERSONAL",
  },
  {
    id: 1172,
    nickname: "Salary Debit",
    holder: "Edu Net",
    currency: "USD",
    balance: 31.01,
    available: 31.01,
    masked: "101056 •••• 0868",
    type: "BUSINESS",
  },
  {
    id: "e50168f1",
    nickname: "Tour Sri Lanka",
    holder: "Mr. Alex",
    currency: "BDT",
    balance: 1131.0,
    available: 631.0,
    masked: "222909 •••• 5935",
    type: "PERSONAL",
  },
];

const fmt = (n: number, c: "USD" | "BDT") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: c,
    minimumFractionDigits: 2,
  }).format(n);

function AccountCard({ a, hidden }: { a: Account; hidden: boolean }) {
  const isUSD = a.currency === "USD";
  return (
    <article
      className="group relative shrink-0 w-[288px] h-[188px] rounded-2xl p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: isUSD
          ? "linear-gradient(135deg, var(--brand-midnight-deep), var(--brand-midnight))"
          : "linear-gradient(135deg, oklch(0.22 0.04 260), oklch(0.32 0.06 250))",
        color: "white",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 40px -20px rgba(15,15,74,0.45)",
      }}
    >
      {/* glow */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "var(--brand-amber)" }}
      />

      <header className="relative flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/55 mono">
            {a.type}
          </p>
          <h3 className="mt-1 text-[15px] font-medium truncate">{a.nickname}</h3>
        </div>
        <span
          className="text-[10px] font-semibold tracking-wider px-2 py-1 rounded-md"
          style={{
            background: "rgba(255,191,0,0.15)",
            color: "var(--brand-amber)",
          }}
        >
          {a.currency}
        </span>
      </header>

      <div className="relative">
        <p className="text-[11px] text-white/50 mb-1">Available balance</p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {hidden ? "•••• ••" : fmt(a.available, a.currency)}
        </p>
      </div>

      <footer className="relative flex items-center justify-between">
        <span className="text-[12px] text-white/60 mono">{a.masked}</span>
        <button
          aria-label="Open account"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </footer>
    </article>
  );
}

export function AccountsSection() {
  const [hidden, setHidden] = useState(false);
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Wallets
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Your accounts
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHidden((v) => !v)}
            className="h-9 px-3 rounded-full text-xs font-medium border border-border bg-card hover:bg-accent transition flex items-center gap-1.5"
          >
            {hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {hidden ? "Show" : "Hide"}
          </button>
          <button className="h-9 px-3 rounded-full text-xs font-medium bg-foreground text-background hover:opacity-90 transition flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      <div className="-mx-6 px-6 overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-2">
          {accounts.map((a) => (
            <AccountCard key={a.id} a={a} hidden={hidden} />
          ))}
        </div>
      </div>
    </section>
  );
}
