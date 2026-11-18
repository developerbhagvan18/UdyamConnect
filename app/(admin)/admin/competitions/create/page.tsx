'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = ['Mathematics', 'Science', 'Technology', 'Programming', 'General Knowledge', 'Languages', 'Arts', 'Sports'];

interface FormData {
  title: string; description: string; category: string; tags: string;
  startDate: string; endDate: string; registrationDeadline: string; maxParticipants: string;
  entryFee: string; prizePool: string; prize1: string; prize2: string; prize3: string;
  rules: string[]; status: string;
}

export default function CreateCompetitionPage() {
  const [form, setForm] = useState<FormData>({
    title: '', description: '', category: '', tags: '',
    startDate: '', endDate: '', registrationDeadline: '', maxParticipants: '',
    entryFee: '', prizePool: '', prize1: '50', prize2: '30', prize3: '20',
    rules: [''], status: 'draft',
  });
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addRule = () => update('rules', [...form.rules, '']);
  const updateRule = (i: number, val: string) => {
    const r = [...form.rules]; r[i] = val; update('rules', r);
  };
  const removeRule = (i: number) => update('rules', form.rules.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormData> = {};
    if (!form.title) errs.title = 'Title is required' as never;
    if (!form.category) errs.category = 'Category is required' as never;
    if (!form.startDate) errs.startDate = 'Start date is required' as never;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/competitions" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Create Competition</h2>
          <p className="text-slate-500 text-sm">Fill in the details to create a new competition</p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Competition saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2"><span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded text-xs font-bold flex items-center justify-center">1</span> Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Competition Title *</label>
              <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. National Mathematics Olympiad 2027"
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? 'border-rose-400' : 'border-slate-200'}`} />
              {errors.title && <p className="mt-1 text-xs text-rose-500">{String(errors.title)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the competition, eligibility, and what participants can expect..."
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                <select value={form.category} onChange={(e) => update('category', e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.category ? 'border-rose-400' : 'border-slate-200'}`}>
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="mt-1 text-xs text-rose-500">{String(errors.category)}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="e.g. olympiad, national, grade-10"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2"><span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded text-xs font-bold flex items-center justify-center">2</span> Dates & Registration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Start Date *', field: 'startDate' as keyof FormData },
              { label: 'End Date', field: 'endDate' as keyof FormData },
              { label: 'Registration Deadline', field: 'registrationDeadline' as keyof FormData },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input type="date" value={String(form[field])} onChange={(e) => update(field, e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${(errors as Record<string, unknown>)[field] ? 'border-rose-400' : 'border-slate-200'}`} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Participants</label>
              <input type="number" value={form.maxParticipants} onChange={(e) => update('maxParticipants', e.target.value)} placeholder="e.g. 10000"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2"><span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded text-xs font-bold flex items-center justify-center">3</span> Pricing & Prizes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Entry Fee (₹)</label>
              <input type="number" value={form.entryFee} onChange={(e) => update('entryFee', e.target.value)} placeholder="0 for free"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Total Prize Pool (₹)</label>
              <input type="number" value={form.prizePool} onChange={(e) => update('prizePool', e.target.value)} placeholder="e.g. 200000"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Prize Distribution (%)</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '🥇 1st Place', field: 'prize1' as keyof FormData },
                { label: '🥈 2nd Place', field: 'prize2' as keyof FormData },
                { label: '🥉 3rd Place', field: 'prize3' as keyof FormData },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-xs text-slate-500 mb-1">{label}</label>
                  <div className="relative">
                    <input type="number" min="0" max="100" value={String(form[field])} onChange={(e) => update(field, e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-7" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2"><span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded text-xs font-bold flex items-center justify-center">4</span> Rules</h3>
          <div className="space-y-3">
            {form.rules.map((rule, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={rule} onChange={(e) => updateRule(i, e.target.value)} placeholder={`Rule ${i + 1}...`}
                  className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {form.rules.length > 1 && (
                  <button type="button" onClick={() => removeRule(i)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addRule} className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Rule
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2"><span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded text-xs font-bold flex items-center justify-center">5</span> Settings</h3>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Initial Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link href="/admin/competitions" className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</Link>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Create Competition
          </button>
        </div>
      </form>
    </div>
  );
}

