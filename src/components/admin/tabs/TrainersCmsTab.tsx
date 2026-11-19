import { useState, type FormEvent } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import type { Trainer } from "@/lib/gym/types";

/** Admin tab: Trainers CMS. */
export function TrainersCmsTab() {
  const { draftData, showToast } = useApp();
  const { commitCollectionChange, handleFileUploadToDataUrl } = useCmsActions();

  // 2. Trainer Manager State
  const [trFormOpen, setTrFormOpen] = useState(false);
  const [editingTrId, setEditingTrId] = useState<string | null>(null);
  const [trForm, setTrForm] = useState({ name: '', designation: '', spec: '', experience: '', bio: '', image: '', qualificationsText: '', published: true });

  // --- HANDLERS: 2. TRAINER MANAGER ---
  const openAddTrainer = () => {
    setEditingTrId(null);
    setTrForm({ name: '', designation: '', spec: '', experience: '', bio: '', image: '', qualificationsText: '', published: true });
    setTrFormOpen(true);
  };
  const openEditTrainer = (tr: Trainer) => {
    setEditingTrId(tr.id);
    setTrForm({
      name: tr.name,
      designation: tr.designation || '',
      spec: tr.spec || '',
      experience: tr.experience || '',
      bio: tr.bio || '',
      image: tr.image || '',
      qualificationsText: (tr.qualifications || []).join(', '),
      published: tr.published !== false
    });
    setTrFormOpen(true);
  };
  const handleSaveTrainer = (e: FormEvent) => {
    e.preventDefault();
    if (!trForm.name.trim() || !trForm.spec.trim()) {
      showToast('Trainer name and specialty are required.', 'error');
      return;
    }
    const imageUrl = trForm.image.trim() || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80';
    const qualifications = trForm.qualificationsText.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      name: trForm.name.trim(),
      designation: trForm.designation.trim() || 'Certified Fitness Coach',
      spec: trForm.spec.trim(),
      experience: trForm.experience.trim() || '3+ Years Experience',
      bio: trForm.bio.trim() || 'Dedicated strength and conditioning coach at Rhino Strength Gym.',
      image: imageUrl,
      qualifications: qualifications.length ? qualifications : ['Certified Strength Coach'],
      published: trForm.published,
      isDemo: true
    };
    let updated;
    if (editingTrId) {
      updated = draftData.trainers.map(t => t.id === editingTrId ? { ...t, ...payload } : t);
      commitCollectionChange('trainers', updated, 'Trainer profile updated!');
    } else {
      updated = [{ id: 'tr-' + Date.now(), ...payload }, ...draftData.trainers];
      commitCollectionChange('trainers', updated, 'New trainer added!');
    }
    setTrFormOpen(false);
    setEditingTrId(null);
  };
  const handleDeleteTrainer = (id: string) => {
    const updated = draftData.trainers.filter(t => t.id !== id);
    commitCollectionChange('trainers', updated, 'Trainer profile removed.');
  };
  const handleToggleTrainerStatus = (id: string) => {
    const updated = draftData.trainers.map(t => t.id === id ? { ...t, published: !t.published } : t);
    commitCollectionChange('trainers', updated, 'Trainer visibility updated.');
  };

  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const handleSelectMediaFromPicker = (url: string) => {
    setTrForm(prev => ({ ...prev, image: url }));
    setMediaPickerTarget(null);
    showToast('Image selected from Media Library!');
  };

  return (
    <>
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-gold uppercase">TRAINER MANAGER</h3>
          <p className="text-zinc-400">Add, edit, or delete trainer profiles. Changes immediately update the public Trainers page.</p>
        </div>
        <button
          onClick={openAddTrainer}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> ADD TRAINER
        </button>
      </div>

      {trFormOpen && (
        <form onSubmit={handleSaveTrainer} className="bg-zinc-900 p-5 rounded-xl border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">{editingTrId ? 'Edit Trainer Profile' : 'Add New Trainer'}</span>
            <button type="button" onClick={() => setTrFormOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Trainer Name *</label>
              <input
                type="text"
                required
                value={trForm.name}
                onChange={(e) => setTrForm({ ...trForm, name: e.target.value })}
                placeholder="e.g. Vikram Sharma"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Designation / Role</label>
              <input
                type="text"
                value={trForm.designation}
                onChange={(e) => setTrForm({ ...trForm, designation: e.target.value })}
                placeholder="e.g. Head Strength Coach"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Specialties *</label>
              <input
                type="text"
                required
                value={trForm.spec}
                onChange={(e) => setTrForm({ ...trForm, spec: e.target.value })}
                placeholder="e.g. Powerlifting & Barbell Strength"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Experience</label>
              <input
                type="text"
                value={trForm.experience}
                onChange={(e) => setTrForm({ ...trForm, experience: e.target.value })}
                placeholder="e.g. 8+ Years Experience"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Biography</label>
            <textarea
              rows={3}
              value={trForm.bio}
              onChange={(e) => setTrForm({ ...trForm, bio: e.target.value })}
              placeholder="Trainer coaching philosophy, background, and achievements..."
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Qualifications (comma-separated)</label>
            <input
              type="text"
              value={trForm.qualificationsText}
              onChange={(e) => setTrForm({ ...trForm, qualificationsText: e.target.value })}
              placeholder="NSCA Certified, Sports Nutrition, CPR/AED"
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-zinc-300 font-bold">Trainer Photo URL or Upload</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={trForm.image}
                onChange={(e) => setTrForm({ ...trForm, image: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
              <label className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-2.5 rounded cursor-pointer text-center">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUploadToDataUrl(e.target.files?.[0], (url) => setTrForm(prev => ({ ...prev, image: url })))}
                />
              </label>
              <button
                type="button"
                onClick={() => setMediaPickerTarget('trainer')}
                className="bg-ember hover:bg-ember-deep text-white font-bold px-3 py-2.5 rounded"
              >
                Select from Media
              </button>
            </div>
            {trForm.image && (
              <img src={trForm.image} alt="Trainer Preview" className="h-24 w-24 object-cover rounded-full border border-gold mt-2" />
            )}
          </div>
          <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={trForm.published}
              onChange={(e) => setTrForm({ ...trForm, published: e.target.checked })}
              className="accent-gold"
            />
            <span>Published on public Trainers page</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2 rounded uppercase">
              Save Trainer
            </button>
            <button type="button" onClick={() => setTrFormOpen(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {draftData.trainers.map((tr) => (
          <div key={tr.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={tr.image} alt={tr.name} className="w-14 h-14 rounded-full object-cover border border-gold shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-gold uppercase truncate">{tr.spec}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleTrainerStatus(tr.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${tr.published ? 'bg-green-500/15 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                    >
                      {tr.published ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                  <h4 className="font-bold text-white uppercase truncate">{tr.name}</h4>
                  <p className="text-zinc-400 text-[11px] truncate">{tr.experience}</p>
                </div>
              </div>
              <p className="text-zinc-400 line-clamp-2">{tr.bio}</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button onClick={() => openEditTrainer(tr)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1 font-bold">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDeleteTrainer(tr.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded flex items-center gap-1 font-bold">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    {mediaPickerTarget && (
      <MediaPickerModal target={mediaPickerTarget} onClose={() => setMediaPickerTarget(null)} onSelect={handleSelectMediaFromPicker} />
    )}
    </>
  );
}
