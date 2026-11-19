import { useState, type FormEvent } from "react";
import { X, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import type { GalleryItem } from "@/lib/gym/types";

/** Admin tab: Gallery CMS. */
export function GalleryCmsTab() {
  const { draftData, showToast } = useApp();
  const { commitCollectionChange, handleFileUploadToDataUrl } = useCmsActions();

  // 4. Gallery Manager State
  const [galFormOpen, setGalFormOpen] = useState(false);
  const [editingGalId, setEditingGalId] = useState<string | null>(null);
  const [galForm, setGalForm] = useState({ title: '', category: 'Interior', image: '', caption: '', published: true });

  // --- HANDLERS: 4. GALLERY MANAGER ---
  const openAddGallery = () => {
    setEditingGalId(null);
    setGalForm({ title: '', category: 'Interior', image: '', caption: '', published: true });
    setGalFormOpen(true);
  };
  const openEditGallery = (item: GalleryItem) => {
    setEditingGalId(item.id);
    setGalForm({ title: item.title, category: item.category, image: item.image, caption: item.caption || '', published: item.published !== false });
    setGalFormOpen(true);
  };
  const handleSaveGallery = (e: FormEvent) => {
    e.preventDefault();
    if (!galForm.title.trim() || !galForm.image.trim()) {
      showToast('Image title and image URL/upload are required.', 'error');
      return;
    }
    let updated;
    if (editingGalId) {
      updated = draftData.gallery.map(g => g.id === editingGalId ? { ...g, ...galForm } : g);
      commitCollectionChange('gallery', updated, 'Gallery image updated!');
    } else {
      updated = [{ id: 'gal-' + Date.now(), ...galForm }, ...draftData.gallery];
      commitCollectionChange('gallery', updated, 'Image added to public gallery!');
    }
    setGalFormOpen(false);
    setEditingGalId(null);
  };
  const handleDeleteGallery = (id: string) => {
    const updated = draftData.gallery.filter(g => g.id !== id);
    commitCollectionChange('gallery', updated, 'Gallery image deleted.');
  };
  const handleToggleGalleryStatus = (id: string) => {
    const updated = draftData.gallery.map(g => g.id === id ? { ...g, published: g.published === false ? true : false } : g);
    commitCollectionChange('gallery', updated, 'Gallery item visibility updated.');
  };

  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const handleSelectMediaFromPicker = (url: string) => {
    setGalForm(prev => ({ ...prev, image: url }));
    setMediaPickerTarget(null);
    showToast('Image selected from Media Library!');
  };

  return (
    <>
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-gold uppercase">GALLERY MANAGER</h3>
          <p className="text-zinc-400">Upload or add gallery photos, manage titles, categories, and visibility.</p>
        </div>
        <button
          onClick={openAddGallery}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> ADD GALLERY IMAGE
        </button>
      </div>

      {galFormOpen && (
        <form onSubmit={handleSaveGallery} className="bg-zinc-900 p-5 rounded-xl border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">{editingGalId ? 'Edit Gallery Item' : 'Add Gallery Image'}</span>
            <button type="button" onClick={() => setGalFormOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Image Title *</label>
              <input
                type="text"
                required
                value={galForm.title}
                onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                placeholder="e.g. Heavy Barbell Racks"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Category</label>
              <select
                value={galForm.category}
                onChange={(e) => setGalForm({ ...galForm, category: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="Interior">Interior</option>
                <option value="Equipment">Equipment</option>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Caption / Description</label>
            <input
              type="text"
              value={galForm.caption}
              onChange={(e) => setGalForm({ ...galForm, caption: e.target.value })}
              placeholder="Short caption shown in lightbox view..."
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-zinc-300 font-bold">Image URL or Upload *</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                value={galForm.image}
                onChange={(e) => setGalForm({ ...galForm, image: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
              <label className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-2.5 rounded cursor-pointer text-center">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUploadToDataUrl(e.target.files?.[0], (url) => setGalForm(prev => ({ ...prev, image: url })))}
                />
              </label>
              <button
                type="button"
                onClick={() => setMediaPickerTarget('gallery')}
                className="bg-ember hover:bg-ember-deep text-white font-bold px-3 py-2.5 rounded"
              >
                Select from Media
              </button>
            </div>
            {galForm.image && (
              <img src={galForm.image} alt="Gallery Preview" className="h-28 w-44 object-cover rounded border border-zinc-700 mt-2" />
            )}
          </div>
          <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={galForm.published}
              onChange={(e) => setGalForm({ ...galForm, published: e.target.checked })}
              className="accent-gold"
            />
            <span>Visible in public Gallery</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2 rounded uppercase">
              Save Image
            </button>
            <button type="button" onClick={() => setGalFormOpen(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {draftData.gallery.map((item) => (
          <div key={item.id} className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex flex-col justify-between">
            <div>
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gold uppercase">{item.category}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleGalleryStatus(item.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.published !== false ? 'bg-green-500/15 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                  >
                    {item.published !== false ? 'Visible' : 'Hidden'}
                  </button>
                </div>
                <h4 className="font-bold text-white uppercase truncate">{item.title}</h4>
                <p className="text-zinc-400 line-clamp-1">{item.caption}</p>
              </div>
            </div>
            <div className="p-3 pt-0 flex justify-end gap-2">
              <button onClick={() => openEditGallery(item)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded font-bold">Edit</button>
              <button onClick={() => handleDeleteGallery(item.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1 rounded font-bold">Delete</button>
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
