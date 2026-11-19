import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { useApp } from "@/context/AppContext";

/** Admin tab: Settings Backup. */
export function SettingsBackupTab() {
  const { enquiries, exportBackupJSON, importBackupJSON } = useApp();

  const [jsonInput, setJsonInput] = useState('');

  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">SETTINGS & DATA BACKUP MANAGEMENT</h3>

      <div className="space-y-4">
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-2">
          <span className="font-bold text-white block">Download Local JSON Backup</span>
          <p className="text-zinc-400">Save a complete snapshot of all published content, CMS drafts, and customer enquiries.</p>
          <button
            onClick={exportBackupJSON}
            className="bg-gold text-black font-extrabold px-4 py-2 rounded flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> EXPORT JSON BACKUP
          </button>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3">
          <span className="font-bold text-white block">Restore Data from JSON Text</span>
          <textarea
            rows={3}
            placeholder="Paste raw backup JSON content here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-2 rounded text-white font-mono text-[11px]"
          />
          <button
            onClick={() => {
              if (jsonInput && importBackupJSON(jsonInput)) {
                setJsonInput('');
              }
            }}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> IMPORT RESTORE JSON
          </button>
        </div>
      </div>
    </div>
  );
}
