import { useState, useEffect, useMemo } from "react";
import { Search, HelpCircle, ChevronDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";

export function FAQPage() {
  const { publishedData, trackPageView } = useApp();
  const faqs = publishedData.faqs.filter(f => f.published);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([]);

  useEffect(() => trackPageView('/faq'), []);

  const categories = ['All', 'Membership', 'Beginners', 'Training', 'Personal Training', 'Facilities', 'Schedule', 'Contact'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchCat = selectedCat === 'All' || f.category === selectedCat;
      const matchSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [faqs, selectedCat, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="FREQUENTLY ASKED QUESTIONS" subtitle="20+ Clear answers about memberships, training, facilities, and coaches." breadcrumb="FAQ" />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Controls */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                  selectedCat === cat ? 'bg-gold text-black' : 'bg-card text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div key={faq.id} className="bg-card rounded-xl border border-zinc-800 overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-bold text-sm text-white">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-zinc-950/40">
                    <span className="text-[10px] font-bold text-gold uppercase block mb-1">Category: {faq.category}</span>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
