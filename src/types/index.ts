// All shared TypeScript types for CompeteHub

export type UserRole = 'admin' | 'user';
export type CompetitionStatus = 'draft' | 'upcoming' | 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type ParticipationStatus = 'registered' | 'in_progress' | 'completed' | 'disqualified';
export type QuestionType = 'mcq' | 'true_false' | 'short_answer';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  category: string;
  status: CompetitionStatus;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  imageUrl?: string;
  rules: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  competitionId?: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  difficulty: Difficulty;
  points: number;
  tags: string[];
  createdAt: string;
}

export interface Participant {
  id: string;
  userId: string;
  user: User;
  competitionId: string;
  competition: Competition;
  status: ParticipationStatus;
  registeredAt: string;
  score?: number;
  rank?: number;
  timeTaken?: number; // in seconds
  paymentId?: string;
}

export interface Payment {
  id: string;
  userId: string;
  user: User;
  competitionId: string;
  competition: Competition;
  amount: number;
  status: PaymentStatus;
  method: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  user: User;
  competitionId: string;
  competition: Competition;
  rank: number;
  issuedAt: string;
  certificateUrl?: string;
  verificationCode: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referrer: User;
  referredUserId: string;
  referredUser: User;
  competitionId?: string;
  earnings: number;
  status: 'pending' | 'credited';
  createdAt: string;
}

export interface DashboardStats {
  totalCompetitions: number;
  activeCompetitions: number;
  totalParticipants: number;
  totalRevenue: number;
  totalCertificates: number;
  pendingPayments: number;
  growthRate: number;
  conversionRate: number;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'cyan';
}
