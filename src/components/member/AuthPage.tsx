// Demo member sign-in / register. Accounts are stored in this browser only.
import { useState, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { RhinoLogo } from "@/components/brand/RhinoLogo";
import type { Member } from "@/lib/gym/types";

export function AuthPage({ isRegister = false }: { isRegister?: boolean }) {
  const navigate = useGo();
  const { setMemberSession, showToast, members, setMembers } = useApp();
  const [email, setEmail] = useState('member@rhinostrengthgym.com');
  const [password, setPassword] = useState('RhinoMember@123');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!name || !email) {
        setError('Please fill in all fields.');
        return;
      }
      const newMember = {
        id: 'mem-' + Date.now(),
        name,
        email,
        phone: '',
        goal: 'General Fitness',
        activePlan: 'None',
        joinedDate: new Date().toISOString().slice(0, 10)
      };
      setMembers(prev => [newMember, ...prev]);
      setMemberSession(newMember);
      showToast(`Welcome to Rhino Gym, ${name}!`);
      navigate('/dashboard');
    } else {
      const found = members.find(m => m.email.toLowerCase() === email.toLowerCase());
      if (found || email === 'member@rhinostrengthgym.com') {
        const session: Member = found || {
          id: 'mem-user-1',
          name: 'Demo Member',
          email: 'member@rhinostrengthgym.com',
          activePlan: 'Quarterly Commitment'
        };
        setMemberSession(session);
        showToast('Member logged in successfully!');
        navigate('/dashboard');
      } else {
        setError('Account not found. Please register or use demo credentials.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card border border-zinc-800 max-w-md w-full rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <RhinoLogo className="w-12 h-12 mx-auto" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            {isRegister ? 'JOIN RHINO GYM' : 'MEMBER DASHBOARD LOGIN'}
          </h2>
          <p className="text-xs text-zinc-400">Access your workout plan, enquiries, and goal tracking.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Debajit Saikia"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold"
              />
            </div>
          )}

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-gold"
            />
          </div>

          {!isRegister && (
            <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <span className="font-bold text-ember block">Demo Member Auto-fill:</span>
              <div>Email: <code className="text-white">member@rhinostrengthgym.com</code></div>
              <div>Password: <code className="text-white">RhinoMember@123</code></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-ember hover:bg-ember-deep text-white font-extrabold py-3.5 rounded uppercase tracking-wider transition-colors text-xs"
          >
            {isRegister ? 'CREATE DEMO MEMBER ACCOUNT' : 'ENTER MEMBER DASHBOARD'}
          </button>
        </form>

        <div className="text-center text-xs space-y-2">
          {isRegister ? (
            <button onClick={() => navigate('/login')} className="text-zinc-400 hover:text-white">
              Already have an account? <span className="text-gold font-bold">Sign In</span>
            </button>
          ) : (
            <button onClick={() => navigate('/register')} className="text-zinc-400 hover:text-white">
              New to Rhino Gym? <span className="text-gold font-bold">Register Account</span>
            </button>
          )}
          <div>
            <button onClick={() => navigate('/')} className="text-zinc-500 hover:text-zinc-300 text-[11px]">
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
