import { useState, useEffect, useMemo } from "react";
import { Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { PageBanner } from "@/components/layout/PageBanner";

export function SchedulePage() {
  const navigate = useGo();
  const { publishedData, trackPageView } = useApp();
  const schedule = publishedData.schedule.filter(s => s.published);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [filterSession, setFilterSession] = useState('All');

  useEffect(() => trackPageView('/schedule'), []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const daySessions = useMemo(() => {
    return schedule.filter(s => {
      const matchDay = s.day === selectedDay;
      const matchType = filterSession === 'All' || s.sessionType === filterSession;
      return matchDay && matchType;
    });
  }, [schedule, selectedDay, filterSession]);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="WEEKLY TRAINING SCHEDULE" subtitle="Morning and Evening coached sessions on the Lakhimpur strength floor." breadcrumb="SCHEDULE" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Days Selector Tabs */}
        <div className="flex overflow-x-auto gap-2 bg-card p-3 rounded-xl border border-zinc-800 scrollbar-none">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-5 py-2 rounded text-xs font-black uppercase transition-colors shrink-0 ${
                selectedDay === d ? 'bg-gold text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Filter Session Type */}
        <div className="flex gap-2 text-xs">
          {['All', 'Morning Session', 'Evening Session'].map(st => (
            <button
              key={st}
              onClick={() => setFilterSession(st)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                filterSession === st ? 'border-ember text-ember bg-ember/10' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {daySessions.length > 0 ? (
            daySessions.map(session => (
              <div key={session.id} className="bg-card p-5 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-900 px-3.5 py-2 rounded text-center border border-zinc-800 shrink-0">
                    <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-zinc-300">{session.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-gold bg-gold/10 px-2 py-0.5 rounded">
                      {session.category}
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase mt-1">{session.title}</h3>
                    {session.description && <p className="text-xs text-zinc-400 mt-0.5">{session.description}</p>}
                    <p className="text-xs text-zinc-400 mt-1">Coach: <span className="text-white font-semibold">{session.trainer}</span></p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => navigate('/membership')}
                    className="bg-ember hover:bg-ember-deep text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    JOIN THIS SESSION
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No specific coached group sessions scheduled for this day filter. Gym open lifting area is accessible during operating hours.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
