import type { DashboardStats } from '@/src/types';

// ─── Admin Dashboard Stats ────────────────────────────────────────────────────

export const adminDashboardStats: DashboardStats = {
  totalCompetitions:  12,
  activeCompetitions: 3,
  totalParticipants:  24_619,
  totalRevenue:       4_872_430,
  totalCertificates:  18_204,
  pendingPayments:    47,
  growthRate:         18.4, // % month-over-month
  conversionRate:     68.2, // % of visitors who register
};

// ─── User Dashboard Stats ─────────────────────────────────────────────────────

export const userDashboardStats = {
  competitionsEntered:  7,
  competitionsWon:      1,
  currentRank:          3,
  totalScore:           612,
  certificatesEarned:   4,
  referralEarnings:     1_250,  // ₹
  pendingResults:       1,
  upcomingCompetitions: 2,
};

// ─── Revenue Chart Data (last 12 months) ─────────────────────────────────────

export const revenueChartData: { month: string; revenue: number; participants: number }[] = [
  { month: 'Dec 2024', revenue: 182_000,  participants: 620  },
  { month: 'Jan 2025', revenue: 245_000,  participants: 830  },
  { month: 'Feb 2025', revenue: 198_000,  participants: 710  },
  { month: 'Mar 2025', revenue: 312_000,  participants: 1050 },
  { month: 'Apr 2025', revenue: 278_000,  participants: 920  },
  { month: 'May 2025', revenue: 395_000,  participants: 1340 },
  { month: 'Jun 2025', revenue: 421_000,  participants: 1480 },
  { month: 'Jul 2025', revenue: 358_000,  participants: 1210 },
  { month: 'Aug 2025', revenue: 487_000,  participants: 1680 },
  { month: 'Sep 2025', revenue: 512_000,  participants: 1820 },
  { month: 'Oct 2025', revenue: 634_000,  participants: 2140 },
  { month: 'Nov 2025', revenue: 650_430,  participants: 2210 },
];

// ─── Participation Trend (last 30 days, weekly buckets) ───────────────────────

export const participationChartData: { week: string; registrations: number; completions: number }[] = [
  { week: 'Week 1 (Oct 6)',  registrations: 487, completions: 310 },
  { week: 'Week 2 (Oct 13)', registrations: 621, completions: 405 },
  { week: 'Week 3 (Oct 20)', registrations: 714, completions: 498 },
  { week: 'Week 4 (Oct 27)', registrations: 893, completions: 601 },
  { week: 'Week 5 (Nov 3)',  registrations: 952, completions: 645 },
];

// ─── Top Competitions by Participants ─────────────────────────────────────────

export const topCompetitions: { id: string; title: string; participants: number; revenue: number; category: string }[] = [
  {
    id: 'comp-004',
    title: 'General Knowledge Super Cup',
    participants: 7623,
    revenue: 754_677,
    category: 'General Knowledge',
  },
  {
    id: 'comp-001',
    title: 'National Science Olympiad 2025',
    participants: 3847,
    revenue: 1_150_253,
    category: 'Science',
  },
  {
    id: 'comp-010',
    title: 'Indian History & Culture Quiz',
    participants: 6541,
    revenue: 516_739,
    category: 'General Knowledge',
  },
  {
    id: 'comp-006',
    title: 'English Language Proficiency Test',
    participants: 3214,
    revenue: 478_886,
    category: 'Languages',
  },
  {
    id: 'comp-005',
    title: 'AI & Machine Learning Hackathon',
    participants: 487,
    revenue: 243_013,
    category: 'Technology',
  },
];

// ─── Recent Activity ──────────────────────────────────────────────────────────

export type ActivityType =
  | 'registration'
  | 'payment'
  | 'completion'
  | 'certificate'
  | 'competition_created'
  | 'refund';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  meta?: Record<string, string | number>;
}

export const recentActivity: ActivityEvent[] = [
  {
    id: 'act-001',
    type: 'registration',
    description: 'Arjun Sharma registered for National Science Olympiad 2025',
    timestamp: '2025-11-05T09:45:00Z',
    meta: { competitionId: 'comp-001', userId: 'user-001' },
  },
  {
    id: 'act-002',
    type: 'payment',
    description: 'Payment of ₹299 received from Priya Nair',
    timestamp: '2025-11-05T09:30:00Z',
    meta: { amount: 299, paymentId: 'pay-002' },
  },
  {
    id: 'act-003',
    type: 'completion',
    description: 'Priya Nair completed AI & Machine Learning Hackathon — Rank #1',
    timestamp: '2025-11-05T08:00:00Z',
    meta: { competitionId: 'comp-005', rank: 1, score: 97 },
  },
  {
    id: 'act-004',
    type: 'certificate',
    description: 'Certificate issued to Rahul Verma for AI & ML Hackathon (Rank #2)',
    timestamp: '2025-11-04T18:30:00Z',
    meta: { competitionId: 'comp-005', rank: 2 },
  },
  {
    id: 'act-005',
    type: 'competition_created',
    description: 'New competition "Data Science Bowl 2025" created (Draft)',
    timestamp: '2025-11-04T14:00:00Z',
    meta: { competitionId: 'comp-011' },
  },
  {
    id: 'act-006',
    type: 'refund',
    description: 'Refund of ₹499 processed for Divya Menon (disqualification)',
    timestamp: '2025-11-04T10:00:00Z',
    meta: { amount: 499, paymentId: 'pay-012' },
  },
  {
    id: 'act-007',
    type: 'registration',
    description: 'Vikram Patel registered for Programming Challenge Series III',
    timestamp: '2025-11-03T12:05:00Z',
    meta: { competitionId: 'comp-002', userId: 'user-005' },
  },
  {
    id: 'act-008',
    type: 'payment',
    description: 'Payment of ₹99 received from Ananya Singh',
    timestamp: '2025-11-02T07:58:05Z',
    meta: { amount: 99, paymentId: 'pay-017' },
  },
  {
    id: 'act-009',
    type: 'completion',
    description: 'Meera Krishnamurthy completed English Language Proficiency Test — Rank #15',
    timestamp: '2025-10-01T12:30:00Z',
    meta: { competitionId: 'comp-006', rank: 15, score: 74 },
  },
  {
    id: 'act-010',
    type: 'certificate',
    description: 'Certificate issued to Nikhil Joshi for English Language Test (Rank #2)',
    timestamp: '2025-10-05T11:00:00Z',
    meta: { competitionId: 'comp-006', rank: 2 },
  },
];

// ─── Category Distribution (for pie/donut charts) ─────────────────────────────

export const categoryDistribution: { category: string; count: number; color: string }[] = [
  { category: 'General Knowledge', count: 14164, color: '#6366f1' },
  { category: 'Science',           count: 3847,  color: '#10b981' },
  { category: 'Technology',        count: 1010,  color: '#f59e0b' },
  { category: 'Languages',         count: 3214,  color: '#06b6d4' },
  { category: 'Mathematics',       count: 876,   color: '#8b5cf6' },
  { category: 'Programming',       count: 1142,  color: '#ec4899' },
  { category: 'Arts',              count: 1890,  color: '#f97316' },
  { category: 'Sports',            count: 234,   color: '#84cc16' },
];
