'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarRange, Users, MessageSquare,
  HelpCircle, ImageIcon, FileText, LogOut, Trash2,
  RefreshCw, Pencil, PlusCircle, Save,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { createClient } from '@/lib/supabase';

const TABS = [
  { id: 'appointments', label: 'Appointments', icon: CalendarRange },
  { id: 'doctors', label: 'Doctors', icon: Users },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'news', label: 'News', icon: FileText },
];

// ─── Shared style tokens ───────────────────────────────────────────────────
const ic = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium bg-white transition-colors';
const lc = 'block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest';

// ─── Empty form defaults ───────────────────────────────────────────────────
const emptyDoc  = { name: '', role: '', img_url: '', bio: '', credentials: '', specializations: '', quote: '' };
const emptyTest = { text: '', author: '', role: '', rating: '5' };
const emptyFaq  = { question: '', answer: '' };
const emptyNews = { title: '', date: '', author: '', category: '', img_url: '', excerpt: '', content: '' };

export default function AdminDashboard() {
  const router = useRouter();
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useStore();
  const [activeTab, setActiveTab] = useState('appointments');
  const [loading, setLoading]     = useState(false);
  const [saving, setSaving]       = useState(false);
  const [flash, setFlash]         = useState({ text: '', ok: true });

  // ── Data ──────────────────────────────────────────────────────────────────
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors,      setDoctors]      = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs,         setFaqs]         = useState<any[]>([]);
  const [gallery,      setGallery]      = useState<any[]>([]);
  const [news,         setNews]         = useState<any[]>([]);

  // ── Form state (shared add / edit) ────────────────────────────────────────
  const [editingId, setEditingId] = useState<string | null>(null); // null = add mode
  const [docForm,   setDocForm]   = useState({ ...emptyDoc });
  const [testForm,  setTestForm]  = useState({ ...emptyTest });
  const [faqForm,   setFaqForm]   = useState({ ...emptyFaq });
  const [galleryUrl, setGalleryUrl] = useState('');
  const [newsForm,  setNewsForm]  = useState({ ...emptyNews });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const toast = (text: string, ok = true) => { setFlash({ text, ok }); setTimeout(() => setFlash({ text: '', ok: true }), 3000); };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const sb = createClient();
    const [a, d, t, f, g, n] = await Promise.all([
      sb.from('appointments').select('*').order('created_at', { ascending: false }),
      sb.from('doctors').select('*').order('created_at', { ascending: false }),
      sb.from('testimonials').select('*').order('created_at', { ascending: false }),
      sb.from('faqs').select('*').order('created_at', { ascending: false }),
      sb.from('gallery_images').select('*').order('created_at', { ascending: false }),
      sb.from('news_articles').select('*').order('created_at', { ascending: false }),
    ]);
    if (a.data) setAppointments(a.data);
    if (d.data) setDoctors(d.data);
    if (t.data) setTestimonials(t.data);
    if (f.data) setFaqs(f.data);
    if (g.data) setGallery(g.data);
    if (n.data) setNews(n.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdminLoggedIn) { router.push('/admin/login'); return; }
    fetchAll();
  }, [isAdminLoggedIn, fetchAll, router]);

  // Reset form to add-new mode
  const resetForm = (tab: string) => {
    setEditingId(null);
    if (tab === 'doctors')      setDocForm({ ...emptyDoc });
    if (tab === 'testimonials') setTestForm({ ...emptyTest });
    if (tab === 'faqs')         setFaqForm({ ...emptyFaq });
    if (tab === 'gallery')      setGalleryUrl('');
    if (tab === 'news')         setNewsForm({ ...emptyNews });
  };

  // Load item into form for editing
  const loadEdit = (tab: string, item: any) => {
    setEditingId(item.id);
    if (tab === 'doctors') setDocForm({
      name: item.name || '', role: item.role || '', img_url: item.img_url || '',
      bio: item.bio || '', quote: item.quote || '',
      credentials: Array.isArray(item.credentials) ? item.credentials.join(', ') : item.credentials || '',
      specializations: Array.isArray(item.specializations) ? item.specializations.join(', ') : item.specializations || '',
    });
    if (tab === 'testimonials') setTestForm({ text: item.text || '', author: item.author || '', role: item.role || '', rating: String(item.rating || 5) });
    if (tab === 'faqs')         setFaqForm({ question: item.question || '', answer: item.answer || '' });
    if (tab === 'gallery')      setGalleryUrl(item.url || '');
    if (tab === 'news')         setNewsForm({ title: item.title || '', date: item.date || '', author: item.author || '', category: item.category || '', img_url: item.img_url || '', excerpt: item.excerpt || '', content: item.content || '' });
  };

  const del = async (table: string, id: string) => {
    if (!window.confirm('Delete this item?')) return;
    const sb = createClient();
    const { error } = await sb.from(table).delete().eq('id', id);
    if (error) toast('Error: ' + error.message, false);
    else { toast('Deleted!'); fetchAll(); }
  };

  if (!isAdminLoggedIn) return null;

  // ── Submit handlers ────────────────────────────────────────────────────────
  const submitDoc = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const sb = createClient();
    const payload = {
      name: docForm.name, role: docForm.role, img_url: docForm.img_url, bio: docForm.bio, quote: docForm.quote,
      credentials: docForm.credentials.split(',').map((s: string) => s.trim()).filter(Boolean),
      specializations: docForm.specializations.split(',').map((s: string) => s.trim()).filter(Boolean),
    };
    const { error } = editingId
      ? await sb.from('doctors').update(payload).eq('id', editingId)
      : await sb.from('doctors').insert({ ...payload, id: 'dr-' + docForm.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(), rating: '5.0', reviews: 0, specialty: '' });
    if (error) toast('Error: ' + error.message, false);
    else { toast(editingId ? 'Doctor updated!' : 'Doctor added!'); resetForm('doctors'); fetchAll(); }
    setSaving(false);
  };

  const submitTest = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const sb = createClient();
    const payload = { text: testForm.text, author: testForm.author, role: testForm.role, rating: Number(testForm.rating) };
    const { error } = editingId
      ? await sb.from('testimonials').update(payload).eq('id', editingId)
      : await sb.from('testimonials').insert({ ...payload, avatar_url: '' });
    if (error) toast('Error: ' + error.message, false);
    else { toast(editingId ? 'Testimonial updated!' : 'Testimonial added!'); resetForm('testimonials'); fetchAll(); }
    setSaving(false);
  };

  const submitFaq = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const sb = createClient();
    const payload = { question: faqForm.question, answer: faqForm.answer };
    const { error } = editingId
      ? await sb.from('faqs').update(payload).eq('id', editingId)
      : await sb.from('faqs').insert(payload);
    if (error) toast('Error: ' + error.message, false);
    else { toast(editingId ? 'FAQ updated!' : 'FAQ added!'); resetForm('faqs'); fetchAll(); }
    setSaving(false);
  };

  const submitGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl) { toast('Please enter an image URL', false); return; }
    setSaving(true);
    const sb = createClient();
    const { error } = editingId
      ? await sb.from('gallery_images').update({ url: galleryUrl }).eq('id', editingId)
      : await sb.from('gallery_images').insert({ url: galleryUrl, storage_path: '' });
    if (error) toast('Error: ' + error.message, false);
    else { toast(editingId ? 'Image updated!' : 'Image added!'); resetForm('gallery'); fetchAll(); }
    setSaving(false);
  };

  const submitNews = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const sb = createClient();
    const payload = {
      title: newsForm.title, author: newsForm.author, category: newsForm.category,
      date: newsForm.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      img_url: newsForm.img_url, excerpt: newsForm.excerpt, content: newsForm.content,
    };
    const { error } = editingId
      ? await sb.from('news_articles').update(payload).eq('id', editingId)
      : await sb.from('news_articles').insert(payload);
    if (error) toast('Error: ' + error.message, false);
    else { toast(editingId ? 'Article updated!' : 'Article added!'); resetForm('news'); fetchAll(); }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Clinic Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button onClick={async () => { const sb = createClient(); await sb.auth.signOut(); setIsAdminLoggedIn(false); router.push('/'); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-all">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {flash.text && (
          <div className={`mb-5 p-3.5 rounded-xl font-bold text-sm text-center border ${flash.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
            {flash.text}
          </div>
        )}
        {loading && <div className="mb-4 text-center text-slate-400 text-sm animate-pulse">Loading from Supabase...</div>}

        {/* ── Three-column shell ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* COL 1 — Tab sidebar */}
          <div className="w-full lg:w-52 bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-3 shrink-0">
            {TABS.map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id); resetForm(tab.id); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all mb-1.5 last:mb-0 ${activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <tab.icon className={`w-4.5 h-4.5 ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* COL 2 — Form panel (add / edit) */}
          {activeTab !== 'appointments' && (
            <div className="w-full lg:w-80 bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-5 shrink-0">
              {/* Form header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-base font-bold text-slate-900">
                  {editingId ? 'Edit' : 'Add New'} {activeTab === 'doctors' ? 'Doctor' : activeTab === 'testimonials' ? 'Testimonial' : activeTab === 'faqs' ? 'FAQ' : activeTab === 'gallery' ? 'Image' : 'Article'}
                </h3>
                {editingId && (
                  <button onClick={() => resetForm(activeTab)} className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <PlusCircle className="w-3.5 h-3.5" /> New
                  </button>
                )}
              </div>

              {/* ── DOCTOR FORM ── */}
              {activeTab === 'doctors' && (
                <form onSubmit={submitDoc} className="space-y-3.5">
                  <div><label className={lc}>Full Name</label><input required value={docForm.name} onChange={e => setDocForm({ ...docForm, name: e.target.value })} className={ic} placeholder="Dr. Jane Doe" /></div>
                  <div><label className={lc}>Role / Designation</label><input required value={docForm.role} onChange={e => setDocForm({ ...docForm, role: e.target.value })} className={ic} placeholder="MDS - Endodontist" /></div>
                  <div><label className={lc}>Photo URL</label><input required value={docForm.img_url} onChange={e => setDocForm({ ...docForm, img_url: e.target.value })} className={ic} placeholder="https://..." /></div>
                  {docForm.img_url && <img src={docForm.img_url} alt="Preview" className="w-full h-28 object-cover rounded-xl border border-slate-100" />}
                  <div><label className={lc}>Credentials (comma separated)</label><input required value={docForm.credentials} onChange={e => setDocForm({ ...docForm, credentials: e.target.value })} className={ic} placeholder="BDS, MDS..." /></div>
                  <div><label className={lc}>Specializations (comma separated)</label><input required value={docForm.specializations} onChange={e => setDocForm({ ...docForm, specializations: e.target.value })} className={ic} placeholder="Root Canal, Implants..." /></div>
                  <div><label className={lc}>Bio</label><textarea required value={docForm.bio} onChange={e => setDocForm({ ...docForm, bio: e.target.value })} className={ic} rows={3} /></div>
                  <div><label className={lc}>Quote</label><input required value={docForm.quote} onChange={e => setDocForm({ ...docForm, quote: e.target.value })} className={ic} /></div>
                  <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update Doctor' : 'Save Doctor'}
                  </button>
                </form>
              )}

              {/* ── TESTIMONIAL FORM ── */}
              {activeTab === 'testimonials' && (
                <form onSubmit={submitTest} className="space-y-3.5">
                  <div><label className={lc}>Review Text</label><textarea required value={testForm.text} onChange={e => setTestForm({ ...testForm, text: e.target.value })} className={ic} rows={4} /></div>
                  <div><label className={lc}>Patient Name</label><input required value={testForm.author} onChange={e => setTestForm({ ...testForm, author: e.target.value })} className={ic} /></div>
                  <div><label className={lc}>Role / Label</label><input required value={testForm.role} onChange={e => setTestForm({ ...testForm, role: e.target.value })} className={ic} placeholder="Cosmetic Patient" /></div>
                  <div><label className={lc}>Rating</label>
                    <select value={testForm.rating} onChange={e => setTestForm({ ...testForm, rating: e.target.value })} className={ic}>
                      {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                  <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Save Testimonial'}
                  </button>
                </form>
              )}

              {/* ── FAQ FORM ── */}
              {activeTab === 'faqs' && (
                <form onSubmit={submitFaq} className="space-y-3.5">
                  <div><label className={lc}>Question</label><input required value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} className={ic} /></div>
                  <div><label className={lc}>Answer</label><textarea required value={faqForm.answer} onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })} className={ic} rows={5} /></div>
                  <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Save FAQ'}
                  </button>
                </form>
              )}

              {/* ── GALLERY FORM ── */}
              {activeTab === 'gallery' && (
                <form onSubmit={submitGallery} className="space-y-3.5">
                  <div><label className={lc}>Image URL</label><input required value={galleryUrl} onChange={e => setGalleryUrl(e.target.value)} className={ic} placeholder="https://..." /></div>
                  {galleryUrl && <img src={galleryUrl} alt="Preview" className="w-full h-36 object-cover rounded-xl border border-slate-100" />}
                  <p className="text-xs text-slate-400">Paste a direct image URL from your CDN or image host.</p>
                  <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update Image' : 'Add Image'}
                  </button>
                </form>
              )}

              {/* ── NEWS FORM ── */}
              {activeTab === 'news' && (
                <form onSubmit={submitNews} className="space-y-3.5">
                  <div><label className={lc}>Title</label><input required value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} className={ic} /></div>
                  <div><label className={lc}>Author</label><input required value={newsForm.author} onChange={e => setNewsForm({ ...newsForm, author: e.target.value })} className={ic} placeholder="Dr. Jane Doe" /></div>
                  <div><label className={lc}>Category</label><input required value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} className={ic} placeholder="Technology, Treatments..." /></div>
                  <div><label className={lc}>Date</label><input value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })} className={ic} placeholder="April 24, 2026" /></div>
                  <div><label className={lc}>Cover Image URL</label><input required value={newsForm.img_url} onChange={e => setNewsForm({ ...newsForm, img_url: e.target.value })} className={ic} placeholder="https://..." /></div>
                  {newsForm.img_url && <img src={newsForm.img_url} alt="Preview" className="w-full h-24 object-cover rounded-xl border border-slate-100" />}
                  <div><label className={lc}>Excerpt</label><textarea required value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })} className={ic} rows={2} placeholder="Short description..." /></div>
                  <div><label className={lc}>Full Content</label><textarea required value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} className={ic} rows={4} placeholder="Full article content..." /></div>
                  <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update Article' : 'Save Article'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* COL 3 — List panel */}
          <div className="flex-grow w-full bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-5 min-w-0">

            {/* ── APPOINTMENTS LIST ── */}
            {activeTab === 'appointments' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">All Bookings ({appointments.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-200">
                        <th className="p-3 font-bold">Patient</th>
                        <th className="p-3 font-bold">Contact</th>
                        <th className="p-3 font-bold">Service</th>
                        <th className="p-3 font-bold">Date</th>
                        <th className="p-3 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                      {appointments.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-slate-400">No appointments yet.</td></tr>
                      ) : appointments.map(a => (
                        <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{a.name}</td>
                          <td className="p-3 text-slate-600 text-xs">{a.phone}<br /><span className="text-slate-400">{a.email}</span></td>
                          <td className="p-3 text-emerald-700 font-bold text-xs">{a.service}</td>
                          <td className="p-3 text-slate-600 text-xs">{a.date}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${a.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── DOCTORS LIST ── */}
            {activeTab === 'doctors' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">Doctors ({doctors.length})</h2>
                <div className="space-y-3">
                  {doctors.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No doctors yet. Add one using the form.</p>}
                  {doctors.map(d => (
                    <div key={d.id} className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${editingId === d.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={d.img_url} alt={d.name} className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{d.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">{d.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button onClick={() => loadEdit('doctors', d)} title="Edit" className={`p-2 rounded-lg transition-colors ${editingId === d.id ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => del('doctors', d.id)} title="Delete" className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TESTIMONIALS LIST ── */}
            {activeTab === 'testimonials' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">Testimonials ({testimonials.length})</h2>
                <div className="space-y-3">
                  {testimonials.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No testimonials yet.</p>}
                  {testimonials.map(t => (
                    <div key={t.id} className={`flex items-start justify-between p-3.5 rounded-xl border gap-3 transition-colors ${editingId === t.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 font-medium line-clamp-2 mb-1">&ldquo;{t.text}&rdquo;</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.author} — {t.role} — {'★'.repeat(t.rating)}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => loadEdit('testimonials', t)} className={`p-2 rounded-lg transition-colors ${editingId === t.id ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => del('testimonials', t.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FAQS LIST ── */}
            {activeTab === 'faqs' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">FAQs ({faqs.length})</h2>
                <div className="space-y-3">
                  {faqs.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No FAQs yet.</p>}
                  {faqs.map(f => (
                    <div key={f.id} className={`flex items-start justify-between p-3.5 rounded-xl border gap-3 transition-colors ${editingId === f.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">{f.question}</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => loadEdit('faqs', f)} className={`p-2 rounded-lg transition-colors ${editingId === f.id ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => del('faqs', f.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── GALLERY LIST ── */}
            {activeTab === 'gallery' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">Gallery ({gallery.length})</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {gallery.length === 0 && <p className="col-span-4 text-slate-400 text-sm text-center py-8">No images yet.</p>}
                  {gallery.map(img => (
                    <div key={img.id} className={`relative group rounded-xl overflow-hidden border-2 transition-colors ${editingId === img.id ? 'border-emerald-400' : 'border-transparent'}`}>
                      <div className="aspect-square">
                        <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => loadEdit('gallery', img)} className="p-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 shadow transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => del('gallery_images', img.id)} className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 shadow transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── NEWS LIST ── */}
            {activeTab === 'news' && (
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5">Articles ({news.length})</h2>
                <div className="space-y-3">
                  {news.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No articles yet.</p>}
                  {news.map(n => (
                    <div key={n.id} className={`flex items-center justify-between p-3.5 rounded-xl border gap-3 transition-colors ${editingId === n.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={n.img_url} alt={n.title} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{n.title}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">{n.category} • {n.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => loadEdit('news', n)} className={`p-2 rounded-lg transition-colors ${editingId === n.id ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => del('news_articles', n.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>{/* end list panel */}
        </div>{/* end three-col */}
      </div>
    </div>
  );
}
