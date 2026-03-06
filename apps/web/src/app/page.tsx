import { TeamGrid } from "@/components/team";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-12 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          PitLine 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Official Teams & Drivers Personnel
        </p>
      </header>

      <TeamGrid />
    </div>
  );
}
