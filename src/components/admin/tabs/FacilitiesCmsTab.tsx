import { useState, type FormEvent } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import type { Facility } from "@/lib/gym/types";

/** Admin tab: Facilities CMS. */
export function FacilitiesCmsTab() {
  const { draftData, showToast } = useApp();
  const { commitCollectionChange, handleFileUploadToDataUrl } = useCmsActions();

  // 1. Facilities Manager State
  const [facFormOpen, setFacFormOpen] = useState(false);
  const [editingFacId, setEditingFacId] = useState<string | null>(null);
  const [facForm, setFacForm] = useState({ name: '', category: 'Strength', desc: '', image: '', published: true });

  // --- HANDLERS: 1. FACILITIES MANAGER ---
  const openAddFacility = () => {
    setEditingFacId(null);
    setFacForm({ name: '', category: 'Strength', desc: '', image: '', published: true });
    setFacFormOpen(true);
  };
  const openEditFacility = (fac: Facility) => {
    setEditingFacId(fac.id);
    setFacForm({ name: fac.name, category: fac.category, desc: fac.desc, image: fac.image, published: fac.published !== false });
    setFacFormOpen(true);
  };
  const handleSaveFacility = (e: FormEvent) => {
    e.preventDefault();
    if (!facForm.name.trim() || !facForm.desc.trim()) {
      showToast('Facility name and description are required.', 'error');
      return;
    }
    const imageUrl = facForm.image.trim() || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80';
    let updated;
    if (editingFacId) {
      updated = draftData.facilities.map(f => f.id === editingFacId ? { ...f, ...facForm, image: imageUrl } : f);
      commitCollectionChange('facilities', updated, 'Facility updated and synced!');
    } else {
      const newFac = { id: 'fac-' + Date.now(), ...facForm, image: imageUrl };
      updated = [newFac, ...draftData.facilities];
      commitCollectionChange('facilities', updated, 'New facility added!');
    }
    setFacFormOpen(false);
    setEditingFacId(null);
  };
  const handleDeleteFacility = (id: string) => {
    const updated = draftData.facilities.filter(f => f.id !== id);
    commitCollectionChange('facilities', updated, 'Facility deleted.');
  };
  const handleToggleFacilityStatus = (id: string) => {
    const updated = draftData.facilities.map(f => f.id === id ? { ...f, published: !f.published } : f);
    commitCollectionChange('facilities', updated, 'Facility visibility updated.');
  };

  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const handleSelectMediaFromPicker = (url: string) => {
    setFacForm(prev => ({ ...prev, image: url }));
    setMediaPickerTarget(null);
    showToast('Image selected from Media Library!');
  };

  return (
    <>
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-gold uppercase">FACILITIES MANAGER</h3>
          <p className="text-zinc-400">Add, edit, delete, or toggle visibility of gym facilities. Changes sync live.</p>
        </div>
        <button
          onClick={openAddFacility}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> ADD FACILITY
        </button>
      </div>

      {facFormOpen && (
        <form onSubmit={handleSaveFacility} className="bg-zinc-900 p-5 rounded-xl border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">{editingFacId ? 'Edit Facility' : 'Add New Facility'}</span>
            <button type="button" onClick={() => setFacFormOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Facility Name *</label>
              <input
                type="text"
                required
                value={facForm.name}
                onChange={(e) => setFacForm({ ...facForm, name: e.target.value })}
                placeholder="e.g. Heavy Duty Strength Floor"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Category</label>
              <select
                value={facForm.category}
                onChange={(e) => setFacForm({ ...facForm, category: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="Strength">Strength</option>
                <option value="Equipment">Equipment</option>
                <option value="Cardio">Cardio</option>
                <option value="Functional">Functional</option>
                <option value="Personal">Personal</option>
                <option value="Amenities">Amenities</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={facForm.desc}
              onChange={(e) => setFacForm({ ...facForm, desc: e.target.value })}
              placeholder="Describe equipment, floor space, and features..."
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-zinc-300 font-bold">Facility Image URL or Upload</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={facForm.image}
                onChange={(e) => setFacForm({ ...facForm, image: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
              <label className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-2.5 rounded cursor-pointer text-center">
                Upload File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUploadToDataUrl(e.target.files?.[0], (url) => setFacForm(prev => ({ ...prev, image: url })))}
                />
              </label>
              <button
                type="button"
                onClick={() => setMediaPickerTarget('facility')}
                className="bg-ember hover:bg-ember-deep text-white font-bold px-3 py-2.5 rounded"
              >
                Select from Media
              </button>
            </div>
            {facForm.image && (
              <img src={facForm.image} alt="Preview" className="h-28 w-44 object-cover rounded border border-zinc-700 mt-2" />
            )}
          </div>
          <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={facForm.published}
              onChange={(e) => setFacForm({ ...facForm, published: e.target.checked })}
              className="accent-gold"
            />
            <span>Published (Visible on public website)</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2 rounded uppercase">
              Save Facility
            </button>
            <button type="button" onClick={() => setFacFormOpen(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {draftData.facilities.map((fac) => (
          <div key={fac.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex flex-col justify-between gap-3">
            <div className="flex gap-3">
              <img src={fac.image} alt={fac.name} className="w-24 h-24 object-cover rounded border border-zinc-800 shrink-0" />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase text-gold bg-gold/10 px-2 py-0.5 rounded">{fac.category}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleFacilityStatus(fac.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${fac.published ? 'bg-green-500/15 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                  >
                    {fac.published ? 'Published' : 'Hidden'}
                  </button>
                </div>
                <h4 className="font-bold text-white uppercase truncate">{fac.name}</h4>
                <p className="text-zinc-400 line-clamp-2">{fac.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button onClick={() => openEditFacility(fac)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1 font-bold">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDeleteFacility(fac.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded flex items-center gap-1 font-bold">
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
