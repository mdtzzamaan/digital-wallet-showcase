import { ArrowUpRight, Plus, Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";

type Account = {
  id: string | number;
  nickname: string;
  holder: string;
  currency: "USD" | "BDT";
  symbol: string;
  balance: number;
  available: number;
  masked: string;
  type?: string;
  theme: "indigo" | "noir" | "emerald";
};

const accounts: Account[] = [
  {
    id: 1152,
    nickname: "USD Account",
    holder: "Mr. Alex",
    currency: "USD",
    symbol: "$",
    balance: 2180.31,
    available: 2180.31,
    masked: "•••• 7482",
    theme: "indigo",
  },
  {
    id: 1172,
    nickname: "Salary Debit",
    holder: "Edu Net",
    currency: "USD",
    symbol: "$",
    balance: 31.01,
    available: 31.01,
    masked: "•••• 0868",
    type: "Business",
    theme: "noir",
  },
  {
    id: "e50168f1",
    nickname: "Tour Sri Lanka",
    holder: "Mr. Alex",
    currency: "BDT",
    symbol: "৳",
    balance: 1131.0,
    available: 631.0,
    masked: "•••• 5935",
    theme: "emerald",
  },
];

const themes = {
  indigo: {
    bg: "linear-gradient(160deg, oklch(0.98 0.012 270) 0%, oklch(0.96 0.022 265) 100%)",
    accent: "oklch(0.42 0.18 270)",
    accentSoft: "oklch(0.92 0.05 270)",
    ink: "oklch(0.22 0.06 270)",
    mark: "oklch(0.42 0.18 270 / 0.08)",
  },
  emerald: {
    bg: "linear-gradient(160deg, oklch(0.97 0.025 160) 0%, oklch(0.93 0.05 158) 100%)",
    accent: "oklch(0.45 0.13 160)",
    accentSoft: "oklch(0.9 0.06 160)",
    ink: "oklch(0.24 0.06 160)",
    mark: "oklch(0.45 0.13 160 / 0.1)",
  },
  noir: {
    bg: "linear-gradient(160deg, oklch(0.22 0.01 270) 0%, oklch(0.14 0.012 270) 100%)",
    accent: "oklch(0.92 0.005 270)",
    accentSoft: "oklch(1 0 0 / 0.1)",
    ink: "oklch(0.98 0 0)",
    mark: "oklch(1 0 0 / 0.06)",
  },
};

const fmt = (n: number, c: "USD" | "BDT") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: c,
    minimumFractionDigits: 2,
  }).format(n);

function WalletCard({ a, hidden }: { a: Account; hidden: boolean }) {
  const t = themes[a.theme];
  return (
    <article
      className="group relative shrink-0 w-[280px] rounded-3xl p-5 flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: t.bg,
        border: `1px solid ${t.accentSoft}`,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 12px 32px -16px rgba(20,20,40,0.12)",
      }}
    >
      {/* watermark currency symbol */}
      <div
        className="absolute -right-4 -bottom-10 pointer-events-none select-none font-serif leading-none"
        style={{
          fontSize: "220px",
          fontWeight: 600,
          color: t.mark,
          letterSpacing: "-0.05em",
        }}
        aria-hidden
      >
        {a.symbol}
      </div>

      {/* header */}
      <header className="relative flex items-center justify-between">
        <div
          className="flex items-center gap-2 px-2.5 py-1 rounded-full"
          style={{ background: t.accentSoft }}
        >
          <Wallet className="w-3 h-3" style={{ color: t.accent }} />
          <span
            className="text-[10px] font-semibold tracking-[0.12em]"
            style={{ color: t.accent }}
          >
            {(a.type ?? "Wallet").toUpperCase()}
          </span>
        </div>
        <span className="text-[11px] tabular-nums" style={{ color: t.ink, opacity: 0.5 }}>
          {a.masked}
        </span>
      </header>

      {/* balance */}
      <div className="relative">
        <p className="text-[11px] mb-1.5" style={{ color: t.ink, opacity: 0.6 }}>
          Available balance
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className="text-[15px] font-medium"
            style={{ color: t.ink, opacity: 0.55 }}
          >
            {a.symbol}
          </span>
          <p
            className="text-[28px] font-semibold tracking-tight tabular-nums leading-none"
            style={{ color: t.ink }}
          >
            {hidden
              ? "••••••"
              : new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                }).format(a.available)}
          </p>
        </div>
      </div>

      {/* footer */}
      <footer className="relative flex items-center justify-between mt-auto">
        <div className="min-w-0">
          <p
            className="text-[13px] font-medium truncate"
            style={{ color: t.ink }}
          >
            {a.nickname}
          </p>
        </div>
        <button
          aria-label="Open wallet"
          className="w-9 h-9 rounded-full flex items-center justify-center transition hover:scale-105"
          style={{ background: t.accent, color: "white" }}
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
            <WalletCard key={a.id} a={a} hidden={hidden} />
          ))}
        </div>
      </div>
    </section>
  );
}
