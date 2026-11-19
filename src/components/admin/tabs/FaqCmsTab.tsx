import { useState, type FormEvent } from "react";
import { X, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";
import type { Faq } from "@/lib/gym/types";

/** Admin tab: FAQ CMS. */
export function FaqCmsTab() {
  const { draftData, showToast } = useApp();
  const { commitCollectionChange } = useCmsActions();

  // 5. FAQ Manager State
  const [faqFormOpen, setFaqFormOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ category: 'Membership', q: '', a: '', published: true });

  // --- HANDLERS: 5. FAQ MANAGER ---
  const openAddFaq = () => {
    setEditingFaqId(null);
    setFaqForm({ category: 'Membership', q: '', a: '', published: true });
    setFaqFormOpen(true);
  };
  const openEditFaq = (faq: Faq) => {
    setEditingFaqId(faq.id);
    setFaqForm({ category: faq.category, q: faq.q, a: faq.a, published: faq.published !== false });
    setFaqFormOpen(true);
  };
  const handleSaveFaq = (e: FormEvent) => {
    e.preventDefault();
    if (!faqForm.q.trim() || !faqForm.a.trim()) {
      showToast('Both question and answer are required.', 'error');
      return;
    }
    let updated;
    if (editingFaqId) {
      updated = draftData.faqs.map(f => f.id === editingFaqId ? { ...f, ...faqForm } : f);
      commitCollectionChange('faqs', updated, 'FAQ updated!');
    } else {
      updated = [{ id: 'faq-' + Date.now(), ...faqForm }, ...draftData.faqs];
      commitCollectionChange('faqs', updated, 'New FAQ added!');
    }
    setFaqFormOpen(false);
    setEditingFaqId(null);
  };
  const handleDeleteFaq = (id: string) => {
    const updated = draftData.faqs.filter(f => f.id !== id);
    commitCollectionChange('faqs', updated, 'FAQ deleted.');
  };
  const handleToggleFaqStatus = (id: string) => {
    const updated = draftData.faqs.map(f => f.id === id ? { ...f, published: !f.published } : f);
    commitCollectionChange('faqs', updated, 'FAQ visibility updated.');
  };
  const handleMoveFaq = (index: number, direction: number) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= draftData.faqs.length) return;
    const copy = [...draftData.faqs];
    const [moved] = copy.splice(index, 1);
    if (!moved) return;
    copy.splice(targetIndex, 0, moved);
    commitCollectionChange('faqs', copy, 'FAQ order updated.');
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-gold uppercase">FAQ MANAGER</h3>
          <p className="text-zinc-400">Add, edit, delete, reorder, or toggle visibility of FAQs shown on the public FAQ page.</p>
        </div>
        <button
          onClick={openAddFaq}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> ADD FAQ
        </button>
      </div>

      {faqFormOpen && (
        <form onSubmit={handleSaveFaq} className="bg-zinc-900 p-5 rounded-xl border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">{editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}</span>
            <button type="button" onClick={() => setFaqFormOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Category</label>
              <select
                value={faqForm.category}
                onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              >
                <option value="Membership">Membership</option>
                <option value="Beginners">Beginners</option>
                <option value="Training">Training</option>
                <option value="Personal Training">Personal Training</option>
                <option value="Facilities">Facilities</option>
                <option value="Schedule">Schedule</option>
                <option value="Contact">Contact</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-zinc-300 font-bold mb-1">Question *</label>
              <input
                type="text"
                required
                value={faqForm.q}
                onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                placeholder="e.g. What are the gym operating hours?"
                className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Answer *</label>
            <textarea
              rows={3}
              required
              value={faqForm.a}
              onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
              placeholder="Detailed helpful response..."
              className="w-full bg-black border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={faqForm.published}
              onChange={(e) => setFaqForm({ ...faqForm, published: e.target.checked })}
              className="accent-gold"
            />
            <span>Visible on public FAQ page</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-gold hover:bg-gold-deep text-black font-extrabold px-5 py-2 rounded uppercase">
              Save FAQ
            </button>
            <button type="button" onClick={() => setFaqFormOpen(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {draftData.faqs.map((faq, idx) => (
          <div key={faq.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gold uppercase bg-gold/10 px-2 py-0.5 rounded">{faq.category}</span>
                <button
                  type="button"
                  onClick={() => handleToggleFaqStatus(faq.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${faq.published ? 'bg-green-500/15 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}
                >
                  {faq.published ? 'Published' : 'Hidden'}
                </button>
              </div>
              <h4 className="font-bold text-white">{faq.q}</h4>
              <p className="text-zinc-400 line-clamp-2">{faq.a}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMoveFaq(idx, -1)}
                className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white px-2 py-1.5 rounded font-bold"
                title="Move Up"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={idx === draftData.faqs.length - 1}
                onClick={() => handleMoveFaq(idx, 1)}
                className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white px-2 py-1.5 rounded font-bold"
                title="Move Down"
              >
                ↓
              </button>
              <button onClick={() => openEditFaq(faq)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded font-bold">Edit</button>
              <button onClick={() => handleDeleteFaq(faq.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded font-bold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
