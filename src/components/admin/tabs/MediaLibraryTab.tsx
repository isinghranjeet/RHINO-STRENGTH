import { useState, type FormEvent } from "react";
import { Trash2, Search, Copy } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";

/** Admin tab: Media Library. */
export function MediaLibraryTab() {
  const { mediaLibrary, setMediaLibrary, showToast } = useApp();
  const { handleFileUploadToDataUrl } = useCmsActions();

  // 7. Media Library State
  const [mediaForm, setMediaForm] = useState({ title: '', category: 'Gym Floor', url: '', alt: '' });
  const [mediaSearch, setMediaSearch] = useState('');

  const handleAddMediaItem = (e: FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title.trim() || !mediaForm.url.trim()) {
      showToast('Media title and image URL or file upload are required.', 'error');
      return;
    }
    const newItem = {
      id: 'med-' + Date.now(),
      title: mediaForm.title.trim(),
      category: mediaForm.category,
      url: mediaForm.url.trim(),
      alt: mediaForm.alt.trim() || mediaForm.title.trim()
    };
    setMediaLibrary(prev => [newItem, ...prev]);
    setMediaForm({ title: '', category: 'Gym Floor', url: '', alt: '' });
    showToast('Image added to Media Library!');
  };

  const handleDeleteMediaItem = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
    showToast('Media item deleted.');
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div>
        <h3 className="text-lg font-black text-gold uppercase">MEDIA LIBRARY</h3>
        <p className="text-zinc-400">Upload images from your device or save image URLs to reuse across Facilities, Trainers, and Gallery.</p>
      </div>

      <form onSubmit={handleAddMediaItem} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Image Title *</label>
            <input
              type="text"
              required
              value={mediaForm.title}
              onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
              placeholder="e.g. Power Rack Zone"
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Category</label>
            <select
              value={mediaForm.category}
              onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            >
              <option value="Gym Floor">Gym Floor</option>
              <option value="Equipment">Equipment</option>
              <option value="Trainers">Trainers</option>
              <option value="Cardio">Cardio</option>
              <option value="Branding">Branding</option>
            </select>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Alt Text</label>
            <input
              type="text"
              value={mediaForm.alt}
              onChange={(e) => setMediaForm({ ...mediaForm, alt: e.target.value })}
              placeholder="Descriptive alt text"
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={mediaForm.url}
            onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
            placeholder="Paste image URL or upload file..."
            className="flex-1 bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
          <label className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 rounded cursor-pointer text-center">
            Upload File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUploadToDataUrl(e.target.files?.[0], (url) => setMediaForm(prev => ({ ...prev, url })))}
            />
          </label>
          <button
            type="submit"
            className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2.5 rounded uppercase"
          >
            Save to Library
          </button>
        </div>

        {mediaForm.url && (
          <div className="flex items-center gap-3 pt-1">
            <img src={mediaForm.url} alt="Upload Preview" className="w-20 h-20 object-cover rounded border border-gold" />
            <span className="text-zinc-400">Preview ready to save.</span>
          </div>
        )}
      </form>

      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={mediaSearch}
            onChange={(e) => setMediaSearch(e.target.value)}
            placeholder="Filter media by title or category..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded pl-9 pr-3 py-2 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <span className="text-zinc-400">{mediaLibrary.length} items stored</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaLibrary
          .filter(m => m.title.toLowerCase().includes(mediaSearch.toLowerCase()) || m.category.toLowerCase().includes(mediaSearch.toLowerCase()))
          .map((m) => (
            <div key={m.id} className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex flex-col justify-between">
              <div>
                <img src={m.url} alt={m.alt || m.title} className="w-full h-36 object-cover" />
                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-bold text-gold uppercase">{m.category}</span>
                  <h4 className="font-bold text-white truncate">{m.title}</h4>
                </div>
              </div>
              <div className="p-3 pt-0 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(m.url);
                    showToast('Image URL copied to clipboard!');
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-2.5 py-1 rounded flex items-center gap-1 font-bold"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMediaItem(m.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 rounded flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
