'use client';

import { useState } from 'react';

const QUESTIONS = [
  { id: '1', text: 'If f(x) = 2x² + 3x - 5, find f\'(x)', type: 'MCQ', difficulty: 'Medium', points: 5, category: 'Mathematics', tags: ['calculus', 'derivatives'] },
  { id: '2', text: 'What is the powerhouse of the cell?', type: 'MCQ', difficulty: 'Easy', points: 2, category: 'Science', tags: ['biology', 'cell'] },
  { id: '3', text: 'Which sorting algorithm has the best average-case complexity?', type: 'MCQ', difficulty: 'Hard', points: 8, category: 'Programming', tags: ['algorithms', 'sorting'] },
  { id: '4', text: 'The sum of angles in a triangle is always 180°', type: 'True/False', difficulty: 'Easy', points: 1, category: 'Mathematics', tags: ['geometry'] },
  { id: '5', text: 'Write a function to reverse a linked list', type: 'Short Answer', difficulty: 'Hard', points: 10, category: 'Programming', tags: ['data-structures', 'linked-list'] },
  { id: '6', text: 'Who discovered the theory of relativity?', type: 'MCQ', difficulty: 'Easy', points: 2, category: 'General Knowledge', tags: ['physics', 'history'] },
  { id: '7', text: 'What is the chemical formula of glucose?', type: 'MCQ', difficulty: 'Easy', points: 2, category: 'Science', tags: ['chemistry'] },
  { id: '8', text: 'Explain the difference between stack and queue', type: 'Short Answer', difficulty: 'Medium', points: 5, category: 'Programming', tags: ['data-structures'] },
  { id: '9', text: 'Find the derivative of sin(x)', type: 'MCQ', difficulty: 'Easy', points: 3, category: 'Mathematics', tags: ['calculus'] },
  { id: '10', text: 'What is the time complexity of binary search?', type: 'MCQ', difficulty: 'Medium', points: 4, category: 'Programming', tags: ['algorithms'] },
  { id: '11', text: 'Name the largest planet in the solar system', type: 'MCQ', difficulty: 'Easy', points: 1, category: 'Science', tags: ['astronomy'] },
  { id: '12', text: 'What is Big O notation used for?', type: 'Short Answer', difficulty: 'Medium', points: 5, category: 'Programming', tags: ['algorithms', 'complexity'] },
];

const diffConfig: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

type Question = typeof QUESTIONS[number];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editQ, setEditQ] = useState<Question | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ text: '', type: 'MCQ', difficulty: 'Easy', points: '2', category: 'Mathematics', tags: '', options: ['', '', '', ''], correctAnswer: '' });

  const filtered = questions.filter((q) => {
    const ms = q.text.toLowerCase().includes(search.toLowerCase()) || q.category.toLowerCase().includes(search.toLowerCase());
    const md = diffFilter === 'all' || q.difficulty === diffFilter;
    const mt = typeFilter === 'all' || q.type === typeFilter;
    return ms && md && mt;
  });

  const openCreate = () => { setEditQ(null); setForm({ text: '', type: 'MCQ', difficulty: 'Easy', points: '2', category: 'Mathematics', tags: '', options: ['', '', '', ''], correctAnswer: '' }); setModalOpen(true); };
  const openEdit = (q: Question) => { setEditQ(q); setForm({ text: q.text, type: q.type, difficulty: q.difficulty, points: String(q.points), category: q.category, tags: q.tags.join(', '), options: ['', '', '', ''], correctAnswer: '' }); setModalOpen(true); };
  const handleSave = () => {
    if (editQ) {
      setQuestions((prev) => prev.map((q) => q.id === editQ.id ? { ...q, text: form.text, type: form.type, difficulty: form.difficulty, points: Number(form.points), category: form.category, tags: form.tags.split(',').map(t => t.trim()) } : q));
    } else {
      const nq: Question = { id: String(Date.now()), text: form.text, type: form.type, difficulty: form.difficulty, points: Number(form.points), category: form.category, tags: form.tags.split(',').map(t => t.trim()) };
      setQuestions((prev) => [nq, ...prev]);
    }
    setModalOpen(false);
  };
  const handleDelete = (id: string) => { setQuestions((prev) => prev.filter((q) => q.id !== id)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Question Bank</h2>
          <p className="text-slate-500 text-sm mt-0.5">{questions.length} questions total</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={diffFilter} onChange={(e) => setDiffFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Types</option>
          <option value="MCQ">MCQ</option>
          <option value="True/False">True/False</option>
          <option value="Short Answer">Short Answer</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Question', 'Type', 'Difficulty', 'Points', 'Category', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="text-sm font-medium text-slate-900 truncate">{q.text}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {q.tags.slice(0, 2).map((t) => <span key={t} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{t}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{q.type}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffConfig[q.difficulty] ?? ''}`}>{q.difficulty}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-900 whitespace-nowrap">{q.points} pts</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{q.category}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(q)} className="text-indigo-600 text-xs font-medium hover:underline">Edit</button>
                      <button onClick={() => setDeleteId(q.id)} className="text-rose-500 text-xs font-medium hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">{editQ ? 'Edit Question' : 'Add Question'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Question Text *</label>
                <textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Enter question..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="MCQ">MCQ</option>
                    <option value="True/False">True/False</option>
                    <option value="Short Answer">Short Answer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Difficulty</label>
                  <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              {form.type === 'MCQ' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Options</label>
                  <div className="space-y-2">
                    {form.options.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="w-7 h-9 flex items-center justify-center text-sm font-medium text-slate-400">{String.fromCharCode(65 + i)}.</span>
                        <input value={opt} onChange={(e) => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }); }}
                          placeholder={`Option ${String.fromCharCode(65 + i)}`} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Correct Answer</label>
                    <select value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select correct option</option>
                      {form.options.map((opt, i) => <option key={i} value={String(i)}>{String.fromCharCode(65 + i)}: {opt || `Option ${String.fromCharCode(65 + i)}`}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Points</label>
                  <input type="number" value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {['Mathematics', 'Science', 'Technology', 'Programming', 'General Knowledge', 'Languages', 'Arts', 'Sports'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g. calculus, derivatives"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Question</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Question?</h3>
            <p className="text-slate-500 text-sm mb-6">This question will be permanently removed from the bank.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

