import { Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

/** Admin tab: Enquiries. */
export function EnquiriesTab() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useApp();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">CUSTOMER ENQUIRIES MANAGEMENT</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead>
            <tr className="border-b border-zinc-800 text-white uppercase">
              <th className="py-2.5">Date</th>
              <th className="py-2.5">Name</th>
              <th className="py-2.5">Type</th>
              <th className="py-2.5">Phone</th>
              <th className="py-2.5">Status</th>
              <th className="py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {enquiries.map(e => (
              <tr key={e.id}>
                <td className="py-3 text-zinc-500">{e.createdAt}</td>
                <td className="py-3 font-bold text-white">{e.name}</td>
                <td className="py-3 text-zinc-400">{e.type}</td>
                <td className="py-3 font-mono">{e.phone}</td>
                <td className="py-3">
                  <select
                    value={e.status}
                    onChange={(evt) => updateEnquiryStatus(e.id, evt.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded text-xs p-1 text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="py-3">
                  <button onClick={() => deleteEnquiry(e.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
