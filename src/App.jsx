import React, { useState, useEffect, useRef } from 'react';
import {
  Settings, Plus, Trash2, Save, ExternalLink, Layout, LogOut, Lock,
  BadgeCheck, RefreshCcw, ChevronRight, Globe, Palette, Users,
  MessageCircle, MapPin, Briefcase, Grid, List, Layers, Smartphone,
  Instagram, Facebook, Youtube, Twitter, Linkedin, Link as LinkIcon,
  Send, Phone, BookOpen, ScrollText, Lightbulb, GraduationCap,
  UserCheck, Camera, FileText, ClipboardList, PlusCircle, AlertCircle,
  KeyRound, Eye, EyeOff, Sparkles, Instagram as InstagramIcon, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const API_URL = "https://script.google.com/macros/s/AKfycbzZ4MU57vYBE29END1E1yz6OS-9HioL67ouAX1x1HLlrzmHjAh371YTTDCdOPg2nG9g/exec";

const ICON_OPTIONS = {
  LinkIcon: <LinkIcon size={18} />, Materi: <BookOpen size={18} />, Panduan: <ScrollText size={18} />,
  Kuis: <Lightbulb size={18} />, Ujian: <GraduationCap size={18} />, DaftarHadir: <UserCheck size={18} />,
  Dokumentasi: <Camera size={18} />, Tugas: <ClipboardList size={18} />, Instagram: <Instagram size={18} />,
  Facebook: <Facebook size={18} />, Youtube: <Youtube size={18} />, Twitter: <Twitter size={18} />,
  Linkedin: <Linkedin size={18} />, Send: <Send size={18} />, MessageCircle: <MessageCircle size={18} />
};

// --- COMPONENTS ---

const SkeletonEvent = () => (
  <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950 flex flex-col items-center animate-pulse transition-colors duration-300">
    <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-full mt-20 mb-6"></div>
    <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3"></div>
    <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-12"></div>
    <div className="w-full max-w-xl space-y-4">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-[1.5rem] w-full"></div>)}
    </div>
  </div>
);

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'login', password }) });
      const data = await res.json();
      if (data.success) onLogin(data.token); else setError(data.message || 'Password salah');
    } catch { setError('Terjadi kesalahan koneksi'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -bottom-20 -left-20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-white/10 relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-3xl shadow-lg shadow-blue-500/20 mb-6"
          >
            <Sparkles className="text-white w-8 h-8 animate-pulse" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Masfyvent</h1>
          <p className="text-slate-400 font-medium text-sm tracking-wide">Your Gateway to Infinite Possibilities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 bg-slate-950/50 border border-slate-800 rounded-2xl focus:border-blue-500 focus:bg-slate-900/80 transition-all font-bold text-white placeholder:text-slate-600 outline-none text-center text-lg tracking-widest"
                placeholder="ENTER ACCESS CODE"
              />
            </div>
          </div>

          {error && <p className="text-rose-500 text-center text-xs font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xl shadow-white/10 group"
          >
            {loading ? <RefreshCcw className="animate-spin" /> : <>Access Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
          </motion.button>
        </form>

        <div className="mt-10 text-center">
          <a href="https://www.instagram.com/masalfy/" target="_blank" className="inline-flex items-center gap-2 text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
            Powered by Mas Alfy <ExternalLink size={10} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const PublicEventView = ({ eventId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Check system preference or saved preference could go here
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}?action=getData&eventId=${eventId}`);
        const json = await res.json();
        // Parse boolean
        if (json?.settings?.show_facilitators === 'true') json.settings.show_facilitators = true;
        if (json?.settings?.show_facilitators === 'false') json.settings.show_facilitators = false;
        if (json?.settings?.show_facilitators === undefined) json.settings.show_facilitators = true;
        setData(json);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    if (data?.settings?.layout_style === 'carousel' && data?.links?.length > 0) {
      const timer = setInterval(() => setActiveIndex(p => (p + 1) % data.links.length), 4000);
      return () => clearInterval(timer);
    }
  }, [data]);

  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth * 0.85;
      carouselRef.current.scrollTo({ left: activeIndex * (itemWidth + 16), behavior: 'smooth' });
    }
  }, [activeIndex]);

  if (loading) return <div className={darkMode ? "dark" : ""}><SkeletonEvent /></div>;
  if (!data?.settings) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Event Not Found</div>;

  const { settings, links, facilitators } = data;
  const activeLinks = links.filter(l => l.active);
  const showFacilitators = settings.show_facilitators !== false;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen pb-24 font-sans transition-colors duration-500 bg-slate-50 dark:bg-slate-950"
        style={!darkMode ? { backgroundColor: settings.background_color } : {}}>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-800 dark:text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          {darkMode ? <Sun size={20} className="fill-yellow-400 text-yellow-400 animate-spin-slow" /> : <Moon size={20} className="fill-slate-800" />}
        </button>

        <header className="pt-24 pb-12 px-6 flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" />

          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="relative mb-8 group">
            <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800">
                <img src={settings.logo_url} className="w-full h-full object-cover" alt="Logo" />
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} delay={0.5}
              className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
            >
              <BadgeCheck className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">{settings.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto text-base/relaxed">{settings.description}</p>
          </motion.div>
        </header>

        <main className="max-w-xl mx-auto px-6 space-y-16">
          {settings.layout_style === 'stack' && (
            <div className="space-y-4">
              {activeLinks.map((l, i) => (
                <motion.a
                  key={l.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  href={l.url}
                  className="relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-700 p-4 rounded-[2rem] flex items-center justify-between group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer pointer-events-none" />

                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform" style={{ backgroundColor: settings.theme_color }}>
                      {ICON_OPTIONS[l.icon] || <LinkIcon size={24} />}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-indigo-50 text-lg">{l.label}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-colors z-10">
                    <ChevronRight size={20} />
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          {settings.layout_style === 'grid' && (
            <div className="grid grid-cols-2 gap-4">
              {activeLinks.map((l, i) => (
                <motion.a
                  key={l.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}
                  href={l.url}
                  className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-700 p-6 rounded-[2.5rem] flex flex-col items-center text-center gap-4 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl mb-2 group-hover:-translate-y-2 transition-transform" style={{ backgroundColor: settings.theme_color }}>
                    {ICON_OPTIONS[l.icon] || <LinkIcon size={28} />}
                  </div>
                  <span className="font-bold text-slate-800 dark:text-indigo-50 leading-tight">{l.label}</span>
                </motion.a>
              ))}
            </div>
          )}

          {settings.layout_style === 'carousel' && (
            <div className="space-y-6">
              <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-5 px-2 no-scrollbar" ref={carouselRef} style={{ scrollbarWidth: 'none' }}>
                {activeLinks.map((l, i) => (
                  <motion.a
                    key={l.id} href={l.url} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn("flex-shrink-0 w-[85%] snap-center p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-xl transition-all duration-500 border border-transparent", activeIndex === i ? "scale-100 opacity-100 bg-white dark:bg-slate-800" : "scale-90 opacity-50 grayscale bg-slate-50 dark:bg-slate-900")}
                    style={activeIndex === i ? { backgroundColor: settings.theme_color } : {}}
                  >
                    <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mb-2 shadow-2xl transition-transform", activeIndex === i ? "bg-white/20 text-white scale-110" : "bg-slate-100 text-slate-400")}>
                      {ICON_OPTIONS[l.icon] || <LinkIcon size={32} />}
                    </div>
                    <span className={cn("text-2xl font-black leading-tight", activeIndex === i ? "text-white" : "text-slate-300")}>{l.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {showFacilitators && facilitators.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-300 dark:bg-slate-700 flex-grow" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Tim Fasilitator</span>
                <div className="h-px bg-slate-300 dark:bg-slate-700 flex-grow" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {facilitators.map((f, i) => (
                  <motion.div key={f.id} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-900/50 p-5 rounded-[2rem] flex items-center gap-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform group"
                  >
                    <motion.div whileHover={{ scale: 1.1, rotate: -2 }} className="relative">
                      <img src={f.photo || "https://via.placeholder.com/100"} className="w-16 h-16 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 shadow-inner" />
                    </motion.div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg">{f.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mt-1 flex flex-wrap gap-2">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{f.unit}</span>
                      </p>
                    </div>
                    {f.whatsapp && (
                      <motion.a
                        whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}
                        href={`https://wa.me/${f.whatsapp}`}
                        className="bg-[#25D366] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0"
                      >
                        <MessageCircle size={24} className="fill-white text-white" />
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-24 text-center">
          <a href="https://www.instagram.com/masalfy/" target="_blank" className="inline-flex flex-col items-center gap-2 group p-4">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-pink-500 transition-colors">Powered by</span>
            <div className="flex items-center gap-2 text-sm font-black text-slate-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              <InstagramIcon size={16} /> Mas Alfy
            </div>
          </a>
        </footer>
      </div>
    </div>
  );
};

// --- ADMIN ---

const AdminDashboard = ({ onLogout }) => {
  const [eventList, setEventList] = useState([]);
  const [currentEventId, setCurrentEventId] = useState('default');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [passData, setPassData] = useState({ old: '', new: '' });

  useEffect(() => {
    fetch(`${API_URL}?action=getEventList`).then(r => r.json()).then(json => {
      setEventList(json);
      if (json.length > 0 && currentEventId === 'default' && !json.includes('default')) setCurrentEventId(json[0]);
    });
  }, []);

  useEffect(() => {
    if (currentEventId) {
      setLoading(true);
      fetch(`${API_URL}?action=getData&eventId=${currentEventId}`).then(r => r.json()).then(json => {
        // Normailize boolean for Show Facilitators
        let showFac = json.settings?.show_facilitators;
        if (showFac === 'true') showFac = true;
        if (showFac === 'false') showFac = false;
        if (showFac === undefined) showFac = true;

        setData({ ...json, settings: { ...json.settings, show_facilitators: showFac } });
      }).finally(() => setLoading(false));
    }
  }, [currentEventId]);

  const saveAll = async () => {
    setSaving(true);
    await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'updateAll', eventId: currentEventId, payload: data }) });
    setSaving(false); alert('Tersimpan!');
  };

  const createEvent = async () => {
    const name = prompt("ID New Event:");
    if (name) {
      setSaving(true);
      await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'createEvent', eventId: name }) });
      setEventList([...eventList, name]); setCurrentEventId(name); setSaving(false);
    }
  };

  const changePass = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'changePassword', oldPassword: passData.old, newPassword: passData.new }) });
    const json = await res.json();
    alert(json.message);
    if (json.success) { setShowPassModal(false); setPassData({ old: '', new: '' }); }
  };

  const updateSet = (k, v) => setData(p => ({ ...p, settings: { ...p.settings, [k]: v } }));

  if (!data && loading) return <div className="min-h-screen flex items-center justify-center"><RefreshCcw className="animate-spin" /></div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-72 bg-white border-r p-6 flex flex-col gap-6 fixed md:sticky top-0 h-auto md:h-screen z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><Layout size={20} /></div>
          <h2 className="font-bold text-slate-800">Masfyvent</h2>
        </div>
        <select value={currentEventId} onChange={e => setCurrentEventId(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm">
          {eventList.map(id => <option key={id} value={id}>{id}</option>)}
        </select>
        <button onClick={createEvent} className="w-full p-3 border-2 border-dashed border-slate-200 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-50">+ New Event</button>

        <div className="mt-auto space-y-2">
          <button onClick={() => setShowPassModal(true)} className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-500"><KeyRound size={16} /> Password</button>
          <button onClick={onLogout} className="flex items-center gap-3 w-full p-3 hover:bg-rose-50 rounded-xl text-sm font-bold text-rose-500"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
          <header className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-xl font-black text-slate-900">Editor <span className="text-slate-300">/</span> {currentEventId}</h1>
            <div className="flex gap-2">
              <a href={`/?e=${currentEventId}`} target="_blank" className="p-3 hover:bg-slate-50 rounded-xl text-slate-400"><ExternalLink size={20} /></a>
              <button onClick={saveAll} disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex gap-2 disabled:opacity-50">
                {saving ? <RefreshCcw className="animate-spin" /> : <Save size={18} />} Save Changes
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><Settings size={18} className="text-blue-500" /> Main Settings</h3>
              <input className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-slate-700" placeholder="Title" value={data.settings.title} onChange={e => updateSet('title', e.target.value)} />
              <textarea className="w-full p-3 bg-slate-50 border rounded-xl text-sm font-medium" rows="3" placeholder="Description" value={data.settings.description} onChange={e => updateSet('description', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-mono" placeholder="Logo URL" value={data.settings.logo_url} onChange={e => updateSet('logo_url', e.target.value)} />
                <div className="flex bg-slate-50 rounded-xl border p-1"><input type="color" className="w-8 h-full rounded cursor-pointer" value={data.settings.theme_color} onChange={e => updateSet('theme_color', e.target.value)} /><input className="flex-grow bg-transparent text-xs font-mono p-2 outline-none" value={data.settings.theme_color} onChange={e => updateSet('theme_color', e.target.value)} /></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-600">Show Facilitators Section</span>
                <button onClick={() => updateSet('show_facilitators', !data.settings.show_facilitators)} className={cn("w-12 h-6 rounded-full transition-colors relative", data.settings.show_facilitators ? "bg-blue-500" : "bg-slate-300")}>
                  <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", data.settings.show_facilitators ? "left-7" : "left-1")} />
                </button>
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><Grid size={18} className="text-purple-500" /> Layout Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {['stack', 'grid', 'carousel'].map(s => (
                  <button key={s} onClick={() => updateSet('layout_style', s)} className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 text-xs font-bold uppercase transition-all", data.settings.layout_style === s ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-50 text-slate-400")}>{s}</button>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><LinkIcon size={18} className="text-green-500" /> Links</h3>
              <button onClick={() => setData(p => ({ ...p, links: [...p.links, { id: Date.now(), label: 'New', url: '#', icon: 'LinkIcon', active: true }] }))} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ Add Link</button>
            </div>
            <div className="space-y-3">
              {data.links.map(l => (
                <div key={l.id} className="flex gap-2 p-3 bg-slate-50 rounded-2xl items-center group">
                  <select className="p-2 rounded-lg text-xs" value={l.icon} onChange={e => setData(p => ({ ...p, links: p.links.map(x => x.id === l.id ? { ...x, icon: e.target.value } : x) }))}>{Object.keys(ICON_OPTIONS).map(k => <option key={k} value={k}>{k}</option>)}</select>
                  <input className="flex-grow p-2 bg-transparent text-sm font-bold outline-none" value={l.label} onChange={e => setData(p => ({ ...p, links: p.links.map(x => x.id === l.id ? { ...x, label: e.target.value } : x) }))} />
                  <input className="flex-grow p-2 bg-transparent text-xs font-mono text-slate-500 outline-none" value={l.url} onChange={e => setData(p => ({ ...p, links: p.links.map(x => x.id === l.id ? { ...x, url: e.target.value } : x) }))} />
                  <button onClick={() => setData(p => ({ ...p, links: p.links.filter(x => x.id !== l.id) }))} className="p-2 text-rose-300 hover:text-rose-500"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><Users size={18} className="text-orange-500" /> Facilitators</h3>
              <button onClick={() => setData(p => ({ ...p, facilitators: [...p.facilitators, { id: Date.now(), name: 'Name', unit: 'Unit', photo: '', region: 'Region', whatsapp: '' }] }))} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ Add Person</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.facilitators.map(f => (
                <div key={f.id} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative">
                  <button onClick={() => setData(p => ({ ...p, facilitators: p.facilitators.filter(x => x.id !== f.id) }))} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                  <input className="w-full bg-transparent font-bold text-slate-800 outline-none" value={f.name} onChange={e => setData(p => ({ ...p, facilitators: p.facilitators.map(x => x.id === f.id ? { ...x, name: e.target.value } : x) }))} placeholder="Name" />
                  <div className="flex gap-2">
                    <input className="w-1/2 p-2 bg-white rounded-lg text-xs" value={f.unit} onChange={e => setData(p => ({ ...p, facilitators: p.facilitators.map(x => x.id === f.id ? { ...x, unit: e.target.value } : x) }))} placeholder="Unit" />
                    {/* hidden region input but kept in data structure */}
                  </div>
                  <input className="w-full p-2 bg-white rounded-lg text-xs font-mono text-slate-400" value={f.photo} onChange={e => setData(p => ({ ...p, facilitators: p.facilitators.map(x => x.id === f.id ? { ...x, photo: e.target.value } : x) }))} placeholder="Photo URL" />
                  <input className="w-full p-2 bg-white rounded-lg text-xs font-mono text-slate-400" value={f.whatsapp} onChange={e => setData(p => ({ ...p, facilitators: p.facilitators.map(x => x.id === f.id ? { ...x, whatsapp: e.target.value } : x) }))} placeholder="WA (628...)" type="number" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {showPassModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm">
            <h3 className="font-bold text-lg mb-4">Change Password</h3>
            <form onSubmit={changePass} className="space-y-3">
              <input className="w-full p-3 bg-slate-50 border rounded-xl" type="password" placeholder="Old Password" value={passData.old} onChange={e => setPassData({ ...passData, old: e.target.value })} />
              <input className="w-full p-3 bg-slate-50 border rounded-xl" type="password" placeholder="New Password" value={passData.new} onChange={e => setPassData({ ...passData, new: e.target.value })} />
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => setShowPassModal(false)} className="flex-1 p-3 text-slate-400 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                <button className="flex-1 p-3 bg-blue-600 text-white font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const eventId = new URLSearchParams(window.location.search).get('e');
  if (isAdmin) return <AdminDashboard onLogout={() => setIsAdmin(false)} />;
  if (eventId) return <PublicEventView eventId={eventId} />;
  return <AdminLogin onLogin={() => setIsAdmin(true)} />;
};

export default App;