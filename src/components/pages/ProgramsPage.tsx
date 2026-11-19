import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { ProgramDetailsModal } from "@/components/programs/ProgramDetailsModal";
import { ProgramCard } from "@/components/programs/ProgramCard";
import type { Program } from "@/lib/gym/types";

export function ProgramsPage() {
  const { publishedData, trackPageView } = useApp();
  const programs = publishedData.programs.filter(p => p.published);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProg, setActiveModalProg] = useState<Program | null>(null);

  useEffect(() => trackPageView('/programs'), []);

  const categories = ['All', 'Strength', 'Muscle', 'Cardio', 'Fat Loss', 'Personal', 'Functional', 'General'];

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [programs, selectedCategory, searchQuery]);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="SPECIALIZED TRAINING PROGRAMS" subtitle="8 Targeted curriculums for strength, hypertrophy, fat conditioning, and mobility." breadcrumb="PROGRAMS" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Controls: Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-zinc-800">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                  selectedCategory === cat ? 'bg-gold text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <ProgramCard key={prog.id} prog={prog} onOpen={() => setActiveModalProg(prog)} />
          ))}
        </div>
      </section>

      {activeModalProg && <ProgramDetailsModal program={activeModalProg} onClose={() => setActiveModalProg(null)} />}
    </div>
  );
}
