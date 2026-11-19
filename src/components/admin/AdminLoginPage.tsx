// Demo admin sign-in. Credentials are checked in the browser only.
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { RhinoLogo } from "@/components/brand/RhinoLogo";

export function AdminLoginPage() {
  const navigate = useGo();
  const { setAdminSession, showToast } = useApp();
  const [email, setEmail] = useState('admin@rhinostrengthgym.com');
  const [password, setPassword] = useState('RhinoAdmin@123');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === 'admin@rhinostrengthgym.com' && password === 'RhinoAdmin@123') {
      const session = { email, role: 'admin', token: 'demo-admin-token-' + Date.now() };
      setAdminSession(session);
      showToast('Welcome Admin! CMS Dashboard unlocked.');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Use demo default login credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card border border-zinc-800 max-w-md w-full rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <RhinoLogo className="w-14 h-14 mx-auto" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">RHINO ADMIN CMS PORTAL</h2>
          <p className="text-xs text-zinc-400">Sign in to control public website content and view local enquiries.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-zinc-500 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
            <span className="font-bold text-gold block">Demo Credentials Auto-filled:</span>
            <div>Email: <code className="text-white">admin@rhinostrengthgym.com</code></div>
            <div>Password: <code className="text-white">RhinoAdmin@123</code></div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-deep text-black font-extrabold py-3.5 rounded uppercase tracking-wider transition-colors text-xs"
          >
            LOG IN TO ADMIN DASHBOARD
          </button>
        </form>

        <div className="text-center pt-2">
          <button onClick={() => navigate('/')} className="text-xs text-zinc-500 hover:text-zinc-300">
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
