import { useState, type FormEvent } from "react";
import { X, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";
import type { ScheduleItem } from "@/lib/gym/types";

/** Admin tab: Schedule CMS. */
export function ScheduleCmsTab() {
  const { draftData, showToast } = useApp();
  const { commitCollectionChange } = useCmsActions();

  // 3. Schedule Manager State
  const [schFormOpen, setSchFormOpen] = useState(false);
  const [editingSchId, setEditingSchId] = useState<string | null>(null);
  const [schForm, setSchForm] = useState({ day: 'Monday', time: '', title: '', category: 'Strength', trainer: '', sessionType: 'Morning Session', description: '', published: true });

  // --- HANDLERS: 3. SCHEDULE MANAGER ---
  const openAddSchedule = () => {
    setEditingSchId(null);
    setSchForm({ day: 'Monday', time: '06:00 AM - 07:00 AM', title: '', category: 'Strength', trainer: draftData.trainers[0]?.name || 'Vikram Sharma', sessionType: 'Morning Session', description: '', published: true });
    setSchFormOpen(true);
  };
  const openEditSchedule = (sch: ScheduleItem) => {
    setEditingSchId(sch.id);
    setSchForm({
      day: sch.day,
      time: sch.time,
      title: sch.title,
      category: sch.category,
      trainer: sch.trainer,
      sessionType: sch.sessionType || 'Morning Session',
      description: sch.description || '',
      published: sch.published !== false
    });
    setSchFormOpen(true);
  };
  const handleSaveSchedule = (e: FormEvent) => {
    e.preventDefault();
    if (!schForm.title.trim() || !schForm.time.trim()) {
      showToast('Class name and timing are required.', 'error');
      return;
    }
    let updated;
    if (editingSchId) {
      updated = draftData.schedule.map(s => s.id === editingSchId ? { ...s, ...schForm } : s);
      commitCollectionChange('schedule', updated, 'Schedule session updated!');
    } else {
      updated = [{ id: 'sch-' + Date.now(), ...schForm }, ...draftData.schedule];
      commitCollectionChange('schedule', updated, 'New schedule class added!');
    }
    setSchFormOpen(false);
    setEditingSchId(null);
  };
  const handleDeleteSchedule = (id: string) => {
    const updated = draftData.schedule.filter(s => s.id !== id);
    commitCollectionChange('schedule', updated, 'Schedule class deleted.');
  };
  const handleToggleScheduleStatus = (id: string) => {
    const updated = draftData.schedule.map(s => s.id === id ? { ...s, published: !s.published } : s);
    commitCollectionChange('schedule', updated, 'Schedule visibility updated.');
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-gold uppercase">SCHEDULE MANAGER</h3>
          <p className="text-zinc-400">Add, edit, or delete workout classes across Monday–Sunday. Reflects immediately on the public Schedule page.</p>
        </div>
        <button
          onClick={openAddSchedule}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> ADD CLASS SESSION
        </button>
      </div>

      {schFormOpen && (
        <form onSubmit={handleSaveSchedule} className="bg-zinc-900 p-5 rounded-xl border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">{editingSchId ? 'Edit Workout Session' : 'Add Workout Session'}</span>
            <button type="button" onClick={() => setSchFormOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Class Name *</label>
              <input
                type="text"
                required
                value={schForm.title}
                onChange={(e) => setSchForm({ ...schForm, title: e.target.value })}
                placeholder="e.g. Heavy Barbell Strength"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Day of Week *</label>
              <select
                value={schForm.day}
                onChange={(e) => setSchForm({ ...schForm, day: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Timing *</label>
              <input
                type="text"
                required
                value={schForm.time}
                onChange={(e) => setSchForm({ ...schForm, time: e.target.value })}
                placeholder="e.g. 06:00 AM - 07:30 AM"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Session Slot</label>
              <select
                value={schForm.sessionType}
                onChange={(e) => setSchForm({ ...schForm, sessionType: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="Morning Session">Morning Session</option>
                <option value="Evening Session">Evening Session</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Category</label>
              <select
                value={schForm.category}
                onChange={(e) => setSchForm({ ...schForm, category: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="Strength">Strength</option>
                <option value="Muscle">Muscle</option>
                <option value="Cardio">Cardio</option>
                <option value="Fat Loss">Fat Loss</option>
                <option value="Functional">Functional</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Assigned Trainer</label>
              <input
                type="text"
                value={schForm.trainer}
                onChange={(e) => setSchForm({ ...schForm, trainer: e.target.value })}
                placeholder="Trainer name"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Class Description (Optional)</label>
            <input
              type="text"
              value={schForm.description}
              onChange={(e) => setSchForm({ ...schForm, description: e.target.value })}
              placeholder="Brief focus or equipment details for this class..."
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={schForm.published}
              onChange={(e) => setSchForm({ ...schForm, published: e.target.checked })}
              className="accent-gold"
            />
            <span>Published on public Schedule</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2 rounded uppercase">
              Save Session
            </button>
            <button type="button" onClick={() => setSchFormOpen(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead>
            <tr className="border-b border-zinc-800 text-white uppercase">
              <th className="py-2.5 px-2">Day</th>
              <th className="py-2.5 px-2">Time</th>
              <th className="py-2.5 px-2">Class</th>
              <th className="py-2.5 px-2">Trainer</th>
              <th className="py-2.5 px-2">Status</th>
              <th className="py-2.5 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {draftData.schedule.map((sch) => (
              <tr key={sch.id}>
                <td className="py-3 px-2 font-bold text-gold">{sch.day}</td>
                <td className="py-3 px-2 font-mono">{sch.time}</td>
                <td className="py-3 px-2">
                  <div className="font-bold text-white">{sch.title}</div>
                  {sch.description && <div className="text-[11px] text-zinc-500">{sch.description}</div>}
                </td>
                <td className="py-3 px-2">{sch.trainer}</td>
                <td className="py-3 px-2">
                  <button
                    type="button"
                    onClick={() => handleToggleScheduleStatus(sch.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${sch.published ? 'bg-green-500/15 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                  >
                    {sch.published ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td className="py-3 px-2 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => openEditSchedule(sch)} className="text-zinc-300 hover:text-gold font-bold">Edit</button>
                  <button onClick={() => handleDeleteSchedule(sch.id)} className="text-red-400 hover:text-red-300 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
