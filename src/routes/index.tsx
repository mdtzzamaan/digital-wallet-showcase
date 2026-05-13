import { createFileRoute } from "@tanstack/react-router";
import { AccountsSection } from "@/components/AccountsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      {/* Top section placeholder (already built per spec) */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good morning</p>
            <h1 className="text-2xl font-semibold tracking-tight">Mr. Alex</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-foreground/5 border border-border" />
        </div>
      </div>

      <AccountsSection />
    </main>
  );
}
