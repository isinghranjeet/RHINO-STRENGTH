import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND } from "@/lib/gym/brand";
import type { MembershipPlan } from "@/lib/gym/types";

/** Enquiry form for a plan; logs the enquiry then opens WhatsApp. */
export function MembershipEnquiryModal({ plan, onClose }: { plan: MembershipPlan; onClose: () => void }) {
  const { publishedData, addEnquiry } = useApp();
  const info = publishedData.contactInfo;
  // Enquiry Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    
    addEnquiry({
      type: 'Membership Enquiry',
      planName: plan ? plan.name : 'General Enquiry',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    // WhatsApp handoff link
    const cleanWa = (info.whatsapp || BRAND.phoneRaw).replace(/[^\d]/g, '') || BRAND.phoneRaw;
    const waText = `Hi Rhino Strength Gym, I am interested in the ${plan ? plan.name : 'Membership'}. My name is ${formData.name}.`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`, '_blank');
    
    onClose();
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-zinc-800 rounded-xl max-w-md w-full p-6 space-y-4 relative">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">MEMBERSHIP ENQUIRY</span>
          <h3 className="text-2xl font-black text-white uppercase">{plan.name}</h3>
        </div>
        <p className="text-xs text-zinc-400">Fill in your contact details below. We will send price plans and confirm your visit.</p>

        <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-2 text-xs">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Debajit Gogoi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              placeholder="+91 93958 27174"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Message / Goal</label>
            <textarea
              rows={2}
              placeholder="Tell us about your target strength goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-deep text-black font-extrabold py-3 rounded uppercase tracking-wider transition-colors mt-2"
          >
            SUBMIT & OPEN WHATSAPP HANDOFF
          </button>
        </form>
      </div>
    </div>
  );
}
